import { Dataset } from "../structs";
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
	datasetSVG.onmouseover = console.log;
	return { datasetSVG, id, options: { ...options, color }};
}
