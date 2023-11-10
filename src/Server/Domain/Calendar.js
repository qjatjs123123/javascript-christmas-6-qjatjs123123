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
    const visitDate = this.#getDate(visitDay);
    const christMasEventStartDay = this.#getDate(CONSTANTS.christMasEventStartDay);
    const christMasEventEndDay = this.#getDate(CONSTANTS.christMasEventEndDay);

    if (christMasEventStartDay <= visitDate && christMasEventEndDay >= visitDate) return true;
    return false;
  }

  isWeekDayEvent(visitDay) {
    const visitDate = this.#getDate(visitDay);
    const eventStartDay = this.#getDate(CONSTANTS.eventStartDay);
    const eventEndDay = this.#getDate(CONSTANTS.eventEndDay);

    if (eventStartDay > visitDate && eventEndDay < visitDate) return false;
    if (!CONSTANTS.weekdayDiscount.includes(visitDate.getDay())) return false;
    return true;
  }

  #getDate(day) {
    return new Date(`${CONSTANTS.eventYear}-${CONSTANTS.eventMonth}-${day}`);
  }
}

const c = new Calendar();
console.log(c.isWeekDayEvent(29));