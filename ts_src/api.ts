import { MiniChartInstance, MiniChartConfig } from "./structs";
import { getRenderer } from "./dom/renderers";
import { getInfiniteLoopper } from "./utils";
import { DEFAULT_COLORS } from "./constants";
import { getDatasetInserter, getDatasetRemover } from "./data/operators";

export default function(config: MiniChartConfig): MiniChartInstance {
	const uid = `mini-id-${(Date.now() * Math.random()).toFixed(0)}`;
	const render = getRenderer(config, uid);
	const colorLoopper = getInfiniteLoopper(config.colors ? config.colors : DEFAULT_COLORS);
	return {
		render,
		insertDataset: getDatasetInserter(render, colorLoopper),
		removeDataset: getDatasetRemover(render, colorLoopper),
	};
}
