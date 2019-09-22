import { Dataset, RenderFunction, ColorLoopperFunction, RenderableDataset } from "./structs";
import { ERRORS, WARNINGS } from "./errorHandlers";
import { generateSVG } from "./domOperations";
import { percentage } from "./utils";

export function getDatasetInserter(render: RenderFunction, colorLoopper: ColorLoopperFunction) {
	return function insertDataset(dataset: Dataset) {
		let renderableDataset;
		switch (dataset.options.type) {
			case "line":
			renderableDataset = getLineDataset(dataset, colorLoopper());
				break;
			case "bar":
				//svg = getBarDataset(dataset);
				break;
			default:
				ERRORS.unknownDatasetType(dataset.options.type);
		}
		return render(renderableDataset);
	};
}

export function getDatasetRemover(render: RenderFunction, colorLoopper: ColorLoopperFunction) {
	return function removeDataset(id: Dataset["id"]) {
		const el = render();
		const queriedElements = el.getElementsByClassName(id);
		if (queriedElements.length) {
			Array.from(queriedElements).forEach(el => el.remove());
			colorLoopper(false);
			return true;
		} else {
			WARNINGS.failedDatasetRemoval(id);
			return false;
		}
	};
}

function getLineDataset({ id, options, values }: Dataset, color: string) {
	const datasetSVG = generateSVG("polyline",
		[ "fill", "none" ],
		[ "stroke-width", ".6" ],
		[ "class", id ],
		[ "stroke", options.color ? options.color : color ],
		[ "points", values.map((val, idx) => `${percentage(idx, values.length - 1)} ${100 - percentage(val, 100)}`).join() ]
	);
	datasetSVG.onmouseover = console.log;
	return { datasetSVG, id, options: { ...options, color }};
}
