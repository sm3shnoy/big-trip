import { isDateComing, isDateExpired } from '../utils';

const pointsToFilterMap = {
  everything: (points) => points.length,
  future: (points) =>
    points.filter(
      (point) => isDateComing(point.dateFrom) || (isDateExpired(point.dateFrom) && isDateComing(point.dateTo))
    ).length,
  past: (points) =>
    points.filter(
      (point) => isDateExpired(point.dateTo) || (isDateExpired(point.dateFrom) && isDateComing(point.dateTo))
    ).length,
};

export const generateFilter = (points) => {
  return Object.entries(pointsToFilterMap).map(([filterName, countPoints]) => {
    return {
      name: filterName,
      count: countPoints(points),
    };
  });
};
