import AbstractView from './abstract';

const createFilterItemTemplate = (filters, isChecked) => {
  const { name, count } = filters;

  return `
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${
    isChecked ? 'checked' : ''
  }>
      <label class="trip-filters__filter-label" for="filter-${name}">${name} ${count}</label>
    </div>
  `;
};

const createFiltersTemplate = (filters) => {
  const filterItemsTemplate = filters.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
`;
};

export default class FiltersView extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }
}
