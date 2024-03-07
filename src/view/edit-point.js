import dayjs from 'dayjs';
import { POINT_TYPES, DESTINATIONS, DATE_FORMAT } from '../const.js';
import SmartView from './smart';
import { pickElementDependOnValue } from '../utils/point.js';
import { generatedDescriptions, generatedOffers } from '../mock/point.js';
import { getRandomInteger } from '../utils/common.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

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

const createEventOfferTemplate = (offers) => {
  return offers.length > 0
    ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offers
      .map(({ title, price }) => {
        const offerClassName = title.split(' ').pop();
        const checkedAttribute = getRandomInteger() ? 'checked' : '';
        return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerClassName}-1" type="checkbox" name="event-offer-${offerClassName}" ${checkedAttribute}>
    <label class="event__offer-label" for="event-offer-${offerClassName}-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
    </label>
    </div>`;
      })
      .join('')}
    </div></section>`
    : '';
};

const createEditPointTemplate = (data = {}) => {
  const {
    type = '',
    destination = '',
    offers = [],
    price = null,
    dateFrom = dayjs().format(DATE_FORMAT.DATE_HOUR),
    dateTo = dayjs().format(DATE_FORMAT.DATE_HOUR),
  } = data;

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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
            destination.name
          }" list="destination-list-1">
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
        ${createEventOfferTemplate(offers)}
        ${createEventDestinationTemplate(destination)}
      </section>
    </form>
  </li>`;
};

const createPhotoContainer = (photos) => {
  return photos.length > 0
    ? `<div class="event__photos-container">
    <div class="event__photos-tape">
    ${photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo"></img>`).join('')}
    </div></div>`
    : '';
};

const createEventDestinationTemplate = (destination, photos) => {
  return destination.description.length > 0 || photos.length > 0
    ? `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destination.description}</p>
  ${createPhotoContainer(destination.photos)}
</section>`
    : '';
};

export default class EditPoint extends SmartView {
  constructor(point) {
    super();
    this._datepickerStart = null;
    this._datepickerEnd = null;
    this._data = EditPoint.parseDataToState(point);
    this._closeEditClickHandler = this._closeEditClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._pointTypeChangeHandler = this._pointTypeChangeHandler.bind(this);
    this._pointInputHandler = this._pointInputHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._setInnerListeners();
    this._setDatepickerStart();
    this._setDatepickerEnd();
  }

  getTemplate() {
    return createEditPointTemplate(this._data);
  }

  _setDatepickerStart() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._data.dateFrom) {
      this._datepickerStart = flatpickr(this.getElement().querySelector('#event-start-time-1'), {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateFrom,
        enableTime: true,
        onChange: this._dateFromChangeHandler,
      });
    }
  }

  _setDatepickerEnd() {
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    if (this._data.dateFrom) {
      this._datepickerEnd = flatpickr(this.getElement().querySelector('#event-end-time-1'), {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateTo,
        enableTime: true,
        onChange: this._dateToChangeHandler,
      });
    }
  }

  _dateFromChangeHandler([userDate]) {
    this.updateData({
      dateFrom: userDate,
    });
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate,
    });
  }

  _setInnerListeners() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._pointTypeChangeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._pointInputHandler);
  }

  restoreListeners() {
    this._setInnerListeners();
    this._setDatepickerStart();
    this._setDatepickerEnd();
    this.setCloseEditClickHandler(this._callback.closeEdit);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  resetInput(data) {
    this.updateData(EditPoint.parseStateToData(data));
  }

  _pointTypeChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.updateData({
      type: evt.target.value,
      offers: pickElementDependOnValue(evt.target.value, generatedOffers),
    });
  }

  _pointInputHandler(evt) {
    if (!DESTINATIONS.includes(evt.target.value)) {
      return;
    }

    evt.preventDefault();
    this.updateData({
      destination: pickElementDependOnValue(evt.target.value, generatedDescriptions, true),
    });
  }

  _closeEditClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeEdit();
  }

  setCloseEditClickHandler(callback) {
    this._callback.closeEdit = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeEditClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._formSubmitHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseStateToData(this._data));
  }

  static parseDataToState(data) {
    return Object.assign({}, data);
  }

  static parseStateToData(state) {
    return Object.assign({}, state);
  }
}
