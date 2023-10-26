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
import { render, RenderPosition, replace } from './utils/render.js';
import { isEscEvent } from './utils/common.js';

const POINT_COUNT = 16;

const siteBodyElement = document.querySelector('.page-body');
const menuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const filterElement = siteBodyElement.querySelector('.trip-controls__filters');
const tripDetailsElement = siteBodyElement.querySelector('.trip-main');
const tripBoardElement = siteBodyElement.querySelector('.trip-events');

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const filters = generateFilter(points);
render(menuElement, new MainMenuView(), RenderPosition.BEFOREEND);
render(filterElement, new FiltersView(filters), RenderPosition.BEFOREEND);

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
    replace(pointComponent, editPointComponent);
    window.removeEventListener('keydown', onEditFormEscKeyDown);
  };

  const changeViewToEdit = () => {
    replace(editPointComponent, pointComponent);
    window.addEventListener('keydown', onEditFormEscKeyDown);
  };

  pointComponent.setEditClickHandler(changeViewToEdit);
  editPointComponent.setCloseEditClickHandler(changeViewToPoint);

  editPointComponent.setFormSubmitHandler((evt) => {
    evt.preventDefault();
    changeViewToPoint();
  });

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (pointsData) => {
  if (POINT_COUNT < 1) {
    render(tripBoardElement, new EmptyListView(), RenderPosition.BEFOREEND);
    return;
  }

  const tripInfoComponent = new TripInfoView(points);
  render(tripDetailsElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
  render(tripInfoComponent, new TripCostView(pointsData), RenderPosition.BEFOREENDBEGIN);
  render(tripBoardElement, new Sorting(SORTING), RenderPosition.BEFOREEND);
  const board = new BoardView();
  render(tripBoardElement, board, RenderPosition.BEFOREEND);

  for (let i = 1; i < POINT_COUNT; i++) {
    renderPoint(board.getElement(), pointsData[i]);
  }
};

renderBoard(points);
