export const ERRORS = Object.freeze({
	elementNotFound: (selector: string) => console.error(`Could not find element with selector "${selector}"`),
});

export const WARNINGS = Object.freeze({
	failedDatasetRemoval: (id: string) => console.warn(`Attempted to remove a dataset with unknown id "${id}"`),
});
