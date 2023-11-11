/* eslint-disable prettier/prettier */
import { CONSTANTS } from '../../Util/Constants.js';

class Calendar {
  static instance = null;

  constructor() {
    if (!Calendar.instance) {
      Calendar.instance = this;
    }
    return Calendar.instance;
  }

  isChristmasDdayEvent(visitDay) {
    return this.#checkChristmasDdayEvent(visitDay);
  }

  isWeekDayEvent(visitDay) {
    const visitDate = this.#getDate(visitDay);
    return this.#checkEventPeriod(visitDay) && CONSTANTS.weekdayDiscount.includes(visitDate.getDay());
  }

  isWeekEndEvent(visitDay) {
    const visitDate = this.#getDate(visitDay);
    return this.#checkEventPeriod(visitDay) && CONSTANTS.weekendDiscount.includes(visitDate.getDay());
  }

  isSpecialEvent(visitDay) {
    return this.#checkEventPeriod(visitDay) && CONSTANTS.specialDiscount.includes(visitDay);
  }

  #checkChristmasDdayEvent(visitDay) {
    const visitDate = this.#getDate(visitDay);
    const christMasEventStartDay = this.#getDate(CONSTANTS.christMasEventStartDay);
    const christMasEventEndDay = this.#getDate(CONSTANTS.christMasEventEndDay);

    return christMasEventStartDay <= visitDate && christMasEventEndDay >= visitDate;
  }

  #checkEventPeriod(visitDay) {
    const visitDate = this.#getDate(visitDay);
    const eventStartDay = this.#getDate(CONSTANTS.eventStartDay);
    const eventEndDay = this.#getDate(CONSTANTS.eventEndDay);

    return eventStartDay <= visitDate && eventEndDay >= visitDate;
  }

  #getDate(day) {
    return new Date(`${CONSTANTS.eventYear}-${CONSTANTS.eventMonth}-${day}`);
  }
}

export default Calendar;
