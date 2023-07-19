import dayjs from 'dayjs';
import { createElement } from '../utils';
import { generateTemplateEditPointOffers } from '../mock/offers.js';
import { POINT_TYPES, DESTINATIONS, DATE_FORMAT } from '../const.js';

const createEventType = (types, currentType = '') => {
  return types
    .map(
      (type) =>
        `<div class="event__type-item">
                <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${
          currentType === type ? 'checked' : ''
        }>
                <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
              </div>`
    )
    .join('');
};

const createDestinationList = (destinations) => {
  return destinations.map((city) => `<option value="${city}"></option>`).join('');
};

const createPhotoList = (photos) => {
  return `<div class="event__photos-container">
    <div class="event__photos-tape">
    ${photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join('')}
    </div>
  </div>`;
};

const createEditPointTemplate = (point = {}) => {
  const {
    type = '',
    destination = '',
    offers = [],
    info = {},
    price = null,
    dateFrom = dayjs().format(DATE_FORMAT.DATE_HOUR),
    dateTo = dayjs().format(DATE_FORMAT.DATE_HOUR),
  } = point;

  const startDate = dayjs(dateFrom).format(DATE_FORMAT.DATE_HOUR);
  const endDate = dayjs(dateTo).format(DATE_FORMAT.DATE_HOUR);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${createEventType(POINT_TYPES, type)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationList(DESTINATIONS)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
      ${
        offers.length > 0
          ? `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${generateTemplateEditPointOffers(offers)}
          </div>
        </section>
        `
          : ''
      }

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${info.description}</p>
          ${createPhotoList(info.photos)}
        </section>
      </section>
    </form>
  </li>`;
};

export default class EditPointView {
  constructor(point) {
    this._element = null;
    this._point = point;
  }

  getTemplate() {
    return createEditPointTemplate(this._point);
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
