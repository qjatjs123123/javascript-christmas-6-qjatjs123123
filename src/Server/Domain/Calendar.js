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

  #getDate(day) {
    return new Date(`${CONSTANTS.eventYear}-${CONSTANTS.eventMonth}-${day}`);
  }
}

const c = new Calendar();
console.log(c.isChristmasDdayEvent(0));
