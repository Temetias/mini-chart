import { RenderFunction, ColorLoopperFunction, Dataset } from "../structs";
import { getLineDataset } from "./datasets";
import { ERRORS, WARNINGS } from "../errorHandlers";

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
