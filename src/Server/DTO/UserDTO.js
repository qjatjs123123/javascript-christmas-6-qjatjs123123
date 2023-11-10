import { CONSTANTS, MENU, MENUFUNC } from '../../Util/Constants.js';
import Validation from './Validation.js';

class UserDTO {
  #expectedVisitDate;
  #orderMenu;
  #christmasDiscount;
  #weekdayDiscount;
  #weekendDiscount;
  #specialDiscount;
  #freeGift;

  constructor() {
    this.#orderMenu = {};
    this.#christmasDiscount = CONSTANTS.noEventWord;
    this.#weekdayDiscount = CONSTANTS.noEventWord;
    this.#weekendDiscount = CONSTANTS.noEventWord;
    this.#specialDiscount = CONSTANTS.noEventWord;
    this.#freeGift = CONSTANTS.noEventWord;
  }

  setFreeGift() {
    this.#freeGift = CONSTANTS.freeGift;
  }

  setSpecialDiscount() {
    this.#specialDiscount = -1000;
  }

  setWeekDayDiscount(discountTotal) {
    this.#weekdayDiscount = discountTotal;
  }

  setWeekEndDiscount(discountTotal) {
    this.#weekendDiscount = discountTotal;
  }

  setChristmasDiscount(discount) {
    this.#christmasDiscount = discount;
  }

  setExpectedVisitDate(expectedVisitedDate) {
    Validation.checkDateInvalid(expectedVisitedDate);
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

  #checkOrderMenuInvalid(orderMenus) {
    orderMenus.forEach((orderMenu) => {
      Validation.checkOrderMenuIsFormat(orderMenu);
      Validation.checkOrderMenuIsExist(orderMenu);
    });
    Validation.checkOrderMenuIsDuplicate(orderMenus);
    Validation.checkOrderMenuIsAllBeverage(orderMenus);
    Validation.checkOrderMenuIsLength(orderMenus);
  }

  get orderMenu() {
    return this.#orderMenu;
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
