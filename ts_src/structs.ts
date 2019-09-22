export interface MiniChartInstance {
	render: RenderFunction;
	insertDataset: DatasetInsertionFunction;
	removeDataset: DatasetRemovalFunction;
}

export type RenderFunction = (renderableDataset?: RenderableDataset) => HTMLElement;

export type DatasetInsertionFunction = (ds: Dataset) => HTMLElement;

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
