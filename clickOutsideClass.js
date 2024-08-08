/*
█▀ █▄█ █▀▀ █░█ █▀▀ █░█
▄█ ░█░ █▄▄ █▀█ ██▄ ▀▄▀

Author: <Anton Sychev> (anton at sychev dot xyz)
clickOutside.js (c) 2024
Created:  2024-08-05 21:58:07 
Desc: Directive to detect click outside an element detecmined by class
Sample: 

    main.js
        import { setupClickOutsideClass } from "@/directives/clickOutside";
        setupClickOutsideClass(app);
    
    or
        import clickOutside from "@/directives/clickOutside";
        app.directive("click-outside-class", clickOutside);

    template
        <div v-click-outside-class="{ class: ['.menu', '.user-menu', '.user-wishlist'], handler: configuration.setCloseAllMenus }">
*/

const onClickOutsideClass = {
	beforeMount(el, { value }) {
		el.clickOutsideEvent = (event) => {
			const classes =
				typeof value.class === "string" ? value.class : value.class.join(",");
			const dom = document.querySelectorAll(classes);

			// Check if event.target does not contain any element from "dom"
			let isOutside = true;
			dom.forEach((item) => {
				if (item.contains(event.target)) {
					isOutside = false;
				}
			});

			if (isOutside) value.handler();
		};
		document.addEventListener("click", el.clickOutsideEvent);
	},
	unmounted(el) {
		document.removeEventListener("click", el.clickOutsideEvent);
	},
};

export const setupClickOutsideClass = (app) => {
	app.directive("click-outside-class", onClickOutsideClass);
};

export default onClickOutsideClass;
