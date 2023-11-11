import EventPlanner from './Client/EventPlanner.js';

class App {
  #EventPlanner;

  constructor() {
    this.#EventPlanner = new EventPlanner();
  }

  async run() {
    this.#EventPlanner.printWelcomeMessage();
    await this.#EventPlanner.requestVisitDate();
    await this.#EventPlanner.requestMenuAndCount();
    await this.#EventPlanner.requestResultDiscountInfo();
    this.#EventPlanner.printResultDiscountInfo();
  }
}

export default App;
