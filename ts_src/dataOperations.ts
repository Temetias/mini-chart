import { Dataset, RenderFunction, ColorLoopperFunction } from "./structs";
import { ERRORS } from "./errorHandlers";
import { generateSVG } from "./domOperations";
import { percentage } from "./utils";

export function getDatasetInserter(render: RenderFunction, colorLoopper: ColorLoopperFunction) {
	return function insertDataset(dataset: Dataset) {
		let svg;
		switch (dataset.options.type) {
			case "line":
				svg = getLineDataset(dataset, colorLoopper());
				break;
			case "bar":
				//svg = getBarDataset(dataset);
				break;
			default:
				ERRORS.unknownDatasetType(dataset.options.type);
		}
		return render(svg);
	};
}

export function getDatasetRemover(render: RenderFunction, colorLoopper: ColorLoopperFunction) {
	return function removeDataset(id: Dataset["id"]) {
		const el = render();
		const queriedElements = el.getElementsByClassName(id);
		if (queriedElements.length) {
			queriedElements[0].remove();
			colorLoopper(false);
			return true;
		} else {
			return false;
		}
	};
}

function getLineDataset({ id, options, values }: Dataset, color: string) {
	return generateSVG("polyline",
		[ "fill", "none" ],
		[ "stroke-width", ".6" ],
		[ "class", id ],
		[ "stroke", options.color ? options.color : color ],
		[ "points", values.map((val, idx) => `${percentage(idx, values.length - 1)} ${100 - percentage(val, 100)}`).join() ]
	);
}

