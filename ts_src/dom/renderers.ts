import { getElementByClassOrId, percentage } from "../utils";
import { MiniChartConfig, RenderableDataset } from "../structs";
import { ERRORS } from "../errorHandlers";
import { DEFAULT_TICKS } from "../constants";
import { generateSVG, generateLegendElement, generateMiniChartElement } from "./generators";

export function getRenderer({ selector, removeGrid, axis }: MiniChartConfig, uid: string) {
	return function render(renderableDataset?: RenderableDataset) {
		const queriedEl = getElementByClassOrId(selector);
		const miniChartElQuery = getElementByClassOrId(`#${uid}`);
		const miniChartEl = miniChartElQuery
			? miniChartElQuery as HTMLElement
			: generateMiniChartElement(uid);
		const svgQuery = miniChartEl.getElementsByClassName("minichart-svg")[0];
		const svg = svgQuery
			? svgQuery as SVGElement
			: generateSVG("svg",
				[ "viewBox", "0 0 100 100" ],
				[ "class", "minichart-svg" ],
			);
		if (!svgQuery) {
			if (!removeGrid) {
				const yTicks = axis && axis.y ? axis.y.ticksAmount : undefined;
				const xTicks = axis && axis.x ? axis.x.ticksAmount : undefined;
				renderGrid(svg, yTicks, xTicks);
			}
			miniChartEl.prepend(svg);
		}
		if (renderableDataset) {
			svg.appendChild(renderableDataset.datasetSVG);
			miniChartEl.getElementsByClassName("minichart-legend")[0].appendChild(generateLegendElement(renderableDataset));
		}
		if (queriedEl) {
			if (!queriedEl.contains(miniChartEl)) {
				queriedEl.appendChild(miniChartEl);
			}
		} else {
			ERRORS.elementNotFound(selector);
		}
		return miniChartEl;
	}
}

function renderGrid(svg: SVGElement, yTicks = DEFAULT_TICKS, xTicks = DEFAULT_TICKS ) {
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
		svg.prepend(line);
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
		svg.prepend(line);
		grid[1].push(line);
	});
	return grid;
}
