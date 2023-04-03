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

export const createFiltersTemplate = (filters) => {
  const filterItemsTemplate = filters.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`;
};
