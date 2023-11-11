import { CONSTANTS } from '../../Util/Constants.js';

class FreeGiftEvent {
  static instance = null;

  constructor() {
    if (!FreeGiftEvent.instance) {
      FreeGiftEvent.instance = this;
    }
    return FreeGiftEvent.instance;
  }

  #canGetFreeGift(userDTO) {
    return userDTO.getOriginalOrderAmount() >= CONSTANTS.freeGiftLimitAmount;
  }

  getFreeGift(userDTO) {
    if (this.#canGetFreeGift(userDTO)) userDTO.setFreeGift();
  }
}

export default FreeGiftEvent;
