import AbstractView from './abstract';

const createEmptyList = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

export default class EmptyListView extends AbstractView {
  getTemplate() {
    return createEmptyList();
  }
}
