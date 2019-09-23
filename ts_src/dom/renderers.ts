import { RenderableDataset, MiniChartElement, RenderFunction } from "../structs";
import { generateLegendElement } from "./generators";

export function getRenderer(miniChartEl: MiniChartElement): RenderFunction {
	return function render(renderableDataset?: RenderableDataset) {
		if (renderableDataset) {
			miniChartEl.chartEl.appendChild(renderableDataset.datasetSVG);
			miniChartEl.legendEl.appendChild(generateLegendElement(renderableDataset));
		}
		return miniChartEl;
	}
}
