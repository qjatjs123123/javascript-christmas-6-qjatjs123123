import UserDTO from '../DTO/UserDTO.js';

class EventController {
  checkDateInvalid(expectedVisitDate) {
    const userDTO = new UserDTO(expectedVisitDate);
    userDTO.checkDateInvalid(expectedVisitDate);
    return userDTO;
  }

  handlerOrderMenuAndCount({ userDTO, menuAndCount }) {
    userDTO.checkMenuAndCountInvalid(menuAndCount);
  }
}

export default EventController;
