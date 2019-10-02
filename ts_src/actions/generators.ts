import { Config, RenderContext, DatasetParams, Dataset } from "../shapes/structs";
import { generateHTML, generateSVG, appendTo } from "../utils/dom";
import { DEFAULT_POLYLINE_STYLES } from "../shapes/constants";

export function generateRootEl({ width, height }: Config): RenderContext {
	const root = generateHTML("div");
	const legend = generateHTML("div");
	const svg = generateSVG("svg", { "viewBox": `0 0 ${width} ${height}` });

	// TODO: config

	appendTo(root, [ svg, legend ]);
	return { root, legend, svg }
}

export function generateDatasetSVG({ type }: DatasetParams, stroke: Dataset["color"]) {
	switch (type) {
		case "line":
			return generateSVG("polyline", { stroke, ...DEFAULT_POLYLINE_STYLES });
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
