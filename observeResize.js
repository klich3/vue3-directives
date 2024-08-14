/*
█▀ █▄█ █▀▀ █░█ █▀▀ █░█
▄█ ░█░ █▄▄ █▀█ ██▄ ▀▄▀

Author: <Anton Sychev> (anton at sychev dot xyz)
index.js (c) 2024
Created:  2024-08-09 20:40:18 
Desc: Observe resize directive
Sample:
    main.js:
    import { setupObserveResize } from "@/directives/observe
        setupObserveResize(app);
*/

let observer = null;

const ObserveResize = {
	created(el, binding, vnode) {
		observer = new ResizeObserver((entries) => {
			if (entries && binding.value) binding.value(entries[0], el, vnode);
		});

		observer.observe(el);
	},

	beforeUnmount(el, binding, vnode) {
		observer.unobserve(el);
	},

	// called when the parent component is unmounted
	unmounted(el, binding, vnode) {
		//observer.disconnect();
		observer = null;
	},
};

export const setupObserveResize = (app) =>
	app.directive("observe-resize", ObserveResize);

export const ObserveResizeInstance = ObserveResize;

export default ObserveResize;
