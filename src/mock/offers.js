import { OFFERS } from '../const.js';
import { getRandomInteger } from '../utils.js';

export const generateOffers = () => {
  const name = OFFERS[getRandomInteger(0, OFFERS.length - 1)];
  const price = getRandomInteger(20, 100);

  return {
    name,
    price,
  };
};

export const generateTemplateOffers = (offers) =>
  offers
    .map(
      (item) =>
        `<li class="event__offer">
  <span class="event__offer-title">${item.name}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${item.price}</span>
</li>
`
    )
    .join('');

export const generateTemplateEditPointOffers = (offers) =>
  offers
    .map(
      (item) => `<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.name}-1" type="checkbox" name="event-offer-${item.name}" checked>
<label class="event__offer-label" for="event-offer-luggage-1">
  <span class="event__offer-title">${item.name}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${item.price}</span>
</label>
</div>`
    )
    .join('');
