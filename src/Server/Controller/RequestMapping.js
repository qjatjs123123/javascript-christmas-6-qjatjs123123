import HttpResponse from '../DTO/HttpResponse.js';
import { CONSTANTS } from '../../Util/Constants.js';
import EventController from './EventController.js';
import API from '../../Util/API.js';
import { ERROR_MESSAGE } from '../../Util/Message.js';

class RequestMapping {
  #eventController;

  constructor() {
    this.#eventController = new EventController();
  }

  requestAPI(httpRequest) {
    try {
      const responsedata = this.getResponseData(httpRequest);
      return new HttpResponse(CONSTANTS.success, responsedata);
    } catch (error) {
      return new HttpResponse(CONSTANTS.error, error.message);
    }
  }

  getResponseData(httpRequest) {
    const { restfulAPI, body } = httpRequest.getHttpRequest();

    switch (restfulAPI) {
      case API.dateValidation:
        return this.#eventController.handleVisitDate(body);

      case API.orderMenuAndCount:
        return this.#eventController.handleOrderMenuAndCount(body);

      case API.getResultDiscountInfo:
        return this.#eventController.handleDiscountEvent(body);

      default:
        throw new Error(ERROR_MESSAGE.isNotAPI);
    }
  }
}

export default RequestMapping;
