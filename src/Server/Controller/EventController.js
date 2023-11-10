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
    const visitDay = userDTO.expectedVisitDate;
    if (this.#isUnderEventLimitAmount(userDTO)) return userDTO;

    if (this.#calendar.isChristmasDdayEvent(visitDay)) this.#christmasDday.discount(userDTO);
    if (this.#calendar.isWeekDayEvent(visitDay)) this.#weekday.discount(userDTO);
    if (this.#calendar.isWeekEndEvent(visitDay)) this.#weekend.discount(userDTO);
    if (this.#calendar.isSpecialEvent(visitDay)) this.#special.discount(userDTO);

    this.#freeGift.isFreeGift(userDTO);
    this.#eventBadge.getEventBadge(userDTO);
    return userDTO;
  }

  #isUnderEventLimitAmount(userDTO) {
    if (userDTO.getOriginalOrderAmount() < CONSTANTS.eventLimitAmount) return true;
    return false;
  }
}

export default EventController;
