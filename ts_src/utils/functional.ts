// Up to 4.
export function compose<R1, P1R2, P2R3>(fn1: (p1: P1R2) => R1, fn2: (p2: P2R3) => P1R2): (p: P2R3) => R1;
export function compose<R1, P1R2, P2R3, P3R4>(fn1: (p1: P1R2) => R1, fn2: (p2: P2R3) => P1R2, fn3?: (p3: P3R4) => P2R3): (p: P3R4) => R1;
export function compose<R1, P1R2, P2R3, P3R4, P4>(fn1: (p1: P1R2) => R1, fn2: (p2: P2R3) => P1R2, fn3?: (p3: P3R4) => P2R3, fn4?: (p4: P4) => P3R4) {
	return fn3 && fn4
		? function(p: P4) {
			return fn1(fn2(fn3(fn4(p))));
		}
		: fn3
			? function(p: P3R4) {
				return fn1(fn2(fn3(p)));
			}
			: function(p: P2R3) {
				return fn1(fn2(p));
			};
}

type CurrySrc2<P1, P2, R> = (p1: P1, p2: P2) => R;
type CurryReturn2<P1, P2, R> = (p2: P2) => (p1: P1) => R;
function curry2<P1, P2, R>(fn: CurrySrc2<P1, P2, R>) {
	return function(p2: P2) {
		return function(p1: P1) {
			return fn(p1, p2);
		};
	};
}

type CurrySrc3<P1, P2, P3, R> = (p1: P1, p2: P2, p3: P3) => R;
type CurryReturn3<P1, P2, P3, R> = (p3: P3) => CurryReturn2<P1, P2, R>;
function curry3<P1, P2, P3, R>(fn: CurrySrc3<P1, P2, P3, R>) {
	return function(p3: P3) {
		return function(p2: P2) {
			return function(p1: P1) {
				return fn(p1, p2, p3);
			};
		};
	};
}

type CurrySrc4<P1, P2, P3, P4, R> = (p1: P1, p2: P2, p3: P3, p4: P4) => R;
type CurryReturn4<P1, P2, P3, P4, R> = (p4: P4) => CurryReturn3<P1, P2, P3, R>;
function curry4<P1, P2, P3, P4, R>(fn: CurrySrc4<P1, P2, P3, P4, R>) {
	return function(p4: P4) {
		return function(p3: P3) {
			return function(p2: P2) {
				return function(p1: P1) {
					return fn(p1, p2, p3, p4);
				};
			};
		};
	};
}

// Up to 4.
export function curry<P1, P2, R>(fn: CurrySrc2<P1, P2, R>): CurryReturn2<P1, P2, R>;
export function curry<P1, P2, P3, R>(fn: CurrySrc3<P1, P2, P3, R>): CurryReturn3<P1, P2, P3, R>;
export function curry<P1, P2, P3, P4, R>(fn: CurrySrc4<P1, P2, P3, P4, R>): CurryReturn4<P1, P2, P3, P4, R>;
export function curry<P1, P2, P3, P4, R>(fn: CurrySrc2<P1, P2, R> | CurrySrc3<P1, P2, P3, R> | CurrySrc4<P1, P2, P3, P4, R>) {
	switch (fn.length as 2 | 3 | 4) {
		case 2:
			return curry2(fn as CurrySrc2<P1, P2, R>);
		case 3:
			return curry3(fn as CurrySrc3<P1, P2, P3, R>);
		case 4:
			return curry4(fn as CurrySrc4<P1, P2, P3, P4, R>);
	}
}
