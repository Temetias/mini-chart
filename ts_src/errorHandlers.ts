export const ERRORS = Object.freeze({
	unknownDatasetType: (type: string) => console.error(`Attempted to insert unknown dataset type "${type}"`),
	elementNotFound: (selector: string) => console.error(`Could not find element with selector "${selector}"`),
});
