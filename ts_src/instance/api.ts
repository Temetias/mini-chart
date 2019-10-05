import { Config, DatasetParams, Instance, Dataset, RenderContext, State } from "../shapes/structs";
import { initState } from "../utils/state";
import { handleDatasetInsert, handleDatasetRemoval, handleClear, handleReConfiguration } from "../actions/mutations";
import { clear, appendTo, findDOMElement, setElementAttrs } from "../utils/dom";
import { compose, curry } from "../utils/functional";
import { generateRootEl, generateGrid } from "../actions/generators";
import { ERRORS } from "../actions/errors";

export default function(config: Config, data: Dataset[] = []) {
	let state = initState<Instance>({ config, data }); // Closure over the main state of the application.
	const renderOnContext = compose(curry(render), generateRootEl)(config); // Generate renderer on current context.
	const mountPoint = findDOMElement(config.selector);
	if (!mountPoint) {
		ERRORS.elementNotFound(config.selector);
		return;
	}
	mountPoint.appendChild(renderOnContext(state).root)
	return {
		insertDataset(dataset: DatasetParams) {
			const inserter = curry(handleDatasetInsert)(dataset);
			state = state.mutate(inserter);
			renderOnContext(state);
		},
		removeDataset(name: DatasetParams["name"]) {
			const remover = curry(handleDatasetRemoval)(name);
			state = state.mutate(remover);
			renderOnContext(state);
		},
		clear() {
			state = state.mutate(handleClear);
			renderOnContext(state);
		},
		reConfigure(config: Config) {
			const configurer = curry(handleReConfiguration)(config);
			state = state.mutate(configurer);
			renderOnContext(state);
		},
	};
}


function render(state: State<Instance>, context: RenderContext) {
	const { svg, legend, root } = {
		svg: clear(context.svg),
		legend: clear(context.legend),
		root: clear(context.root),
	};
	appendTo(svg, [ ...generateGrid(state) ]);
	appendTo(root, [ svg, legend ]);
	state.get().data.forEach(dataset => {
		setElementAttrs(dataset.svg, { points: dataset.renderableValues });
		svg.appendChild(dataset.svg);
		legend.appendChild(dataset.legend.wrap);
	});
	return { svg, legend, root };
}