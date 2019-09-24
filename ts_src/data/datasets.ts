import { Dataset, RenderableDataset, HoverFunctionBundle, MiniChartElement } from "../structs";
import { percentage } from "../utils";
import { generateSVG, generateLegendElement } from "../dom/generators";

export function getLineDataset({ id, options, values }: Dataset, color: string, miniChartEl: MiniChartElement): RenderableDataset {
	const datasetSVG = generateSVG("polyline", {
		"fill": "none",
		"stroke-width": ".6",
		"class": id,
		"stroke": options.color ? options.color : color,
		"points": values.map((val, idx) => `${percentage(idx, values.length - 1)} ${100 - percentage(val, 100)}`).join(),
	});
	const hoverFunctions = getHoverFunctions(miniChartEl, id);
	datasetSVG.onmouseenter = hoverFunctions.onEnter;
	datasetSVG.onmouseleave = hoverFunctions.onLeave;
	const datasetOptions = { ...options, color };
	return {
		datasetSVG,
		id,
		options: datasetOptions,
		hoverFunctions,
		legendEl: generateLegendElement(datasetOptions, id),
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
