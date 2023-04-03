import { createBoardTemplate } from './view/sort.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createPointTemplate } from './view/point.js';
import { createNavigationTemplate } from './view/navigation.js';
import { createFiltersTemplate } from './view/filters.js';
import { createNewPointFormTemplate } from './view/add-new-point.js';
import { createEditPointTemplate } from './view/edit-point.js';
import { createTripCostTemplate } from './view/trip-cost.js';
import { generatePoint } from './mock/point.js';
import { generateFilter } from './mock/filter.js';

const POINT_COUNT = 16;
const DEFAULT_POSITION = 'beforeend';

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const filters = generateFilter(points);

const render = (container, template, place = DEFAULT_POSITION) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector('.trip-main');
render(header, createTripInfoTemplate(points), 'afterbegin');

const tripInfo = header.querySelector('.trip-info');
render(tripInfo, createTripCostTemplate(points));

const controls = document.querySelector('.trip-controls');
render(controls, createNavigationTemplate());
render(controls, createFiltersTemplate(filters));

const mainBoard = document.querySelector('.trip-events');
render(mainBoard, createBoardTemplate());

const tripEventsList = mainBoard.querySelector('.trip-events__list');
render(tripEventsList, createEditPointTemplate(points[0]));
render(tripEventsList, createNewPointFormTemplate());

for (let i = 1; i < POINT_COUNT; i++) {
  render(tripEventsList, createPointTemplate(points[i]));
}
