import { Action } from "../shapes/operations";
import { State } from "../shapes/structs";

export function initState<T>(state: T): State<T> {
	return {
		get(): T {
			return Object.assign({}, state);
		},
		mutate(action: Action<T>): State<T> {
			return initState(action(Object.assign({}, state)));
		},
	};
};
