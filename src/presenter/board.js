import Sorting from '../view/sort.js';
import { SORTING, SortType } from '../const.js';
import MainMenuView from '../view/main-menu.js';
import FiltersView from '../view/filters.js';
import BoardView from '../view/board.js';
import EmptyListView from '../view/empty-list.js';
import PointListView from '../view/point-list.js';
import PointPresenter from './point.js';
import { RenderPosition, render } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import { sortPointUp, sortPrice, sortOffer, sortTime, sortEvent } from '../utils/point.js';

const POINT_COUNT = 16;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._boardComponent = new BoardView();
    this._sortComponent = new Sorting(SORTING, this._currentSortType);
    this._pointListComponent = new PointListView();
    this._noPointsComponent = new EmptyListView();
    this._menuComponent = new MainMenuView();
    this._filterComponent = new FiltersView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardPoints) {
    this._boardPoints = boardPoints;
    this._sourceBoardPoints = boardPoints.slice();

    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._pointListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _handleModeChange() {
    Object.values(this._pointPresenter).forEach((presenter) => {
      presenter.resetView();
    });
  }

  _handlePointChange(updatedPoint) {
    this._boardPoints = updateItem(this._boardPoints, updatedPoint);
    this._sourceBoardPoints = updateItem(this._sourceBoardPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._boardPoints.sort(sortPointUp);
        break;
      case SortType.PRICE:
        this._boardPoints.sort(sortPrice);
        break;
      case SortType.OFFER:
        this._boardPoints.sort(sortOffer);
        break;
      case SortType.EVENT:
        this._boardPoints.sort(sortEvent);
        break;
      case SortType.TIME:
        this._boardPoints.sort(sortTime);
        break;
      default:
        this._boardPoints = this._sourceBoardPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderPointList();
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(
      this._pointListComponent,
      this._handlePointChange,
      this._handleModeChange
    );
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._boardPoints.forEach((boardPoint) => this._renderPoint(boardPoint));
  }

  _renderNoPoint() {
    render(this._boardComponent, this._noPointsComponent, RenderPosition.AFTERBEGIN);
  }

  _clearPointList() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter._destroy());
    this._pointPresenter = {};
  }

  _renderPointList() {
    this._renderPoints();
  }

  _renderBoard() {
    if (POINT_COUNT < 1) {
      this._renderNoPoint();
      return;
    }

    this._renderSort();
    this._renderPointList();
  }
}
