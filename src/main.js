import Sorting from './view/sort.js';
import TripInfoView from './view/trip-info.js';
import MainMenuView from './view/main-menu.js';
import FiltersView from './view/filters.js';
import TripCostView from './view/trip-cost.js';
import BoardView from './view/board.js';
import EmptyListView from './view/empty-list.js';
import EditPointView from './view/edit-point.js';
import PointView from './view/point.js';
import { generatePoint } from './mock/point.js';
import { generateFilter } from './mock/filter.js';
import { SORTING } from './const.js';
import { renderElement, RenderPosition, isEscEvent } from './utils.js';

const POINT_COUNT = 16;

const siteBodyElement = document.querySelector('.page-body');
const menuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const filterElement = siteBodyElement.querySelector('.trip-controls__filters');
const tripDetailsElement = siteBodyElement.querySelector('.trip-main');
const tripBoardElement = siteBodyElement.querySelector('.trip-events');

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const filters = generateFilter(points);

renderElement(menuElement, new MainMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(filterElement, new FiltersView(filters).getElement(), RenderPosition.BEFOREEND);

const renderPoint = (pointListElement, pointData) => {
  const pointComponent = new PointView(pointData);
  const editPointComponent = new EditPointView(pointData);

  const onEditFormEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      changeViewToPoint();
    }
  };

  const changeViewToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), editPointComponent.getElement());

    window.removeEventListener('keydown', onEditFormEscKeyDown);
  };

  const changeViewToEdit = () => {
    pointListElement.replaceChild(editPointComponent.getElement(), pointComponent.getElement());
    window.addEventListener('keydown', onEditFormEscKeyDown);
  };

  editPointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', changeViewToPoint);
  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', changeViewToEdit);

  editPointComponent
    .getElement()
    .querySelector('.event--edit')
    .addEventListener('submit', (evt) => {
      evt.preventDefault();
      changeViewToPoint();
    });

  renderElement(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (pointsData) => {
  if (POINT_COUNT < 1) {
    renderElement(tripBoardElement, new EmptyListView().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const tripInfoComponent = new TripInfoView(points);
  renderElement(tripDetailsElement, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
  renderElement(tripInfoComponent.getElement, new TripCostView(pointsData).getElement(), RenderPosition.BEFOREENDBEGIN);
  renderElement(tripBoardElement, new Sorting(SORTING).getElement(), RenderPosition.BEFOREEND);
  const board = new BoardView();
  renderElement(tripBoardElement, board.getElement(), RenderPosition.BEFOREEND);

  for (let i = 1; i < POINT_COUNT; i++) {
    renderPoint(board.getElement(), pointsData[i]);
  }
};

renderBoard(points);
