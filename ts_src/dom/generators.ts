import { RenderableDataset, MiniChartElement, MiniChartConfig, LineCoordinates, AttributeKeyValuePair } from "../structs";
import { DEFAULT_TICKS, DEFAULT_GRID_STYLES } from "../constants";
import { percentage, getIndexArray } from "../utils";

export function generateSVG(el: string, attrs: AttributeKeyValuePair = {}) {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", el);
	Object.keys(attrs).forEach(key => svg.setAttribute(key, attrs[key]));
	return svg;
}

export function generateLegendElement(options: RenderableDataset["options"], id: string) {
	const root = generateElement("div", {
		"class": id,
		"style": "display:flex;",
	});
	const box = generateElement("div",
		{ "style": `height:15px;width:15px;background-color:${options.color};` }
	);
	const span = generateElement("span");
	span.textContent = id;
	root.appendChild(box);
	root.appendChild(span);
	return root;
}

export function generateMiniChartElement({ removeGrid, axis }: MiniChartConfig, id: string): MiniChartElement {
	const rootEl = generateElement("div", { id });
	const legendEl = generateElement("div", {
		"class": "minichart-legend",
		"style": "display:flex; justify-content:center;",
	});
	const chartEl = generateSVG("svg", {
		"viewBox": "0 0 100 100",
		"class": "minichart-svg",
	});
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
	const xRelativePos = (index: number) => `${percentage(index + 1, xTicks)}`;
	const generateRelativeGridXLine = (index: number) => generateGridXLine(index, xRelativePos);
	const yRelativePos = (index: number) => `${percentage(index, yTicks)}`;
	const generateRelativeGridYLine = (index: number) => generateGridYLine(index, yRelativePos);
	return [
		getIndexArray(xTicks).map(generateRelativeGridXLine),
		getIndexArray(yTicks).map(generateRelativeGridYLine),
	];
}

function generateGridXLine(index: number, xCallBack: (index: number) => string) {
	return generateGridLine({
		x1: xCallBack(index),
		y1: "0",
		x2: xCallBack(index),
		y2: "100",
	});
}

function generateGridYLine(index: number, yCallback: (index: number) => string) {
	return generateGridLine({
		x1: "0",
		y1: yCallback(index),
		x2: "100",
		y2: yCallback(index),
	});
}

function generateGridLine(lineCoordinates: LineCoordinates) {
	return generateSVGLine(lineCoordinates, DEFAULT_GRID_STYLES);
}

function generateSVGLine(lineCoordinates: LineCoordinates, lineAttrs: AttributeKeyValuePair) {
	return generateSVG("line", { ...lineCoordinates, ...lineAttrs });
}

function generateElement(tag: string, attrs: AttributeKeyValuePair = {}) {
	const el = document.createElement(tag);
	Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
	return el;
}
