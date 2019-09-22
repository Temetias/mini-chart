export const ERRORS = Object.freeze({
	unknownDatasetType: (type: string) => console.error(`Attempted to insert unknown dataset type "${type}"`),
	elementNotFound: (selector: string) => console.error(`Could not find element with selector "${selector}"`),
});

export const WARNINGS = Object.freeze({
	failedDatasetRemoval: (id: string) => console.warn(`Attempted to remove a dataset with unknown id "${id}"`),
});
