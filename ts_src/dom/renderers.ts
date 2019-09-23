import { RenderableDataset, MiniChartElement } from "../structs";
import { generateLegendElement } from "./generators";

export function getRenderer(miniChartEl: MiniChartElement) {
	return function render(renderableDataset?: RenderableDataset) {
		if (renderableDataset) {
			miniChartEl.chartEl.appendChild(renderableDataset.datasetSVG);
			miniChartEl.legendEl.appendChild(generateLegendElement(renderableDataset));
		}
		return miniChartEl;
	}
}
