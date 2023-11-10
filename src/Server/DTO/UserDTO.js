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
    orderMenus.forEach((orderMenu) => {
      this.#checkOrderMenuIsFormat(orderMenu);
      this.#checkOrderMenuIsExist(orderMenu);
    });
    this.#checkOrderMenuIsDuplicate(orderMenus);
  }

  #checkOrderMenuIsFormat(orderMenu) {
    const regex = /.+-[1-9]\d*/;
    if (!regex.test(orderMenu)) throw new Error(ERROR_MESSAGE.isNotOrderMenuFormat);
  }

  #checkOrderMenuIsExist(orderMenu) {
    const menuCategoryList = Object.keys(MENU);
    let isExist = false;
    menuCategoryList.forEach((menuCategory) => {
      const menuName = orderMenu.split(CONSTANTS.countSplitChar)[0];
      const eventMenuList = MENU[menuCategory];
      if (eventMenuList.has(menuName)) isExist = true;
    });
    if (!isExist) throw new Error(ERROR_MESSAGE.isNotOrderMenuFormat);
  }

  #checkOrderMenuIsDuplicate(orderMenus) {
    const orderMenuNameList = orderMenus.map(
      (orderMenu) => orderMenu.split(CONSTANTS.countSplitChar)[0],
    );
    const orderMenuNameSet = new Set(orderMenuNameList);

    return orderMenuNameList.length === orderMenuNameSet.size;
  }

  get expectedVisitDate() {
    return this.#expectedVisitDate;
  }
}

export default UserDTO;
