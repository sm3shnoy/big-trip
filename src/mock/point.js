import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DESTINATIONS, POINT_TYPES } from '../const.js';
import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { nanoid } from 'nanoid';
import { generateRandomOffers } from './offers.js';
import { pickElementDependOnValue } from '../utils/point.js';

dayjs.extend(duration);

const MAX_DESCRIPTION_COUNT = 5;
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const PRICES = {
  min: 100,
  max: 1000,
};
const MAX_PHOTOS_COUNT = 6;

const generateDescription = () => {
  const result = new Array(getRandomInteger(1, MAX_DESCRIPTION_COUNT))
    .fill()
    .map(() => DESCRIPTIONS[getRandomInteger(0, MAX_DESCRIPTION_COUNT)]);

  return result.join(' ');
};

const generateDescriptionPhoto = () =>
  new Array(getRandomInteger(1, MAX_PHOTOS_COUNT))
    .fill()
    .map(() => `https://loremflickr.com/320/240?random=${getRandomInteger(1, 99)}`);

const generateTypePoint = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);

  return POINT_TYPES[randomIndex];
};

const generateDestination = (city) => {
  return {
    name: city,
    description: generateDescription(),
    photos: generateDescriptionPhoto(),
  };
};

const generatePrice = () => getRandomInteger(PRICES.min, PRICES.max);

const Period = {
  START_DATE_MAX_GAP: 7,
  DATE_FROM_MIN: 60,
  DATE_FROM_MAX: 120,
  DATE_TO_MIN: 180,
  DATE_TO_MAX: 2880,
};

const generateDate = () => {
  const startDaysGap = getRandomInteger(-Period.START_DATE_MAX_GAP, Period.START_DATE_MAX_GAP);
  let startedDay = dayjs().add(startDaysGap, 'd');

  return () => {
    const dateFromGap = getRandomInteger(Period.DATE_FROM_MIN, Period.DATE_FROM_MAX);
    const dateToGap = getRandomInteger(Period.DATE_TO_MIN, Period.DATE_TO_MAX);

    const startTripDate = dayjs(startedDay).add(dateFromGap, 'm').toDate();
    const endTripDate = dayjs(startTripDate).add(dateToGap, 'm').toDate();
    startedDay = endTripDate;

    return {
      startTripDate,
      endTripDate,
    };
  };
};

const generateDifference = (dateTo, dateFrom) => {
  const totalMinutesInDate = dayjs(dateFrom).diff(dateTo, 'm');
  const days = Math.floor(totalMinutesInDate / 60 / 24);
  const hours = Math.floor(totalMinutesInDate / 60 - days * 24);
  const minutes = Math.floor(totalMinutesInDate - (hours * 60 + days * 24 * 60));

  let result = '';

  if (days > 0) {
    result += `${days}d `;
  }

  if (hours > 0) {
    result += `${hours}h `;
  }

  if (minutes > 0) {
    result += `${minutes}m `;
  }

  return result;
};

export const generatedDescriptions = DESTINATIONS.map((city) => generateDestination(city));

const getData = generateDate();
export const generatedOffers = generateRandomOffers(POINT_TYPES);

export const generatePoint = () => {
  const dateInterval = getData();
  const type = getRandomArrayElement(POINT_TYPES);

  return {
    id: nanoid(),
    type: generateTypePoint(),
    destination: getRandomArrayElement(generatedDescriptions),
    offers: pickElementDependOnValue(type, generatedOffers),
    price: generatePrice(),
    dateFrom: dateInterval.startTripDate,
    dateTo: dateInterval.endTripDate,
    duration: generateDifference(dateInterval.startTripDate, dateInterval.endTripDate),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
