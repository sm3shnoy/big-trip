import { SortType } from '../const';
import AbstractView from './abstract';

const createSortItemTemplate = (type, name, isChecked) => {
  return `
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${type}" data-sort-type="${
    SortType[type.toUpperCase()]
  }" ${isChecked && 'checked'}>
      <label class="trip-sort__btn" for="sort-${type}">${name}</label>
    </div>
  `;
};

const createSortListTemplate = (sorting, currentSort) => {
  const sortItemsTemplate = sorting
    .map((item) => createSortItemTemplate(item.type, item.name, SortType[item.type.toUpperCase()] === currentSort))
    .join('');

  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>
  `;
};

export default class Sorting extends AbstractView {
  constructor(sorting, currentSort) {
    super();
    this._sorting = sorting;
    this._currentSort = currentSort;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortListTemplate(this._sorting, this._currentSort);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('change', this._sortTypeChangeHandler);
  }
}
