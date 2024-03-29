import dayjs from 'dayjs';
import { DATE_FORMAT } from '../const.js';
import AbstractView from './abstract.js';

const createPointOfferTemplate = (offers) => {
  return offers.length > 0
    ? `${offers
        .map(
          ({ title, price }) => `<li
    class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
    </li>`
        )
        .join('')}`
    : '';
};

export const createPointTemplate = (point) => {
  const { type, destination, offers, price, duration, dateFrom, dateTo, isFavorite } = point;
  const formatFromDateDayMonth = dayjs(dateFrom).format(DATE_FORMAT.DAY_MONTH);
  const formatFromDateIso = dayjs(dateFrom).format(DATE_FORMAT.ISO);
  const formatToDateIso = dayjs(dateTo).format(DATE_FORMAT.ISO);
  const formatToStartTime = dayjs(dateFrom).format(DATE_FORMAT.HOUR_MINUTE);
  const formatToEndTime = dayjs(dateTo).format(DATE_FORMAT.HOUR_MINUTE);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${formatFromDateIso}">${formatFromDateDayMonth}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${formatFromDateIso}">${formatToStartTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${formatToDateIso}">${formatToEndTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createPointOfferTemplate(offers)}
      </ul>
      <button class="event__favorite-btn ${isFavorite && 'event__favorite-btn--active'}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class PointView extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}
