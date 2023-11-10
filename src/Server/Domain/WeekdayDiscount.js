import { CONSTANTS } from '../../Util/Constants.js';

class WeekdayDiscount {
  static instance = null;

  constructor() {
    if (!WeekdayDiscount.instance) {
      WeekdayDiscount.instance = this;
    }
    return WeekdayDiscount.instance;
  }

  discount(userDTO) {
    userDTO.setWeekDayDiscount(CONSTANTS.weekdayDiscountCategory);
  }
}

export default WeekdayDiscount;
