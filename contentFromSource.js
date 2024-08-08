/*
█▀ █▄█ █▀▀ █░█ █▀▀ █░█
▄█ ░█░ █▄▄ █▀█ ██▄ ▀▄▀

Author: <Anton Sychev> (anton at sychev dot xyz)
contentFromSource.js (c) 2024
Created:  2024-08-08 17:27:30 
Desc: This directive clone come dom to another one is usefull for
		  clone desktop menu to mobile version, or repeat some content in page.

Docs: documentation
Sample: 
	main.js:
	
		import { setupFromSource } from "contentFromSource.js"
		setupFromSource(app);

		- ro manual

		import contentFromSource from "@/plugins/directives/contentFromSource.js";
		Vue.directive("from-source", contentFromSource);
	
	template -> 
		dom: is a dom like div, span, p or query select like class -> .class or #id
	
		<div v-from-source="{ dom:'in-viewport', to:'.header' }"></div>
		
		si se indica el "to" -> haremos que la copia se realize dentro de ese dom
*/

const cloneFromSourceToTarget = {
	inserted: (el, binding) => {
		const domItem = binding.value.dom || false;
		const domTo = binding.value.to || false;

		if (!domItem || domItem === "") return;

		const dom_from = document.querySelectorAll(`${domItem}`);

		if (dom_from)
			dom_from.forEach(function (item) {
				//content source
				const cloned = !/String/.test(typeof item)
					? item.cloneNode(true)
					: document.querySelector(`${domItem}`).cloneNode(true);

				//destination to clone
				domTo
					? document.querySelector(`${domTo}`).appendChild(cloned)
					: el.appendChild(cloned);
			});
	},
};

export const setupFromSource = (app) => {
	app.directive("from-source", cloneFromSourceToTarget);
};

export default cloneFromSourceToTarget;
