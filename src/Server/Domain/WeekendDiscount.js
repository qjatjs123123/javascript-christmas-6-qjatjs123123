import { CONSTANTS } from '../../Util/Constants.js';

class WeekendDiscount {
  static instance = null;

  constructor() {
    if (!WeekendDiscount.instance) {
      WeekendDiscount.instance = this;
    }
    return WeekendDiscount.instance;
  }

  discount(userDTO) {
    userDTO.setWeekEndDiscount(CONSTANTS.weekendDiscountCategory);
  }
}

export default WeekendDiscount;
