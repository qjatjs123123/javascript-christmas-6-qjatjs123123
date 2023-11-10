const CONSTANTS = Object.freeze({
  error: '[ERROR]',
  success: '[SUCCESS]',
  noEventWord: '없음',
  eventYear: 2023,
  eventMonth: 12,
  eventStartDay: 1,
  eventEndDay: 31,
  christMasEventStartDay: 1,
  christMasEventEndDay: 25,
  menuSplitChar: ',',
  countSplitChar: '-',
  orderLimitCount: 20,
  foodOnlyNotAllow: 'beverage',
  weekdayDiscount: [0, 1, 2, 3, 4], // 일, 월, 화, 수, 목
  weekendDiscount: [5, 6], // 금, 토
  specialDiscount: [3, 10, 17, 24, 25, 31],
});

const MENU = Object.freeze({
  appetizer: Object.freeze(
    new Map([
      ['양송이수프', 6000],
      ['타파스', 5000],
      ['시저샐러드', 8000],
    ]),
  ),
  main: Object.freeze(
    new Map([
      ['티본스테이크', 55000],
      ['바비큐립', 54000],
      ['해산물파스타', 35000],
      ['크리스마스파스타', 25000],
    ]),
  ),
  dessert: Object.freeze(
    new Map([
      ['초코케이크', 15000],
      ['아이스크림', 5000],
    ]),
  ),
  beverage: Object.freeze(
    new Map([
      ['제로콜라', 3000],
      ['레드와인', 60000],
      ['샴페인', 25000],
    ]),
  ),
});

const MENUFUNC = {
  getCategory(menuName) {
    const menuCategoryList = Object.keys(MENU);
    const category = menuCategoryList.filter((menuCategory) => MENU[menuCategory].has(menuName));
    if (category.length !== 0) return category[0];
    return false;
  },
};

export { CONSTANTS, MENU, MENUFUNC };
