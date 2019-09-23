import { Dataset, HoverFunction } from "../structs";
import { percentage } from "../utils";
import { generateSVG } from "../dom/generators";

export function getLineDataset({ id, options, values }: Dataset, color: string) {
	const datasetSVG = generateSVG("polyline",
		[ "fill", "none" ],
		[ "stroke-width", ".6" ],
		[ "class", id ],
		[ "stroke", options.color ? options.color : color ],
		[ "points", values.map((val, idx) => `${percentage(idx, values.length - 1)} ${100 - percentage(val, 100)}`).join() ]
	);
	const hoverFunction = getHoverFunction(id);
	datasetSVG.onmouseover = hoverFunction;
	return { datasetSVG, id, options: { ...options, color }, hoverFunction };
}

function getHoverFunction(id: Dataset["id"]): HoverFunction {
	return function hover(e: MouseEvent): void {
		console.log(id, e);
	}
}
