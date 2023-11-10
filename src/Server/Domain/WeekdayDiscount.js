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
    const userMenu = userDTO.orderMenu;
    const category = CONSTANTS.weekdayDiscountCategory;

    if (category in userMenu) {
      let discountTotal = 0;
      userMenu[category].forEach((ordermenu) => {
        discountTotal += -CONSTANTS.discountAmount * ordermenu.menuCount;
      });
      userDTO.setWeekDayDiscount(discountTotal);
    }
  }
}

export default WeekdayDiscount;
