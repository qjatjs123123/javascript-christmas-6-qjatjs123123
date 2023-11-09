import EventPlanner from './Client/EventPlanner.js';

class App {
  #EventPlanner;

  constructor() {
    this.#EventPlanner = new EventPlanner();
  }

  async run() {
    this.#EventPlanner.printWelcomeMessage();
    this.#EventPlanner.inputExpectedVisitDate();
  }
}

export default App;
