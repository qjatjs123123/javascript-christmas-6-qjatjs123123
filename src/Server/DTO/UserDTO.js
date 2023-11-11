import { CONSTANTS, MENU, MENUFUNC } from '../../Util/Constants.js';
import Validation from './Validation.js';

class UserDTO {
  #expectedVisitDate;
  #disCountHistory;
  #eventBadge;
  #inputOrderMenu;

  constructor() {
    this.#disCountHistory = [];
    this.#eventBadge = CONSTANTS.noEventWord;
  }

  setEventBadge(badge) {
    this.#eventBadge = badge;
  }

  setFreeGift() {
    const eventObject = {
      eventName: CONSTANTS.freeGiftEventName,
      discount: -CONSTANTS.freeGift.menuPrice,
    };
    this.#disCountHistory.push(eventObject);
  }

  setSpecialDiscount() {
    const eventObject = { eventName: CONSTANTS.specialEventName, discount: -1000 };
    this.#disCountHistory.push(eventObject);
  }

  setWeekDayDiscount(discountTotal) {
    const eventObject = { eventName: CONSTANTS.weekdayEventName, discount: discountTotal };
    this.#disCountHistory.push(eventObject);
  }

  setWeekEndDiscount(discountTotal) {
    const eventObject = { eventName: CONSTANTS.weekendEventName, discount: discountTotal };
    this.#disCountHistory.push(eventObject);
  }

  setChristmasDiscount(discount) {
    const eventObject = { eventName: CONSTANTS.christmasDdayEventName, discount };
    this.#disCountHistory.push(eventObject);
  }

  setExpectedVisitDate(expectedVisitedDate) {
    Validation.checkDateInvalid(expectedVisitedDate);
    this.#expectedVisitDate = Number(expectedVisitedDate);
  }

  setOrderMenu(menuAndCount) {
    const orderMenus = menuAndCount.split(CONSTANTS.menuSplitChar);
    this.#checkOrderMenuInvalid(orderMenus);
    this.#inputOrderMenu = menuAndCount;
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

  getExpectedVisitDate() {
    return this.#expectedVisitDate;
  }

  getEventBadge() {
    return this.#eventBadge;
  }

  getUserMenuWithCategory() {
    const orderMenus = this.#inputOrderMenu.split(CONSTANTS.menuSplitChar);
    const userMenuWithCategory = {};

    orderMenus.forEach((orderMenu) => {
      const [menuName, menuCount] = orderMenu.split(CONSTANTS.countSplitChar);
      const category = MENUFUNC.getCategory(menuName);
      const menuObject = { menuName, menuCount: Number(menuCount) };

      userMenuWithCategory[category] = userMenuWithCategory[category] ?? [];
      userMenuWithCategory[category].push(menuObject);
    });

    return userMenuWithCategory;
  }

  getUserMenu() {
    let userMenu = [];
    const userMenuWithCategory = this.getUserMenuWithCategory();
    const categorys = Object.keys(userMenuWithCategory);

    categorys.forEach((category) => {
      userMenu = [...userMenu, ...userMenuWithCategory[category]];
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

  getAllDiscountAmount() {
    return this.#disCountHistory.reduce((benefit, { discount }) => {
      return benefit + discount;
    }, 0);
  }

  getFreeGift() {
    const isFreeGift = this.#disCountHistory.some(
      (userEvent) => userEvent.eventName === CONSTANTS.freeGiftEventName,
    );
    if (isFreeGift) return CONSTANTS.freeGift;
    return CONSTANTS.noEventWord;
  }

  getDisCountHistory() {
    if (this.#disCountHistory.length === 0) return CONSTANTS.noEventWord;
    return this.#disCountHistory;
  }

  getPaymentTotal() {
    let allDiscountAmount = this.getAllDiscountAmount();

    if (this.getFreeGift() !== CONSTANTS.noEventWord)
      allDiscountAmount += CONSTANTS.freeGift.menuPrice;

    return this.getOriginalOrderAmount() + allDiscountAmount;
  }
}

export default UserDTO;
