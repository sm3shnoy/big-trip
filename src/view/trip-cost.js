import AbstractView from './abstract';

const getTotalPrice = (points) => {
  let totalCost = 0;

  points.forEach((item) => (totalCost += item.price));

  return totalCost;
};

const createTripCostTemplate = (points) =>
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points)}</span>
  </p>`;

export default class TripCostView extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}
