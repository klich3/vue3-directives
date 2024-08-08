# VUE3 - Directives Library

Compilation of directives that are quite helpful when programming projects, instead of searching by projects, they are gathered here.



## clickOutsideClass

Desc: Directive to detect click outside an element determined by class



<details>
    <summary>Sample:</summary>

```javascript
main.js
import { setupClickOutsideClass } from "@/directives/clickOutside";
setupClickOutsideClass(app);

or

import clickOutside from "@/directives/clickOutside";
app.directive("click-outside-class", clickOutside);
```

```html
template
<div v-click-outside-class="{ class: ['.menu', '.user-menu', '.user-wishlist'], handler: configuration.setCloseAllMenus }">
```

</details>

## clickoutsideDirective

Desc: Detect click outside of element

<details>
    <summary>Sample:</summary>

```javascript
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
```

```html
html dom:

<div v-click-outside="onCampaingClickOutSide"><div>
```
</details>

## contentFromSource

Desc: This directive clones some DOM content to another element. It is useful for cloning a desktop menu to a mobile version or repeating content on a page.

Docs: documentation

<details>
    <summary>Sample:</summary>

```javascript
main.js:

import { setupFromSource } from "contentFromSource.js"
setupFromSource(app);

- or manual

import contentFromSource from "@/plugins/directives/contentFromSource.js";
Vue.directive("from-source", contentFromSource);
```

```html
template:
dom: a DOM element like div, span, p, or a query selector like class -> .class or #id

<div v-from-source="{ dom:'in-viewport', to:'.header' }"></div>

If "to" is specified, the clone will be placed inside that DOM element.
```
</details>


## onChangeDirective

Desc: This directive triggers a callback function when a class is added to the element

<details>
    <summary>Sample:</summary>

```javascript
main.js:

import { setupOnChange } from "onChangeDirective.js"
setupOnChange(app);

- or manual

import onChangeDirective from "@/plugins/directives/onChangeDirective.js";
Vue.directive("onchange", onChangeDirective);
```

```html
template:
class: when this class appears, it triggers the callback function
data: if needed, data can be passed to the callback function

<div v-onchange="{ class:'in-viewport', data: {} }" @on-change="function_callback"></div>

function_callback -> attributes
el -> DOM element
data -> parsed data
```
</details>

## observeVisibility


Desc: directive observe-visibility for Vue 3
Docs: 
	* https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

<details>
    <summary>Sample:</summary>

```javascript
    import { setupObserveVisibility } from "@/directives/observe-visibility";
    setupObserveVisibility(app);
```

```html
    tmeplate:
    <div v-observe-visibility="onVisibilityChange"></div>
```

```javascript
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
```
</details>