export const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const DESTINATIONS = ['Женева', 'Венеция', 'Прага', 'Нью-Йорк', 'Калифорния', 'Санкт-Петербург'];

export const DATE_FORMAT = {
  DAY_MONTH: 'D MMM',
  HOUR_MINUTE: 'hh:mm',
  YEAR_MONTH_DAY: 'YYYY-MM-DD',
  ISO: 'YYYY-MM-DDTHH:mm',
  DATE_HOUR: 'DD/MM/YY HH:mm',
};

export const OFFERS = [
  { id: 0, name: 'Add luggage' },
  { id: 1, name: 'Switch to comfort' },
  { id: 2, name: 'Book tickets' },
  { id: 3, name: 'Add breakfast' },
  { id: 4, name: 'Lunch in city' },
  { id: 5, name: 'Rent a car' },
];

export const SORTING = [
  { type: 'day', name: 'Day' },
  { type: 'event', name: 'Event' },
  { type: 'time', name: 'Time' },
  { type: 'price', name: 'Price' },
  { type: 'offer', name: 'Offers' },
];
