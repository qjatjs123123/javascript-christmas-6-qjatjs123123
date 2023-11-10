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
    const userMenu = userDTO.orderMenu;
    const category = CONSTANTS.weekendDiscountCategory;

    if (category in userMenu) {
      let discountTotal = 0;
      userMenu[category].forEach((ordermenu) => {
        discountTotal += -CONSTANTS.discountAmount * ordermenu.menuCount;
      });
      userDTO.setWeekEndDiscount(discountTotal);
    }
  }
}

export default WeekendDiscount;
