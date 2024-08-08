/*
█▀ █▄█ █▀▀ █░█ █▀▀ █░█
▄█ ░█░ █▄▄ █▀█ ██▄ ▀▄▀

Author: <Anton Sychev> (anton at sychev dot xyz)
clickoutsideDirective.js (c) 2024
Created:  2021-12-30T11:39:07.771Z
Desc: Detect click outside of element
Sample: 

	main.js:

		- auto
		import { setupClickOutside } from "@/directives/clickOutside";
        setupClickOutside(app);

		- manual
		import clickoutsideDirective from "@/directives/clickoutsideDirective";

		directives: {
			clickOutside: clickoutsideDirective,
		},

		- or 
		
		app.directive("click-outside", clickoutsideDirective);


	html dom:

	<div v-click-outside="onCampaingClickOutSide"><div>
*/

const clickoutsideDirective = {
	mounted(el, binding) {
		el.clickOutsideEvent = (event) => {
			if (!(el === event.target || el.contains(event.target)))
				binding.value(event, el);
		};
		document.body.addEventListener("click", el.clickOutsideEvent);
	},
	unmounted(el) {
		document.body.removeEventListener("click", el.clickOutsideEvent);
	},
};

export const setupClickOutside = (app) => {
	app.directive("click-outside", clickoutsideDirective);
};

export default clickoutsideDirective;
