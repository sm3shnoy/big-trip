import AbstractView from './abstract';

const createPointListTemplate = () => `<ul class="trip-events__list"></ul>`;

export default class PointListView extends AbstractView {
  getTemplate() {
    return createPointListTemplate();
  }
}
