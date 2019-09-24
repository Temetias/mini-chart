import { AttributeKeyValuePairs, LineCoordinates } from "./structs";

export function percentage(val: number, ofVal: number) {
	return val / ofVal * 100;
}

export function getElementByClassOrId(selector: string) {
	return selector.length && selector[0] === "#"
		? document.getElementById(selector.substr(1))
		: document.getElementsByClassName(selector.substr(1))[0];
}

export function getInfiniteLoopper<T>(arr: T[]) {
	let infiniteIndex = -1; // TODO(Teemu): Avoid wrapping over a mutating value.
	return function loopper(forwards: boolean = true) {
		infiniteIndex = forwards ? ++infiniteIndex : --infiniteIndex;
		if (infiniteIndex < 0) {
			infiniteIndex = arr.length - 1;
		} else if (infiniteIndex >= arr.length) {
			infiniteIndex = 0;
		}
		return arr[infiniteIndex];
	}
}

export function getUid() {
	return `${(Date.now() * Math.random()).toFixed(0)}`;
}

export function getIndexArray(n: number) {
	return [ ...Array(n) ].map((_, i) => i);
}

export function attributifyLineCoordinates({ x1, y1, x2, y2 }: LineCoordinates): AttributeKeyValuePairs {
	return { x1: x1.toString(), y1: y1.toString(), x2: x2.toString(), y2: y2.toString() }
}

export function getSVGStrokeWidth(svg: SVGElement) {
	const strokeWidth = svg.getAttribute("stroke-width");
	return parseFloat(strokeWidth ? strokeWidth : "1");
}
