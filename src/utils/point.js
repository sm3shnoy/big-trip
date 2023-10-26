import dayjs from 'dayjs';

export const isDateExpired = (date) => dayjs().isAfter(date);

export const isDateComing = (date) => dayjs().isBefore(date);
