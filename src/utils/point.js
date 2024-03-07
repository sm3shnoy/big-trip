import dayjs from 'dayjs';

export const isDateExpired = (date) => dayjs().isAfter(date);

export const isDateComing = (date) => dayjs().isBefore(date);

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortPointUp = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  if (weight !== null) {
    return weight;
  }

  return dayjs(pointB.dateFrom).diff(pointA.dateFrom);
};

export const sortPrice = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

export const sortOffer = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.offers, pointB.offers);

  if (weight !== null) {
    return weight;
  }

  return pointB.offers.length - pointA.offers.length;
};

export const sortEvent = (pointA, pointB) => {
  if (pointA.destination < pointB.destination) {
    return -1;
  }

  if (pointA.destination > pointB.destination) {
    return 1;
  }

  return 0;
};

export const sortTime = (pointA, pointB) => {
  const totalMinutesInDatePointA = dayjs(pointA.dateFrom).diff(pointA.dateTo, 'm');
  const totalMinutesInDatePointB = dayjs(pointB.dateFrom).diff(pointB.dateTo, 'm');

  return totalMinutesInDatePointB - totalMinutesInDatePointA;
};

export const pickElementDependOnValue = (value, elements, descriptionFlag) => {
  if (descriptionFlag) {
    return elements.find((element) => element.name === value);
  }

  return elements.find((element) => element.type === value).offers;
};
