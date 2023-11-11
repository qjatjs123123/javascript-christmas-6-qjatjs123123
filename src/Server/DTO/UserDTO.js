/* eslint-disable prettier/prettier */
import { CONSTANTS, MENU, MENUFUNC } from '../../Util/Constants.js';
import Validation from './Validation.js';

class UserDTO {
  #expectedVisitDate;
  #discountHistory;
  #eventBadge;
  #inputOrderMenu;

  constructor() {
    this.#discountHistory = [];
    this.#eventBadge = CONSTANTS.noEventWord;
  }

  #addDiscountHistory(eventName, discount) {
    this.#discountHistory.push({ eventName, discount });
  }

  setEventBadge(badge) {
    this.#eventBadge = badge;
  }

  setFreeGift() {
    this.#addDiscountHistory(CONSTANTS.freeGiftEventName, -CONSTANTS.freeGift.menuPrice);
  }

  setSpecialDiscount() {
    this.#addDiscountHistory(CONSTANTS.specialEventName, -1000);
  }

  setWeekDayDiscount(discountTotal) {
    this.#addDiscountHistory(CONSTANTS.weekdayEventName, discountTotal);
  }

  setWeekEndDiscount(discountTotal) {
    this.#addDiscountHistory(CONSTANTS.weekendEventName, discountTotal);
  }

  setChristmasDiscount(discount) {
    this.#addDiscountHistory(CONSTANTS.christmasDdayEventName, discount);
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
    return this.#discountHistory.reduce((benefit, { discount }) => benefit + discount, 0);
  }

  getFreeGift() {
    return this.#discountHistory.some((userEvent) => userEvent.eventName === CONSTANTS.freeGiftEventName)
      ? CONSTANTS.freeGift
      : CONSTANTS.noEventWord;
  }

  getDisCountHistory() {
    return this.#discountHistory.length === 0 ? CONSTANTS.noEventWord : this.#discountHistory;
  }

  getPaymentTotal() {
    let allDiscountAmount = this.getAllDiscountAmount();

    if (this.getFreeGift() !== CONSTANTS.noEventWord)
      allDiscountAmount += CONSTANTS.freeGift.menuPrice;

    return this.getOriginalOrderAmount() + allDiscountAmount;
  }
}

export default UserDTO;
