export default class Section {
    constructor({renderer}, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems(items, userData) {
        items.reverse().forEach(item => {
            this._renderer(item, userData);
        });     
    }

    addItems(element) {
        this._container.append(element);
    }
    
    prependItem(element) {
        this._container.prepend(element);
    } 
}