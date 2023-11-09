import { ERROR_MESSAGE } from '../../Util/Message.js';

class UserDTO {
  #expectedVisitDate;

  checkDateInvalid(expectedVisitedDate) {
    if (expectedVisitedDate === '') throw new Error(ERROR_MESSAGE.isBlank);
    if (Number.isNaN(Number(expectedVisitedDate))) throw new Error(ERROR_MESSAGE.isChar);
    this.#expectedVisitDate = Number(expectedVisitedDate);
  }

  get expectedVisitDate() {
    return this.#expectedVisitDate;
  }
}

export default UserDTO;
