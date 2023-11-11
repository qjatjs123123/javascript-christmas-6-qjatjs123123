import { CONSTANTS } from '../../Util/Constants.js';

class ChristmasDdayDiscount {
  static instance = null;

  constructor() {
    if (!ChristmasDdayDiscount.instance) {
      ChristmasDdayDiscount.instance = this;
    }
    return ChristmasDdayDiscount.instance;
  }

  discount(userDTO) {
    const visitDay = userDTO.getExpectedVisitDate();
    const dayGap = visitDay - CONSTANTS.christMasEventStartDay;

    userDTO.setChristmasDiscount(-1000 - dayGap * 100);
  }
}

export default ChristmasDdayDiscount;
