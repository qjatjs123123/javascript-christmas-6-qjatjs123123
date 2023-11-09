class Menu {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  displayMenu() {
    console.log(`${this.name}: $${this.price}`);
  }
}

class Appetizer extends Menu {
  constructor(name, price) {
    super(name, price);
    this.category = '애피타이저';
  }
}

class MainCourse extends Menu {
  constructor(name, price) {
    super(name, price);
    this.category = '메인';
  }
}

class Dessert extends Menu {
  constructor(name, price) {
    super(name, price);
    this.category = '디저트';
  }
}

class Beverage extends Menu {
  constructor(name, price) {
    super(name, price);
    this.category = '음료';
  }
}

// 예시: 애피타이저 메뉴 생성
const appetizerMenu = new Appetizer('샐러드', 8.99);
appetizerMenu.displayMenu();

// 예시: 메인 메뉴 생성
const mainCourseMenu = new MainCourse();
mainCourseMenu.displayMenu();

// 예시: 디저트 메뉴 생성
const dessertMenu = new Dessert('초콜릿 케이크', 6.99);
dessertMenu.displayMenu();

// 예시: 음료 메뉴 생성
const beverageMenu = new Beverage('콜라', 2.99);
beverageMenu.displayMenu();