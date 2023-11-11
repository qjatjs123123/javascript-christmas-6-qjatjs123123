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

  printResultDiscountInfo() {
    OutputView.printEventPreviewMessage(this.#userDTO.getExpectedVisitDate());
    OutputView.printMenu(this.#userDTO.getUserMenu());
    OutputView.printOriginalOrderAmount(this.#userDTO.getOriginalOrderAmount());
    OutputView.printFreeGift(this.#userDTO.getFreeGift());
    OutputView.printDiscountHistory(this.#userDTO.getDisCountHistory());
    OutputView.printAllDiscountAmount(this.#userDTO.getAllDiscountAmount());
    OutputView.printPaymentTotal(this.#userDTO.getPaymentTotal());
    OutputView.printEventBadge(this.#userDTO.getEventBadge());
  }

  requestMenuAndCount = async () => {
    const menuAndCount = await InputView.readOrderMenuAndCount();
    const responseData = await this.ajax(
      RESTFULAPI.orderMenuAndCount,
      {
        userDTO: this.#userDTO,
        menuAndCount,
      },
      this.requestMenuAndCount,
    );
    if (responseData) this.#userDTO = responseData;
  };

  requestVisitDate = async () => {
    const expectedVisitDate = await InputView.readDate();
    const responseData = await this.ajax(
      RESTFULAPI.dateValidation,
      expectedVisitDate,
      this.requestVisitDate,
    );
    if (responseData) this.#userDTO = responseData;
  };

  requestResultDiscountInfo = async () => {
    const responseData = await this.ajax(RESTFULAPI.getResultDiscountInfo, this.#userDTO, null);
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
