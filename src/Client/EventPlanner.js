/* eslint-disable no-return-await */
import OutputView from '../OutputView.js';
import InputView from '../InputView.js';
import HttpRequest from './HttpRequest.js';
import RequestMapping from '../Server/Controller/RequestMapping.js';
import { CONSTANTS } from '../Util/Constants.js';
import RESTFULAPI from '../Util/API.js';

class EventPlanner {
  #server;
  #userDTO;

  constructor() {
    this.#server = new RequestMapping();
  }

  printWelcomeMessage() {
    OutputView.printWelcomeMessage();
  }

  inputOrderMenuAndCount = async () => {
    const menuAndCount = await InputView.readOrderMenuAndCount();
    const responseData = await this.ajax(
      RESTFULAPI.orderMenuAndCount,
      {
        userDTO: this.#userDTO,
        menuAndCount,
      },
      this.inputOrderMenuAndCount,
    );
    if (responseData) console.log(responseData.getOriginalOrderAmount());
  };

  inputExpectedVisitDate = async () => {
    const expectedVisitDate = await InputView.readDate();
    const responseData = await this.ajax(
      RESTFULAPI.dateValidation,
      expectedVisitDate,
      this.inputExpectedVisitDate,
    );
    if (responseData) this.#userDTO = responseData;
  };

  ajax = async (url, data, callback) => {
    const httpRequest = new HttpRequest(url, data);
    const httpResponse = this.#server.requestAPI(httpRequest);
    if (httpResponse.status === CONSTANTS.error) {
      OutputView.printError(httpResponse.responseData);
      return await callback();
    }
    return httpResponse.responseData;
  };
}

export default EventPlanner;
