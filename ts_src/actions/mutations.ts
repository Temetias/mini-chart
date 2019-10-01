import { Instance, DatasetParams, Dataset, Config } from "../shapes/structs";
import { generateDatasetSVG, generateLegendEl } from "./generators";
import { setClassToEls } from "../utils/dom";
import { getFromLoopedIndex, maxFromArrays } from "../utils/math";
import { DEFAULT_COLORS } from "../shapes/constants";

export function handleDatasetInsert({ config, data }: Instance, datasetParams: DatasetParams) {
	const maxY = maxFromArrays(data.map(dataset => dataset.values));
	const color = getDatasetColor({ config, data }, datasetParams);
	const svg = generateDatasetSVG(datasetParams, color, maxY);
	const legend = generateLegendEl(datasetParams, color);
	const dataset = { ...datasetParams, color, svg, legend,
		hovers: {
			enter: () => setClassToEls("hover", [ svg, legend.wrap ]),
			leave: () => setClassToEls("", [ svg, legend.wrap ]),
		},
	};
	svg.onmouseenter = dataset.hovers.enter;
	svg.onmouseleave = dataset.hovers.leave;
	legend.wrap.onmouseenter = dataset.hovers.enter;
	legend.wrap.onmouseleave = dataset.hovers.leave;
	return { config, data: [ ...data, dataset ] };
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
