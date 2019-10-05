import { Config, RenderContext, DatasetParams, Dataset, AxisConfig, Instance, State } from "../shapes/structs";
import { generateHTML, generateSVG, appendTo } from "../utils/dom";
import { DEFAULT_POLYLINE_STYLES, DEFAULT_TICK_STYLES } from "../shapes/constants";
import { maxFromArrays, getIndexArray, percentage } from "../utils/math";

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
	if (!axisConfig) {
		return [];
	}
	return [
		...generateHorizontalTicks(axisConfig.y, state.get().config.width, state.get().config.height),
		...generateVerticalTicks(axisConfig.x, state.get().config.width, state.get().config.height),
	]
}


function generateVerticalTicks(xConfig: Partial<AxisConfig>, width: number, height: number) {
	if (!xConfig || !xConfig.ticks) {
		return [];
	}
	return getIndexArray(xConfig.ticks).map(n => generateSVG("line", { ...DEFAULT_TICK_STYLES,
		x1: `${n / (getIndexArray(xConfig.ticks!).length - 1) * width}`,
		y1: "0",
		x2: `${n / (getIndexArray(xConfig.ticks!).length - 1) * width}`,
		y2: height.toString(),
	}));
}

function generateHorizontalTicks(yConfig: Partial<AxisConfig>, width: number, height: number) {
	if (!yConfig || !yConfig.ticks) {
		return [];
	}

	// TODO: texts

	return getIndexArray(yConfig.ticks).map(n => generateSVG("line", { ...DEFAULT_TICK_STYLES,
		x1: "0",
		y1: `${n / (getIndexArray(yConfig.ticks!).length - 1) * height}`,
		x2: width.toString(),
		y2: `${n / (getIndexArray(yConfig.ticks!).length - 1) * height}`,
	}));
}
