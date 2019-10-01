import { Config, RenderContext, DatasetParams, Dataset } from "../shapes/structs";
import { generateHTML, generateSVG, appendTo } from "../utils/dom";
import { DEFAULT_POLYLINE_STYLES } from "../shapes/constants";
import { percentage } from "../utils/math";

export function generateRootEl({ width, height }: Config): RenderContext {
	const root = generateHTML("div");
	const legend = generateHTML("div");
	const svg = generateSVG("svg", { "viewBox": `0 0 ${width} ${height}` });

	// TODO: config

	appendTo(root, [ svg, legend ]);
	return { root, legend, svg }
}

export function generateDatasetSVG({ type, values }: DatasetParams, stroke: Dataset["color"], maxY: number) {
	switch (type) {
		case "line":
			return generateSVG("polyline", { stroke, ...DEFAULT_POLYLINE_STYLES,
				"points": generateDatasetPolylinePoints(values, maxY)
			});
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

function generateDatasetPolylinePoints(values: number[], maxY: number) {
	return values.map((val, idx) => `${percentage(idx, values.length - 1)} ${percentage(val, maxY)}`).join();
}
