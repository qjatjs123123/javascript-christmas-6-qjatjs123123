import { ERROR_MESSAGE } from '../../Util/Message.js';
import { CONSTANTS, MENU, MENUFUNC } from '../../Util/Constants.js';

class UserDTO {
  #expectedVisitDate;
  #orderMenu;
  #christmasDiscount;

  constructor() {
    this.#orderMenu = {};
    this.#christmasDiscount = CONSTANTS.noEventWord;
  }
  setChristmasDiscount(discount) {
    this.#christmasDiscount = discount;
  }

  setExpectedVisitDate(expectedVisitedDate) {
    this.#checkDateInvalid(expectedVisitedDate);
    this.#expectedVisitDate = Number(expectedVisitedDate);
  }

  setOrderMenu(menuAndCount) {
    const orderMenus = menuAndCount.split(CONSTANTS.menuSplitChar);
    this.#checkOrderMenuInvalid(orderMenus);

    orderMenus.forEach((orderMenu) => {
      const [menuName, menuCount] = orderMenu.split(CONSTANTS.countSplitChar);
      const category = MENUFUNC.getCategory(menuName);
      const menuObject = { menuName, menuCount: Number(menuCount) };

      this.#orderMenu[category] = this.#orderMenu[category] ?? [];
      this.#orderMenu[category].push(menuObject);
    });
  }

  #checkDateInvalid(expectedVisitedDate) {
    if (expectedVisitedDate === '') throw new Error(ERROR_MESSAGE.isBlank);

    const date = Number(expectedVisitedDate);
    if (Number.isNaN(date)) throw new Error(ERROR_MESSAGE.isChar);
    if (date < CONSTANTS.eventStartDate || date > CONSTANTS.eventEndDate)
      throw new Error(ERROR_MESSAGE.isNotDateRange);
  }

  #checkOrderMenuInvalid(orderMenus) {
    orderMenus.forEach((orderMenu) => {
      this.#checkOrderMenuIsFormat(orderMenu);
      this.#checkOrderMenuIsExist(orderMenu);
    });
    this.#checkOrderMenuIsDuplicate(orderMenus);
    this.#checkOrderMenuIsAllBeverage(orderMenus);
  }

  #checkOrderMenuIsFormat(orderMenu) {
    const regex = /.+-[1-9]\d*/;
    if (!regex.test(orderMenu)) throw new Error(ERROR_MESSAGE.isNotOrderMenuFormat);
  }

  #checkOrderMenuIsExist(orderMenu) {
    const menuName = orderMenu.split(CONSTANTS.countSplitChar)[0];
    const category = MENUFUNC.getCategory(menuName);
    if (category === false) throw new Error(ERROR_MESSAGE.isNotOrderMenuFormat);
  }

  #checkOrderMenuIsDuplicate(orderMenus) {
    const orderMenuNameList = orderMenus.map(
      (orderMenu) => orderMenu.split(CONSTANTS.countSplitChar)[0],
    );
    const orderMenuNameSet = new Set(orderMenuNameList);

    if (orderMenuNameList.length !== orderMenuNameSet.size)
      throw new Error(ERROR_MESSAGE.isDuplicate);
  }

  #checkOrderMenuIsAllBeverage(orderMenus) {
    const orderMenuNameList = orderMenus
      .map((orderMenu) => orderMenu.split(CONSTANTS.countSplitChar)[0])
      .every((menuName) => MENU[CONSTANTS.foodOnlyNotAllow].has(menuName));

    if (orderMenuNameList) throw new Error(ERROR_MESSAGE.isAllBeverage);
  }

  get expectedVisitDate() {
    return this.#expectedVisitDate;
  }

  getUserMenu() {
    let userMenu = [];
    const categorys = Object.keys(this.#orderMenu);

    categorys.forEach((category) => {
      userMenu = [...userMenu, ...this.#orderMenu[category]];
    });

    return userMenu;
  }

  getOriginalOrderAmount() {
    const userMenu = this.getUserMenu();

    return userMenu.reduce((total, { menuName, menuCount }) => {
      const category = MENUFUNC.getCategory(menuName);

      return total + MENU[category].get(menuName) * menuCount;
    }, 0);
  }

  getchristmasDiscount() {
    return this.#christmasDiscount;
  }
}

export default UserDTO;
