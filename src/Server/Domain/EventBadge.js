import { CONSTANTS } from '../../Util/Constants.js';

class EventBadge {
  static instance = null;

  constructor() {
    if (!EventBadge.instance) {
      EventBadge.instance = this;
    }
    return EventBadge.instance;
  }

  #decideBadge(benefit) {
    switch (true) {
      case benefit >= CONSTANTS.santaBadge.limitAmount:
        return CONSTANTS.santaBadge.badgeName;

      case benefit >= CONSTANTS.treeBadge.limitAmount:
        return CONSTANTS.treeBadge.badgeName;

      case benefit >= CONSTANTS.starBadge.limitAmount:
        return CONSTANTS.starBadge.badgeName;

      default:
        return null;
    }
  }

  getEventBadge(userDTO) {
    const benefit = -userDTO.getAllDiscountAmount();
    const badgeName = this.#decideBadge(benefit);
    userDTO.setEventBadge(badgeName);
  }
}

export default EventBadge;
