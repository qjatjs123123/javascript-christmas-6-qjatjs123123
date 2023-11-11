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
  #discountEvents;
  #freeGift;
  #eventBadge;

  constructor() {
    this.#calendar = new Calendar();
    this.#freeGift = new FreeGiftEvent();
    this.#eventBadge = new EventBadge();

    this.#discountEvents = [
      { event: new ChristmasDdayDiscount(), canApplyEvent: this.#calendar.isChristmasDdayEvent },
      { event: new WeekdayDiscount(), canApplyEvent: this.#calendar.isWeekDayEvent },
      { event: new WeekendDiscount(), canApplyEvent: this.#calendar.isWeekEndEvent },
      { event: new SpecialDiscount(), canApplyEvent: this.#calendar.isSpecialEvent },
    ];
  }

  handlerVisitDate(expectedVisitDate) {
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
    if (!this.#canApplyAllEvents(userDTO)) return userDTO;

    return this.#applyAllEvent(visitDay, userDTO);
  }

  #applyAllEvent(visitDay, userDTO) {
    this.#discountEvents.forEach(({ event, canApplyEvent }) => {
      if (canApplyEvent.call(this.#calendar, visitDay)) event.discount(userDTO);
    });

    this.#freeGift.isFreeGift(userDTO);
    this.#eventBadge.getEventBadge(userDTO);
    return userDTO;
  }

  #canApplyAllEvents(userDTO) {
    if (userDTO.getOriginalOrderAmount() >= CONSTANTS.eventLimitAmount) return true;
    return false;
  }
}

export default EventController;
