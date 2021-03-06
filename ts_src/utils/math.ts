export function percentage(amountN: number, ofN: number): number {
	return amountN / ofN * 100;
}

export function getIndexArray(length: number): number[] {
	return [ ...Array(length) ].map((_, i) => i);
}

export function getFromLoopedIndex<T>(arr: T[], idx: number): T {
	while (idx > arr.length - 1) {
		idx = idx - arr.length;
	}
	return idx < 0 ? arr[0] : arr[idx];
}

export function maxFromArrays(arrs: number[][]): number {
	return Math.max(...arrs.map(arr => Math.max(...arr)));
}
