/* eslint-disable no-return-await */
import OutputView from '../OutputView.js';
import InputView from '../InputView.js';
import HttpRequest from './HttpRequest.js';
import RequestMapping from '../Server/Controller/RequestMapping.js';
import CONSTANTS from '../Util/Constants.js';
import RESTFULAPI from '../Util/API.js';

class EventPlanner {
  #server;

  constructor() {
    this.#server = new RequestMapping();
  }

  printWelcomeMessage() {
    OutputView.printWelcomeMessage();
  }

  inputExpectedVisitDate = async () => {
    const expectedVisitDate = await InputView.readDate();
    const responseData = await this.ajax(
      RESTFULAPI.dateValidation,
      expectedVisitDate,
      this.inputExpectedVisitDate,
    );
  };

  ajax = async (url, data, callback) => {
    const httpRequest = new HttpRequest(url, data);
    const httpResponse = this.#server.requestAPI(httpRequest);
    if (httpResponse.status === CONSTANTS.error) {
      return await callback();
    }
    return httpResponse.responseData;
  };
}

export default EventPlanner;
