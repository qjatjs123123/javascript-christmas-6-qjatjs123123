import UserDTO from '../DTO/UserDTO.js';
import Calendar from '../Domain/Calendar.js';
import ChristmasDdayDiscount from '../Domain/ChristmasDdayDiscount.js';
import WeekdayDiscount from '../Domain/WeekdayDiscount.js';
import WeekendDiscount from '../Domain/WeekendDiscount.js';
import SpecialDiscount from '../Domain/SpecialDiscount.js';
import FreeGiftEvent from '../Domain/FreeGiftEvent.js';
import EventBadge from '../Domain/EventBadge.js';
import { CONSTANTS } from '../../Util/Constants.js';

class EventController {
  #calendar;
  #christmasDday;
  #weekday;
  #weekend;
  #special;
  #freeGift;
  #eventBadge;

  constructor() {
    this.#calendar = new Calendar();
    this.#christmasDday = new ChristmasDdayDiscount();
    this.#weekday = new WeekdayDiscount();
    this.#weekend = new WeekendDiscount();
    this.#special = new SpecialDiscount();
    this.#freeGift = new FreeGiftEvent();
    this.#eventBadge = new EventBadge();

    this.discountEvents = [
      { event: this.#christmasDday, checker: this.#calendar.isChristmasDdayEvent },
      { event: this.#weekday, checker: this.#calendar.isWeekDayEvent },
      { event: this.#weekend, checker: this.#calendar.isWeekEndEvent },
      { event: this.#special, checker: this.#calendar.isSpecialEvent },
    ];
  }

  checkDateInvalid(expectedVisitDate) {
    const userDTO = new UserDTO(expectedVisitDate);
    userDTO.setExpectedVisitDate(expectedVisitDate);
    return userDTO;
  }

  handlerOrderMenuAndCount({ userDTO, menuAndCount }) {
    userDTO.setOrderMenu(menuAndCount);
    return userDTO;
  }

  handlerDiscountEvent(userDTO) {
    const visitDay = userDTO.getExpectedVisitDate();
    if (!this.#canApplyEvent(userDTO)) return userDTO;

    return this.#applyEvent(visitDay, userDTO);
  }

  #applyEvent(visitDay, userDTO) {
    this.discountEvents.forEach(({ event, checker }) => {
      if (checker.call(this.#calendar, visitDay)) event.discount(userDTO);
    });

    this.#freeGift.isFreeGift(userDTO);
    this.#eventBadge.getEventBadge(userDTO);
    return userDTO;
  }

  #canApplyEvent(userDTO) {
    if (userDTO.getOriginalOrderAmount() >= CONSTANTS.eventLimitAmount) return true;
    return false;
  }
}

export default EventController;
