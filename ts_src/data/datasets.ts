import { Dataset, RenderableDataset, HoverFunctionBundle, MiniChartElement } from "../structs";
import { percentage, getSVGStrokeWidth } from "../utils";
import { generateSVG, generateLegendElement } from "../dom/generators";
import { DEFAULT_POLYLINE_STYLES } from "../constants";

export function getLineDataset({ id, options, values }: Dataset, color: string, miniChartEl: MiniChartElement): RenderableDataset {
	const hoverFunctions = getHoverFunctions(miniChartEl, id);
	const datasetSVG = generateSVG("polyline", {
		"class": id,
		"stroke": options.color ? options.color : color,
		"points": values.map((val, idx) => `${percentage(idx, values.length - 1)} ${100 - percentage(val, 100)}`).join(),
		...DEFAULT_POLYLINE_STYLES,
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
	const changeDataSVGStrokeWidth = (change: number) => {
		const dataSVG = chartEl.getElementsByClassName(id)[0] as SVGElement;
		dataSVG.setAttribute("stroke-width", `${getSVGStrokeWidth(dataSVG) + change}`);
	};
	return {
		onEnter: function mouseEnter(_: MouseEvent) {
			legendEl.getElementsByClassName(id)[0].setAttribute("style", "border-bottom:1px solid black;")
			changeDataSVGStrokeWidth(.5);
		},
		onLeave: function mouseLeave(_: MouseEvent) {
			legendEl.getElementsByClassName(id)[0].setAttribute("style", "none")
			changeDataSVGStrokeWidth(-.5);
		},
	};
}
