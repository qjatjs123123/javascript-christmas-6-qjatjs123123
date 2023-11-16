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
    const userMenuWithCategory = userDTO.getUserMenuWithCategory();
    const category = CONSTANTS.weekdayDiscountCategory;

    if (category in userMenuWithCategory) {
      let discountTotal = 0;
      userMenuWithCategory[category].forEach((userMenu) => {
        discountTotal += -CONSTANTS.discountAmount * userMenu.menuCount;
      });
      userDTO.setWeekDayDiscount(discountTotal);
    }
  }
}

export default WeekdayDiscount;
