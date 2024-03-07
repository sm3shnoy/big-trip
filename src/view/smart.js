import Abstract from './abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
  }

  restoreListeners() {
    throw new Error('Abstract method not implemented: restoreListeners');
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
  }

  updateData(update, needToUpdate) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    if (needToUpdate) {
      return;
    }

    this.updateElement();
    this.restoreListeners();
  }
}
