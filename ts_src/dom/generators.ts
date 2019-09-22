import { RenderableDataset } from "../structs";

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

export function generateElement(tag: string,...attrs: [string, string][]) {
	const el = document.createElement(tag);
	attrs.forEach(attrVal => el.setAttribute(attrVal[0], attrVal[1]));
	return el;
}

export function generateMiniChartElement(uid: string) {
	const root = generateElement("div", [ "id", uid ]);
	const legend = generateElement("div",
		[ "class", "minichart-legend" ],
		[ "style", "display:flex; justify-content:center;" ]
	);
	root.appendChild(legend);
	return root;
}
