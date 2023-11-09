import { ERROR_MESSAGE } from '../../Util/Message.js';

class UserDTO {
  #expectedVisitDate;

  checkDateInvalid(expectedVisitedDate) {
    const date = Number(expectedVisitedDate);
    if (Number.isNaN(date)) throw new Error(ERROR_MESSAGE.isChar);
    this.#expectedVisitDate = date;
  }

  get expectedVisitDate() {
    return this.#expectedVisitDate;
  }
}

export default UserDTO;
