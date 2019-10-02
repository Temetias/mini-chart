export const ERRORS = Object.freeze({
	elementNotFound: (selector: string) => error(`Minichart error: Could not find element with selector "${selector}"`),
});

export const WARNINGS = Object.freeze({
	failedDatasetRemoval: (name: string) => warn(`Minichart warning: Attempted to remove a dataset with unknown name "${name}"`),
});

function warn(message: string) {
	console.warn(`Minichart warning: ${message}`);
}

function error(message: string) {
	console.error(`Minichart error: ${message}`);
}