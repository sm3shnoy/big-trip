import { createElement } from '../utils';

const getTotalPrice = (points) => {
  let totalCost = 0;

  points.forEach((item) => (totalCost += item.price));

  return totalCost;
};

const createTripCostTemplate = (points) =>
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points)}</span>
  </p>`;

export default class TripCost {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
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
