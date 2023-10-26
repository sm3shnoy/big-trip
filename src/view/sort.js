import AbstractView from './abstract';

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

export default class Sorting extends AbstractView {
  constructor(sorting) {
    super();
    this._sorting = sorting;
  }

  getTemplate() {
    return createSortListTemplate(this._sorting);
  }
}
