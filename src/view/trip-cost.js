const getTotalPrice = (points) => {
  let totalCost = 0;

  points.forEach((item) => (totalCost += item.price));

  return totalCost;
};

export const createTripCostTemplate = (points) =>
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points)}</span>
  </p>`;
