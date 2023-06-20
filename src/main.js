import Sorting from './view/sort.js';
import TripInfo from './view/trip-info.js';
import { Point } from './view/point.js';
import { Navigation } from './view/navigation.js';
import Filters from './view/filters.js';
import { EditPoint } from './view/edit-point.js';
import TripCost from './view/trip-cost.js';
import { generatePoint } from './mock/point.js';
import { generateFilter } from './mock/filter.js';
import { SORTING } from './const.js';
import { renderElement, RenderPosition, renderTemplate } from './utils.js';
import Board from './view/board.js';

const POINT_COUNT = 16;

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const filters = generateFilter(points);

const header = document.querySelector('.trip-main');
renderElement(header, new TripInfo(points).getElement(), RenderPosition.AFTERBEGIN);

const tripInfo = header.querySelector('.trip-info');
renderElement(tripInfo, new TripCost(points).getElement(), RenderPosition.BEFOREEND);

const controls = document.querySelector('.trip-controls');
renderElement(controls, new Navigation().getElement(), RenderPosition.BEFOREEND);
renderElement(controls, new Filters(filters).getElement(), RenderPosition.BEFOREEND);

const mainBoard = document.querySelector('.trip-events');
renderElement(mainBoard, new Sorting(SORTING).getElement(), RenderPosition.BEFOREEND);
const board = new Board();
renderElement(mainBoard, board.getElement(), RenderPosition.BEFOREEND);

const renderPoint = (pointListElement, pointData) => {
  const pointComponent = new Point(pointData);
  const editPointComponent = new EditPoint(pointData);

  const changeViewToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), editPointComponent.getElement());
  };

  const changeViewToEdit = () => {
    pointListElement.replaceChild(editPointComponent.getElement(), pointComponent.getElement());
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

for (let i = 1; i < POINT_COUNT; i++) {
  renderPoint(board.getElement(), points[i]);
}
