import { Instance, DatasetParams, Dataset, Config } from "../shapes/structs";
import { generateDatasetSVG, generateLegendEl } from "./generators";
import { setClassToEls } from "../utils/dom";
import { getFromLoopedIndex, maxFromArrays, percentage } from "../utils/math";
import { DEFAULT_COLORS } from "../shapes/constants";
import { curry } from "../utils/functional";
import { WARNINGS } from "./errors";

export function handleDatasetInsert({ config, data }: Instance, datasetParams: DatasetParams) {
	const highestValue = maxFromArrays([ datasetParams.values, ...data.map(dataset => dataset.values) ]);
	const color = getDatasetColor({ config, data }, datasetParams);
	const svg = generateDatasetSVG(datasetParams, color);
	const legend = generateLegendEl(datasetParams, color);
	const polylinePointMapper = curry(mapPolylinePoints)(config.width)(config.height)(highestValue);
	const newDataset: Dataset = { ...datasetParams, color, svg, legend,
		hovers: {
			enter: () => setClassToEls("hover", [ svg, legend.wrap ]),
			leave: () => setClassToEls("", [ svg, legend.wrap ]),
		},
		renderableValues: polylinePointMapper(datasetParams.values),
	};
	svg.onmouseenter = newDataset.hovers.enter;
	svg.onmouseleave = newDataset.hovers.leave;
	legend.wrap.onmouseenter = newDataset.hovers.enter;
	legend.wrap.onmouseleave = newDataset.hovers.leave;
	const updatedData = data.map(dataset => ( // Update old datasets to be relative with the new highestValue.
		{ ...dataset, renderableValues: polylinePointMapper(dataset.values) }
	));
	return { config, data: [ ...updatedData, newDataset ] };
}

function getDatasetColor({ config, data }: Instance, datasetParams: DatasetParams) {
	return datasetParams.options && datasetParams.options.color
		? datasetParams.options.color
		: config.colors
			? getFromLoopedIndex(config.colors, data.length)
			: getFromLoopedIndex(DEFAULT_COLORS, data.length);
}

export function handleDatasetRemoval({ config, data }: Instance, name: Dataset["name"]) {
	const filteredData = data.filter(dataset => dataset.name !== name);
	if (filteredData.length === data.length) {
		WARNINGS.failedDatasetRemoval(name);
	}
	return { config, data: filteredData };
}

export function handleClear({ config }: Instance) {
	return { config, data: [] };
}

export function handleReConfiguration({ data }: Instance, config: Config) {
	return { config, data };
}

function mapPolylinePoints(values: number[], highestValue: number, maxY: number, maxX: number) {
	const yMultiplier = maxY / 100;
	const xMultiplier = maxX / 100;
	return values.map((val, idx) =>
		`${percentage(idx, values.length - 1) * xMultiplier} ${percentage(highestValue - val, highestValue) * yMultiplier}`
	).join();
}
