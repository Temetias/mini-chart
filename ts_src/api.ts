import { MiniChartInstance, MiniChartConfig } from "./structs";
import { getRenderer } from "./domOperations";
import { getDatasetInserter, getDatasetRemover } from "./dataOperations";
import { getInfiniteLoopper } from "./utils";
import { DEFAULT_COLORS } from "./constants";

export default function MiniChart(config: MiniChartConfig): MiniChartInstance {
	const uid = `mini-id-${(Date.now() * Math.random()).toFixed(0)}`;
	const render = getRenderer(config, uid);
	const colorLoopper = getInfiniteLoopper(config.colors ? config.colors : DEFAULT_COLORS);
	return {
		render,
		insertDataset: getDatasetInserter(render, colorLoopper),
		removeDataset: getDatasetRemover(render, colorLoopper),
	};
}