import { RenderableDataset, MiniChartElement, MiniChartConfig } from "../structs";
import { DEFAULT_TICKS } from "../constants";
import { percentage } from "../utils";

export function generateSVG(el: string, ...attrs: [string, string][]) {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", el);
	attrs.forEach(attrVal => svg.setAttribute(attrVal[0], attrVal[1]));
	return svg;
}

export function generateLegendElement({ options, id, hoverFunction }: RenderableDataset) {
	const root = generateElement("div",
		[ "class", id ],
		[ "style", "display:flex;" ],
	);
	const box = generateElement("div",
		[ "style", `height:15px;width:15px;background-color:${options.color};` ]
	);
	const span = generateElement("span");
	span.textContent = id;
	root.appendChild(box);
	root.appendChild(span);
	root.onmouseover = hoverFunction;
	return root;
}

export function generateMiniChartElement({ removeGrid, axis }: MiniChartConfig, uid: string): MiniChartElement {
	const rootEl = generateElement("div", [ "id", uid ]);
	const legendEl = generateElement("div",
		[ "class", "minichart-legend" ],
		[ "style", "display:flex; justify-content:center;" ]
	);
	const chartEl = generateSVG("svg",
		[ "viewBox", "0 0 100 100" ],
		[ "class", "minichart-svg" ],
	);
	if (!removeGrid) {
		const yTicks = axis && axis.y && axis.y.ticksAmount ? axis.y.ticksAmount : DEFAULT_TICKS;
		const xTicks = axis && axis.x && axis.x.ticksAmount ? axis.x.ticksAmount : DEFAULT_TICKS;
		const grid = generateGrid(yTicks, xTicks);
		grid.forEach(dir => dir.forEach(el => chartEl.prepend(el)))
	}
	rootEl.appendChild(chartEl);
	rootEl.appendChild(legendEl);
	return { rootEl, legendEl, chartEl };
}

function generateGrid(yTicks: number, xTicks: number) {
	const grid: [SVGElement[], SVGElement[]] = [[], []];
	const defaultAttrs: [string, string][] = [
		[ "class", "grid-line" ],
		[ "stroke-width", ".1" ],
		[ "stroke", "gray" ],
	];
	[ ...Array(xTicks) ].forEach((_, i) => {
		const line = generateSVG("line",
			[ "x1", `${percentage(i + 1, xTicks)}` ],
			[ "y1", "0" ],
			[ "x2", `${percentage(i + 1, xTicks)}` ],
			[ "y2", "100" ],
			...defaultAttrs
		);
		grid[0].push(line);
	});
	[ ...Array(yTicks) ].forEach((_, i) => {
		const line = generateSVG("line",
			[ "x1", "0" ],
			[ "y1", `${percentage(i, yTicks)}` ],
			[ "x2", "100" ],
			[ "y2", `${percentage(i, yTicks)}` ],
			...defaultAttrs,
		);
		grid[1].push(line);
	});
	return grid;
}

function generateElement(tag: string, ...attrs: [string, string][]) {
	const el = document.createElement(tag);
	attrs.forEach(attrVal => el.setAttribute(attrVal[0], attrVal[1]));
	return el;
}
