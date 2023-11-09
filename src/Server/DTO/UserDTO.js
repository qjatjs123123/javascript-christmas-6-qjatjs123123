class UserDTO {
  #expectedVisitDate;

  constructor(expectedVisitedDate) {
    this.#expectedVisitDate = expectedVisitedDate;
  }

  get expectedVisitDate() {
    return this.#expectedVisitDate;
  }
}

export default UserDTO;
