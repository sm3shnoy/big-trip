import AbstractView from './abstract';

const createBoardTemplate = () => `<ul class="trip-events__list"></ul>`;

export default class BoardView extends AbstractView {
  getTemplate() {
    return createBoardTemplate();
  }
}
