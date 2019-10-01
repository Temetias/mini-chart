import { Action } from "./operations";

export interface KeyValuePairs<T> { [key: string]: T };

export interface State<T extends Object> {
	get: () => T;
	mutate: (action: Action<T>) => State<T>;
};

export interface DatasetParams {
	name: string;
	type: DatasetType;
	values: number[];
	options?: Partial<DatasetOptions>;
};

export type Dataset = DatasetParams & {
	color: string;
	svg: SVGElement;
	legend: LegendElement
	hovers: {
		enter: HoverFunction;
		leave: HoverFunction;
	};
};

export type HoverFunction = (e: MouseEvent) => void;

export type DatasetType = "line" | "bar";

export interface DatasetOptions {
	customClass: string;
	color: string;
};

export interface ConfigOptions {
	axis: {
		x: Partial<AxisConfig>;
		y: Partial<AxisConfig>;
	};
	colors: string[];
	removeGrid: boolean;
};

export interface AxisConfig {
	formatter: AxisFormatterFunction;
	ticks: number;
};

export type AxisFormatterFunction = (val: number) => string;

export type Config = Partial<ConfigOptions> & {
	selector: string;
	height: number;
	width: number;
};

export interface Instance {
	config: Config;
	data: Dataset[];
}

export interface RenderContext {
	root: HTMLElement;
	svg: SVGElement;
	legend: HTMLElement;
}

export interface LegendElement {
	wrap: HTMLElement;
	icon: HTMLElement;
	span: HTMLElement;
}
