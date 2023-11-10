import { CONSTANTS } from '../../Util/Constants.js';

class FreeGiftEvent {
  static instance = null;

  constructor() {
    if (!FreeGiftEvent.instance) {
      FreeGiftEvent.instance = this;
    }
    return FreeGiftEvent.instance;
  }

  isFreeGift(userDTO) {
    if (userDTO.getOriginalOrderAmount() >= CONSTANTS.freeGiftLimitAmount) {
      userDTO.setFreeGift();
    }
  }
}

export default FreeGiftEvent;
