import { RenderableDataset, MiniChartElement, RenderFunction } from "../structs";

export function getRenderer(miniChartEl: MiniChartElement): RenderFunction {
	return function render(renderableDataset?: RenderableDataset) {
		if (!renderableDataset) {
			return miniChartEl;
		}
		miniChartEl.chartEl.appendChild(renderableDataset.datasetSVG);
		miniChartEl.legendEl.appendChild(renderableDataset.legendEl);
		return miniChartEl;
	}
}
