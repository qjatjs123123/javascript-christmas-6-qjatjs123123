import UserDTO from '../DTO/UserDTO.js';

class EventController {
  checkDateInvalid(expectedVisitDate) {
    const userDTO = new UserDTO(expectedVisitDate);
    userDTO.checkDateInvalid(expectedVisitDate);
    return userDTO;
  }

  handlerOrderMenuAndCount({ userDTO, menuAndCount }) {
    console.log(userDTO, menuAndCount);
  }
}

export default EventController;
