import { ERROR_MESSAGE } from '../../Util/Message.js';
import { CONSTANTS, MENU } from '../../Util/Constants.js';

class UserDTO {
  #expectedVisitDate;
  #menu;

  checkDateInvalid(expectedVisitedDate) {
    if (expectedVisitedDate === '') throw new Error(ERROR_MESSAGE.isBlank);

    const date = Number(expectedVisitedDate);
    if (Number.isNaN(date)) throw new Error(ERROR_MESSAGE.isChar);
    if (date < CONSTANTS.eventStartDate || date > CONSTANTS.eventEndDate)
      throw new Error(ERROR_MESSAGE.isNotDateRange);

    this.#expectedVisitDate = date;
  }

  checkMenuAndCountInvalid(menuAndCount) {
    const orderMenus = menuAndCount.split(CONSTANTS.menuSplitChar);
    this.#checkOrderMenuFormatInvalid(orderMenus);
  }

  #checkOrderMenuFormatInvalid(orderMenus) {
    const regex = /.+-[1-9]\d*/;
    orderMenus.forEach((orderMenu) => {
      if (!regex.test(orderMenu)) throw new Error(ERROR_MESSAGE.isNotOrderMenuFormat);
    });
  }

  get expectedVisitDate() {
    return this.#expectedVisitDate;
  }
}

export default UserDTO;
