import { MiniChartInstance, MiniChartConfig } from "./structs";
import { getRenderer } from "./dom/renderers";
import { getInfiniteLoopper, getElementByClassOrId, getUid } from "./utils";
import { DEFAULT_COLORS } from "./constants";
import { getDatasetInserter, getDatasetRemover } from "./data/operators";
import { ERRORS } from "./errorHandlers";
import { generateMiniChartElement } from "./dom/generators";

export default function(config: MiniChartConfig): MiniChartInstance | null {
	const mountEl = getElementByClassOrId(config.selector);
	if (!mountEl) {
		ERRORS.elementNotFound(config.selector);
		return null;
	}
	const uid = `mini-id-${getUid()}`;
	const miniChartEl = generateMiniChartElement(config, uid);
	mountEl.append(miniChartEl.rootEl);
	const render = getRenderer(miniChartEl);
	const colorLoopper = getInfiniteLoopper(config.colors ? config.colors : DEFAULT_COLORS);
	return {
		render,
		insertDataset: getDatasetInserter(render, colorLoopper),
		removeDataset: getDatasetRemover(render, colorLoopper),
	};
}
