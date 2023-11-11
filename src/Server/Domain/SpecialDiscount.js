import { CONSTANTS } from '../../Util/Constants.js';

class SpecialDiscount {
  static instance = null;

  constructor() {
    if (!SpecialDiscount.instance) {
      SpecialDiscount.instance = this;
    }
    return SpecialDiscount.instance;
  }

  discount(userDTO) {
    if (CONSTANTS.specialDiscount.includes(userDTO.getExpectedVisitDate())) {
      userDTO.setSpecialDiscount();
    }
  }
}

export default SpecialDiscount;
