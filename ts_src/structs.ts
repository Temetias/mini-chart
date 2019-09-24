export interface MiniChartInstance {
	render: RenderFunction;
	insertDataset: DatasetInsertionFunction;
	removeDataset: DatasetRemovalFunction;
}

export interface MiniChartElement {
	chartEl: SVGElement;
	legendEl: HTMLElement;
	rootEl: HTMLElement;
}

export type RenderFunction = (renderableDataset?: RenderableDataset) => MiniChartElement;

export type DatasetInsertionFunction = (ds: Dataset) => MiniChartElement;

export interface Dataset {
	id: string;
	values: number[];
	options: {
		type: DatasetType;
		className?: string;
		color?: string;
	};
}

export interface RenderableDataset {
	id: string;
	datasetSVG: SVGElement;
	options: {
		type: DatasetType;
		color: string;
		className?: string;
	};
	hoverFunctions: HoverFunctionBundle;
	legendEl: HTMLElement;
}

export type HoverFunction = (e: MouseEvent) => void;

export interface HoverFunctionBundle {
	onEnter: HoverFunction;
	onLeave: HoverFunction;
}

export type DatasetType = "bar" | "line";

export type DatasetRemovalFunction = (id: string) => boolean;

export interface MiniChartConfig {
	selector: string;
	axis?: {
		y?: AxisConfiguration;
		x?: AxisConfiguration;
	};
	colors?: string[];
	removeGrid?: boolean;
}

export interface AxisConfiguration {
	maxValue?: number;
	formatter?: AxisFormatterFunction;
	ticksAmount?: number;
}

export type AxisFormatterFunction = (val: number) => string;

export type ColorLoopperFunction = (forwards?: boolean) => string;

export type AttributeKeyValuePairs = { [key: string]: string };

export type LineCoordinates = {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
};
