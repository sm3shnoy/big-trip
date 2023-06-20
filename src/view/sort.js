import { createElement } from '../utils';

const createSortItemTemplate = (type, name, isChecked) => {
  return `
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${
    isChecked && 'checked'
  } ${type === 'offer' && 'disabled'}>
      <label class="trip-sort__btn" for="sort-${type}">${name}</label>
    </div>
  `;
};

const createSortListTemplate = (sorting) => {
  const sortItemsTemplate = sorting
    .map((item, index) => createSortItemTemplate(item.type, item.name, index === 0))
    .join('');

  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>
  `;
};

export default class Sorting {
  constructor(sorting) {
    this._element = null;
    this._sorting = sorting;
  }

  getTemplate() {
    return createSortListTemplate(this._sorting);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
