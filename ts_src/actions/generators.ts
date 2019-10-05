import { Config, RenderContext, DatasetParams, Dataset, AxisConfig, Instance, State } from "../shapes/structs";
import { generateHTML, generateSVG, appendTo } from "../utils/dom";
import { DEFAULT_POLYLINE_STYLES, DEFAULT_TICK_STYLES, DEFAULT_TICKS } from "../shapes/constants";
import { getIndexArray } from "../utils/math";

export function generateRootEl({ width, height }: Config): RenderContext {
	const root = generateHTML("div");
	const legend = generateHTML("div");
	const svg = generateSVG("svg", { "viewBox": `0 0 ${width} ${height}` });
	appendTo(root, [ svg, legend ]);
	return { root, legend, svg }
}

export function generateDatasetSVG({ type }: DatasetParams, stroke: Dataset["color"]) {
	switch (type) {
		case "line":
			return generateSVG("polyline", { ...DEFAULT_POLYLINE_STYLES, stroke });
		case "bar":
			// TODO
			return generateSVG("polyline", { stroke });
	}
}

export function generateLegendEl({ name }: DatasetParams, color: Dataset["color"]) {
	const el = {
		wrap: generateHTML("div"),
		icon: generateHTML("div"),
		span: generateHTML("span"),
	};
	el.icon.setAttribute("style", `background-color:${color};`);
	el.wrap.appendChild(el.span);
	el.wrap.appendChild(el.icon);
	el.span.textContent = name;
	return el;
}

export function generateGrid(state: State<Instance>) {
	const axisConfig = state.get().config.axis;
	if (state.get().config.removeGrid) {
		return [];
	}
	const xTicks = axisConfig && axisConfig.x && axisConfig.x.ticks ? axisConfig.x.ticks : DEFAULT_TICKS;
	const yTicks = axisConfig && axisConfig.y && axisConfig.y.ticks ? axisConfig.y.ticks : DEFAULT_TICKS;
	return [
		...generateHorizontalTicks(yTicks, state.get().config.width, state.get().config.height),
		...generateVerticalTicks(xTicks, state.get().config.width, state.get().config.height),
	]
}

function generateVerticalTicks(xTicks: number, width: number, height: number) {
	return getIndexArray(xTicks).map(n => generateSVG("line", { ...DEFAULT_TICK_STYLES,
		x1: `${n / (getIndexArray(xTicks).length - 1) * width}`,
		y1: "0",
		x2: `${n / (getIndexArray(xTicks).length - 1) * width}`,
		y2: height.toString(),
	}));
}

function generateHorizontalTicks(yTicks: number, width: number, height: number) {
	return getIndexArray(yTicks).map(n => generateSVG("line", { ...DEFAULT_TICK_STYLES,
		x1: "0",
		y1: `${n / (getIndexArray(yTicks).length - 1) * height}`,
		x2: width.toString(),
		y2: `${n / (getIndexArray(yTicks).length - 1) * height}`,
	}));
}
