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
    userDTO.setSpecialDiscount(CONSTANTS.specialAmount);
  }
}

export default SpecialDiscount;
