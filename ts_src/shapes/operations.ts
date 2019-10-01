export type Action<T> = (state: T) => T;

export type PointsMapper = (vals: number[]) => string;
