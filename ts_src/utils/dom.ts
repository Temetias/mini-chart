import { KeyValuePairs } from "../shapes/structs";

export function findDOMElement(selector: string) {
	switch (selector.charAt(0)) {
		case "#":
			return document.getElementById(selector.substr(1));
		case ".":
			return document.getElementsByClassName(selector.substr(1))[0];
		default:
			return document.getElementById(selector)
				? document.getElementById(selector)
				: document.getElementsByClassName(selector)[0];
	}
}

export function generateHTML(tag: string, attrs: KeyValuePairs<string> = {}) {
	const el = document.createElement(tag)
	return setElementAttrs(el, attrs) as HTMLElement;
}

export function generateSVG(tag: string, attrs: KeyValuePairs<string> = {}) {
	const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
	return setElementAttrs(el, attrs) as SVGElement;
}

export function setElementAttrs(el: Element, attrs: KeyValuePairs<string>) {
	Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
	return el;
}

export function appendTo(el: Element, children: Element[]) {
	children.forEach(child => el.appendChild(child));
	return el;
}

export function clear<T extends Element>(el: T) {
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
	return el;
}

export function setClassToEls(className: string, els: Element[]) {
	els.forEach(el => el.setAttribute("class", className));
}
