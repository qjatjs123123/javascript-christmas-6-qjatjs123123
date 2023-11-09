import { ERROR_MESSAGE } from '../../Util/Message.js';
import { CONSTANTS } from '../../Util/Constants.js';

class UserDTO {
  #expectedVisitDate;

  checkDateInvalid(expectedVisitedDate) {
    if (expectedVisitedDate === '') throw new Error(ERROR_MESSAGE.isBlank);

    const date = Number(expectedVisitedDate);
    if (Number.isNaN(date)) throw new Error(ERROR_MESSAGE.isChar);
    if (date < CONSTANTS.eventStartDate || date > CONSTANTS.eventEndDate)
      throw new Error(ERROR_MESSAGE.isNotDateRange);

    this.#expectedVisitDate = date;
  }

  get expectedVisitDate() {
    return this.#expectedVisitDate;
  }
}

export default UserDTO;
