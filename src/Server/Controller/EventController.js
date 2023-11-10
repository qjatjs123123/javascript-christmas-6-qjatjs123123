import UserDTO from '../DTO/UserDTO.js';
import Calendar from '../Domain/Calendar.js';
import ChristmasDdayDiscount from '../Domain/ChristmasDdayDiscount.js';
import WeekdayDiscount from '../Domain/WeekdayDiscount.js';

class EventController {
  #calendar;
  #christmasDday;
  #weekday;

  constructor() {
    this.#calendar = new Calendar();
    this.#christmasDday = new ChristmasDdayDiscount();
    this.#weekday = new WeekdayDiscount();
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
  }
}

export default EventController;
