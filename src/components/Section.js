export default class Section {
    constructor({items, renderer}, selector) {
        this._initialArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems() {
        this._initialArray.forEach(item => {
            this._renderer(item);
        });     
    }

    addItems(element) {
        this._container.append(element);
    }
    
    addItem(element) {
        this._container.prepend(element);
    } 
}





