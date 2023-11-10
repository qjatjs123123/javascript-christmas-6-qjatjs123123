import { ERROR_MESSAGE } from '../../Util/Message.js';
import { CONSTANTS, MENU, MENUFUNC } from '../../Util/Constants.js';

class Validation {
  static checkDateInvalid(expectedVisitedDate) {
    if (expectedVisitedDate === '') throw new Error(ERROR_MESSAGE.isBlank);

    const date = Number(expectedVisitedDate);
    if (Number.isNaN(date)) throw new Error(ERROR_MESSAGE.isChar);
    if (date < CONSTANTS.eventStartDay || date > CONSTANTS.eventEndDay)
      throw new Error(ERROR_MESSAGE.isNotDateRange);
  }

  static checkOrderMenuIsFormat(orderMenu) {
    const regex = /.+-[1-9]\d*/;
    if (!regex.test(orderMenu)) throw new Error(ERROR_MESSAGE.isNotOrderMenuFormat);
  }

  static checkOrderMenuIsExist(orderMenu) {
    const menuName = orderMenu.split(CONSTANTS.countSplitChar)[0];
    const category = MENUFUNC.getCategory(menuName);
    if (category === false) throw new Error(ERROR_MESSAGE.isNotOrderMenuFormat);
  }

  static checkOrderMenuIsDuplicate(orderMenus) {
    const orderMenuNameList = orderMenus.map(
      (orderMenu) => orderMenu.split(CONSTANTS.countSplitChar)[0],
    );
    const orderMenuNameSet = new Set(orderMenuNameList);

    if (orderMenuNameList.length !== orderMenuNameSet.size)
      throw new Error(ERROR_MESSAGE.isDuplicate);
  }

  static checkOrderMenuIsAllBeverage(orderMenus) {
    const orderMenuNameList = orderMenus
      .map((orderMenu) => orderMenu.split(CONSTANTS.countSplitChar)[0])
      .every((menuName) => MENU[CONSTANTS.foodOnlyNotAllow].has(menuName));

    if (orderMenuNameList) throw new Error(ERROR_MESSAGE.isAllBeverage);
  }

  static checkOrderMenuIsLength(orderMenus) {
    const menuCount = orderMenus.reduce((count, orderMenu) => {
      return count + Number(orderMenu.split(CONSTANTS.countSplitChar)[1]);
    }, 0);

    if (menuCount > CONSTANTS.orderLimitCount) throw new Error(ERROR_MESSAGE.isNotLength);
  }
}

export default Validation;
