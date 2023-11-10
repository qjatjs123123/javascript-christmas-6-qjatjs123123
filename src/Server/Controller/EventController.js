import UserDTO from '../DTO/UserDTO.js';
import Calendar from '../Domain/Calendar.js';
import ChristmasDdayDiscount from '../Domain/ChristmasDdayDiscount.js';
import WeekdayDiscount from '../Domain/WeekdayDiscount.js';
import WeekendDiscount from '../Domain/WeekendDiscount.js';
import SpecialDiscount from '../Domain/SpecialDiscount.js';

class EventController {
  #calendar;
  #christmasDday;
  #weekday;
  #weekend;
  #special;

  constructor() {
    this.#calendar = new Calendar();
    this.#christmasDday = new ChristmasDdayDiscount();
    this.#weekday = new WeekdayDiscount();
    this.#weekend = new WeekendDiscount();
    this.#special = new SpecialDiscount();
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

    if (this.#calendar.isChristmasDdayEvent(visitDay)) this.#christmasDday.discount(userDTO);
    if (this.#calendar.isWeekDayEvent(visitDay)) this.#weekday.discount(userDTO);
    if (this.#calendar.isWeekEndEvent(visitDay)) this.#weekend.discount(userDTO);
    if (this.#calendar.isSpecialEvent(visitDay)) this.#special.discount(userDTO);
  }
}

export default EventController;
