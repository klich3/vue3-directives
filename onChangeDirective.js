/*
█▀ █▄█ █▀▀ █░█ █▀▀ █░█
▄█ ░█░ █▄▄ █▀█ ██▄ ▀▄▀

Author: <Anton Sychev> (anton at sychev dot xyz)
onChangeDirective.js (c) 2024
Created:  2024-08-08 17:27:54 
Desc: This directive trigger a callback function when a class is added to the element
Sample: 
	main.js:

		import { setupOnChange } from "onChangeDirective.js"
		setupOnChange(app);

		- or manual
		
		import onChangeDirective from "@/plugins/directives/onChangeDirective.js";
		Vue.directive("observe-change", onChangeDirective);
	
	template:
		class: on appear this class trigger call callback function
		data: if nedeed to parse data to function callback
	
		<div v-observe-change="{ class:'in-viewport', data: {} }" @on-change="function_callback"></div>
		
		function_callback -> attbutes
			el -> dom element
			data -> parsed from data
*/

const changerDirective = {
	bind: (el, binding, vnode) => {
		let parseDataToCallback = binding.value.data || {};

		let observer = new MutationObserver((mutations) => {
			const classToWatch = binding.value.class;

			for (const m of mutations) {
				const newValue = m.target.getAttribute(m.attributeName);

				if (new RegExp(classToWatch, "igm").test(newValue)) {
					const handlers =
						(vnode.data && vnode.data.on) ||
						(vnode.componentOptions && vnode.componentOptions.listeners);

					if (handlers && handlers["onchange"])
						handlers["onchange"].fns(el, parseDataToCallback);

					observer.disconnect();
				}
			}
		});

		observer.observe(el, {
			attributes: true,
			attributeOldValue: true,
			attributeFilter: ["class"],
		});
	},
};

export const setupOnChange = (app) => {
	app.directive("observe-change", changerDirective);
};

export default changerDirective;
