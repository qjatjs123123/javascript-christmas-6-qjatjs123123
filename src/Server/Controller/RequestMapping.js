import HttpResponse from '../DTO/HttpResponse.js';
import CONSTANTS from '../../Util/Constants.js';
import EventController from './EventController.js';
import API from '../../Util/API.js';

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
      return HttpResponse(CONSTANTS.error, error.message);
    }
  }

  getResponseData(httpRequest) {
    switch (httpRequest.restfulAPI) {
      case API.dateValidation:
        return this.#eventController.checkDateInvalid(httpRequest.body);

      default:
        return console.log('qwe');
    }
  }
}

export default RequestMapping;
