export class Section {
   constructor ({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
   }

   addItem(element) {
    console.log(this._containerSelector);
    this._containerSelector.append(element);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
