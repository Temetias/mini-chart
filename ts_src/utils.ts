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