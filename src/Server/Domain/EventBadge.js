import { CONSTANTS } from '../../Util/Constants.js';

class EventBadge {
  static instance = null;

  constructor() {
    if (!EventBadge.instance) {
      EventBadge.instance = this;
    }
    return EventBadge.instance;
  }

  getEventBadge(userDTO) {
    const benefit = -userDTO.getAllDiscountAmount();

    switch (true) {
      case benefit >= CONSTANTS.santaBadge.limitAmount:
        return userDTO.setEventBadge(CONSTANTS.santaBadge.badgeName);

      case benefit >= CONSTANTS.treeBadge.limitAmount:
        return userDTO.setEventBadge(CONSTANTS.treeBadge.badgeName);

      case benefit >= CONSTANTS.starBadge.limitAmount:
        return userDTO.setEventBadge(CONSTANTS.starBadge.badgeName);

      default:
        return 0;
    }
  }
}

export default EventBadge;
