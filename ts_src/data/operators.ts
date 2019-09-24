import { RenderFunction, ColorLoopperFunction, Dataset, DatasetInsertionFunction, DatasetRemovalFunction } from "../structs";
import { getLineDataset } from "./datasets";
import { ERRORS, WARNINGS } from "../errorHandlers";

export function getDatasetInserter(render: RenderFunction, colorLoopper: ColorLoopperFunction): DatasetInsertionFunction {
	return function insertDataset(dataset: Dataset) {
		let renderableDataset;
		switch (dataset.options.type) {
			case "line":
				renderableDataset = getLineDataset(dataset, colorLoopper(), render());
				break;
			case "bar":
				//renderableDataset = getBarDataset( ... );
				break;
			default:
				ERRORS.unknownDatasetType(dataset.options.type);
		}
		return render(renderableDataset);
	};
}

export function getDatasetRemover(render: RenderFunction, colorLoopper: ColorLoopperFunction): DatasetRemovalFunction {
	return function removeDataset(id: Dataset["id"]): boolean {
		const { chartEl, legendEl } = render();
		const queriedElements = [ ...chartEl.getElementsByClassName(id), ...legendEl.getElementsByClassName(id) ];
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
