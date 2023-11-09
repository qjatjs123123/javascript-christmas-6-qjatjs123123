import UserDTO from '../DTO/UserDTO.js';

class EventController {
  checkDateInvalid(expectedVisitDate) {
    const userDTO = new UserDTO(expectedVisitDate);
    console.log('userDTO', userDTO.expectedVisitDate, expectedVisitDate);
  }
}

export default EventController;
