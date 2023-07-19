import dayjs from 'dayjs';
import { DATE_FORMAT } from '../const.js';
import { createElement } from '../utils.js';

const getTotalRoute = (points) => {
  const uniqueCityList = new Set(points.map((point) => point.destination));
  const totalRoute = Array.from(uniqueCityList).join(' &mdash; ');

  return totalRoute;
};

const getTotalDateGap = (points) => {
  const datesFrom = points
    .map(({ dateFrom }) => dateFrom)
    .sort((toDate, fromDate) => dayjs(toDate).diff(fromDate))
    .shift();
  const datesTo = points
    .map(({ dateTo }) => dateTo)
    .sort((toDate, fromDate) => dayjs(toDate).diff(fromDate))
    .pop();

  return `${dayjs(datesFrom).format(DATE_FORMAT.DAY_MONTH)} - ${dayjs(datesTo).format(DATE_FORMAT.DAY_MONTH)}`;
};

const createTripInfoTemplate = (points) => {
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTotalRoute(points)}</h1>

      <p class="trip-info__dates">${getTotalDateGap(points)}</p>
    </div>
  </section>`;
};

export default class TripInfoView {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
