import { Dataset, RenderableDataset, HoverFunctionBundle, MiniChartElement } from "../structs";
import { percentage } from "../utils";
import { generateSVG, generateLegendElement } from "../dom/generators";

export function getLineDataset({ id, options, values }: Dataset, color: string, miniChartEl: MiniChartElement): RenderableDataset {
	const hoverFunctions = getHoverFunctions(miniChartEl, id);
	const datasetSVG = generateSVG("polyline", {
		"fill": "none",
		"stroke-width": ".6",
		"class": id,
		"stroke": options.color ? options.color : color,
		"points": values.map((val, idx) => `${percentage(idx, values.length - 1)} ${100 - percentage(val, 100)}`).join(),
	});
	datasetSVG.onmouseenter = hoverFunctions.onEnter;
	datasetSVG.onmouseleave = hoverFunctions.onLeave;
	const legendEl = generateLegendElement({ ...options, color }, id)
	legendEl.onmouseenter = hoverFunctions.onEnter;
	legendEl.onmouseleave = hoverFunctions.onLeave;
	return {
		datasetSVG,
		id,
		options: { ...options, color },
		hoverFunctions,
		legendEl,
	};
}

function getHoverFunctions({ chartEl, legendEl }: MiniChartElement, id: string): HoverFunctionBundle {
	return {
		onEnter: function mouseEnter(e: MouseEvent) {
			const els = [ chartEl.getElementsByClassName(id)[0], legendEl.getElementsByClassName(id)[0] ];
			console.log(els, e)
		},
		onLeave: function mouseLeave(e: MouseEvent) {
			const els = [ chartEl.getElementsByClassName(id)[0], legendEl.getElementsByClassName(id)[0] ];
			console.log(els, e)
		},
	};
}
