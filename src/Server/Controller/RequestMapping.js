import HttpResponse from '../DTO/HttpResponse.js';
import CONSTANTS from '../../Util/Constants.js';

class RequestMapping {
  requestAPI(httpRequest) {
    const httpResponse = new HttpResponse(CONSTANTS.error, null);
    return httpResponse;
  }
}

export default RequestMapping;
