import MainMenuView from './view/main-menu.js';
import FiltersView from './view/filters.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import { generatePoint } from './mock/point.js';
import { generateFilter } from './mock/filter.js';
import { render, RenderPosition } from './utils/render.js';
import BoardPresenter from './presenter/board.js';

const POINT_COUNT = 16;
const siteBodyElement = document.querySelector('.page-body');
const siteMainElement = document.querySelector('.page-body__page-main .page-body__container');
const menuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const filterElement = siteBodyElement.querySelector('.trip-controls__filters');
const tripDetailsElement = siteBodyElement.querySelector('.trip-main');
const boardPresenter = new BoardPresenter(siteMainElement);

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const filters = generateFilter(points);
const tripInfoComponent = new TripInfoView(points);

render(menuElement, new MainMenuView(), RenderPosition.BEFOREEND);
render(filterElement, new FiltersView(filters), RenderPosition.BEFOREEND);
render(tripDetailsElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripInfoComponent, new TripCostView(points), RenderPosition.BEFOREEND);

boardPresenter.init(points);
