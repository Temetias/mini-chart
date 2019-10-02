import { Instance, DatasetParams, Dataset, Config } from "../shapes/structs";
import { generateDatasetSVG, generateLegendEl } from "./generators";
import { setClassToEls, setElementAttrs } from "../utils/dom";
import { getFromLoopedIndex, maxFromArrays, percentage } from "../utils/math";
import { DEFAULT_COLORS } from "../shapes/constants";
import { curry } from "../utils/functional";

export function handleDatasetInsert({ config, data }: Instance, datasetParams: DatasetParams) {
	const highestValue = maxFromArrays([ datasetParams.values, ...data.map(dataset => dataset.values) ]);
	const color = getDatasetColor({ config, data }, datasetParams);
	const svg = generateDatasetSVG(datasetParams, color);
	const legend = generateLegendEl(datasetParams, color);
	const polylinePointMapper = curry(mapPolylinePoints)(config.height)(highestValue);
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
	return { config, data: data.filter(dataset => dataset.name !== name) };
}

export function handleClear({ config }: Instance) {
	return { config, data: [] };
}

export function handleReConfiguration({ data }: Instance, config: Config) {
	return { config, data };
}

function mapPolylinePoints(values: number[], highestValue: number, maxY: number) {
	const yMultiplier = maxY / 100;
	return values.map((val, idx) =>
		`${percentage(idx, values.length - 1)} ${percentage(highestValue - val, highestValue) * yMultiplier}`
	).join();
}
