import { OFFERS } from '../const.js';
import { getRandomInteger } from '../utils.js';

const getUniqueOffers = (offers) => {
  const uniqueOffersList = new Set(offers.map((item) => item));
  const ids = Array.from(uniqueOffersList);

  return ids;
};

export const generateTemplateOffers = (offers) => {
  const ids = getUniqueOffers(offers);

  return ids
    .map((item) => {
      const name = OFFERS[item].name;

      return `<li class="event__offer">
  <span class="event__offer-title">${name}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${getRandomInteger(20, 100)}</span>
</li>
`;
    })
    .join('');
};

export const generateTemplateEditPointOffers = (offers) => {
  const ids = getUniqueOffers(offers);

  return ids
    .map((item) => {
      const name = OFFERS[item].name;

      return `<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1" type="checkbox" name="event-offer-${name}" checked>
<label class="event__offer-label" for="event-offer-luggage-1">
  <span class="event__offer-title">${name}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${getRandomInteger(20, 100)}</span>
</label>
</div>`;
    })
    .join('');
};
