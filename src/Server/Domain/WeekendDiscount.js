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
    const userMenuWithCategory = userDTO.getUserMenuWithCategory();
    const category = CONSTANTS.weekendDiscountCategory;

    if (category in userMenuWithCategory) {
      let discountTotal = 0;
      userMenuWithCategory[category].forEach((userMenu) => {
        discountTotal += -CONSTANTS.discountAmount * userMenu.menuCount;
      });
      userDTO.setWeekEndDiscount(discountTotal);
    }
  }
}

export default WeekendDiscount;
