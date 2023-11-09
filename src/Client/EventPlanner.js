import OutputView from '../OutputView.js';
import InputView from '../InputView.js';

class EventPlanner {
  printWelcomeMessage() {
    OutputView.printWelcomeMessage();
  }

  inputExpectedVisitDate = async () => {
    const expectedVisitDate = await InputView.readDate();
    console.log(expectedVisitDate);
  }
}

export default EventPlanner;
