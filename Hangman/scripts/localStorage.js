function saveToLocalStorage(key, value) {
    let JSONValue = JSON.stringify(value)
    localStorage.setItem(key, JSONValue)
}

function loadObjectLocalStorage(key) {
    let result = JSON.parse(localStorage.getItem(key))
    return result || {}
}

function loadWeakMapFromLocalStorage(key) {
    let result = JSON.parse(localStorage.getItem(key))
    return result || new WeakMap()
}

// loadFromLocalStorage('gameUsers')

// localStorage.clear()
// 

export {saveToLocalStorage, loadObjectLocalStorage, loadWeakMapFromLocalStorage}
