/*
█▀ █▄█ █▀▀ █░█ █▀▀ █░█
▄█ ░█░ █▄▄ █▀█ ██▄ ▀▄▀

Author: <Anton Sychev> (anton at sychev dot xyz)
index.js (c) 2024
Created:  2024-08-08 00:42:43 
Desc: directive observe-visibility for Vue 3
Docs: 
	* https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

Sample: 
    import { setupObserveVisibility } from "@/directives/observe-visibility";
    setupObserveVisibility(app);

    tmeplate:
    <div v-observe-visibility="onVisibilityChange"></div>

	const changeClassOnVisible = (e, dom) => {
		console.log(e, e.domVisible, dom);

		if (e.domVisible) {
			e.target.classList.add("visible");
			e.target.style.border = "2px solid green";
			e.target.style.visibility = "visible";
		} else {
			dom.classList.remove("visible");
			dom.style.border = "none";
			dom.style.visibility = "hidden";
		}
	};
*/

const options = {
	root: null,
	rootMargin: "0px",
	threshold: [0, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

let observer = null;

const ObserveVisibility = {
	created(el, binding /*, vnode*/) {
		//TODO: add options from binding

		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				// Each entry describes an intersection change for one observed
				// target element:
				//   entry.boundingClientRect
				//   entry.intersectionRatio
				//   entry.intersectionRect
				//   entry.isIntersecting
				//   entry.rootBounds
				//   entry.target
				//   entry.time

				const isVisible = entry.intersectionRatio > 0.0;
				const resObject = Object.assign(entry, { domVisible: isVisible });

				if (binding.value) binding.value(resObject, el);
			});
		}, options);

		observer.observe(el);
	},

	unmounted(el /*, binding, vnode*/) {
		if (observer) observer.unobserve(el);
	},
};

export const setupObserveVisibility = (app) =>
	app.directive("observe-visibility", ObserveVisibility);

export const ObserveVisibilityInstance = ObserveVisibility;

export default ObserveVisibility;
