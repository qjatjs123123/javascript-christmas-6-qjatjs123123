class SpecialDiscount {
  static instance = null;

  constructor() {
    if (!SpecialDiscount.instance) {
      SpecialDiscount.instance = this;
    }
    return SpecialDiscount.instance;
  }

  discount(userDTO) {
    userDTO.setSpecialDiscount();
  }
}

export default SpecialDiscount;
