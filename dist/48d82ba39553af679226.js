import"core-js/modules/es.weak-map.js";import"core-js/modules/esnext.weak-map.delete-all.js";import"core-js/modules/es.object.to-string.js";import"core-js/modules/es.string.iterator.js";import"core-js/modules/es.array.iterator.js";import"core-js/modules/web.dom-collections.iterator.js";function saveToLocalStorage(e,o){var a=JSON.stringify(o);localStorage.setItem(e,a)}function loadObjectLocalStorage(e){return JSON.parse(localStorage.getItem(e))||{}}function loadWeakMapFromLocalStorage(e){return JSON.parse(localStorage.getItem(e))||new WeakMap}export{saveToLocalStorage,loadObjectLocalStorage,loadWeakMapFromLocalStorage};