import EventPlanner from './Client/EventPlanner.js';

class App {
  #EventPlanner;

  constructor() {
    this.#EventPlanner = new EventPlanner();
  }

  async run() {
    this.#EventPlanner.printWelcomeMessage();
    await this.#EventPlanner.inputExpectedVisitDate();
    await this.#EventPlanner.inputOrderMenuAndCount();
  }
}

export default App;
