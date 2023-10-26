const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

export const isEscEvent = (evt) => evt.code === Keys.ESC || evt.code === Keys.ESCAPE;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
