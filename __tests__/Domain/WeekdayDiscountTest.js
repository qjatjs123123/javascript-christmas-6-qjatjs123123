/* eslint-disable prettier/prettier */
import WeekdayDiscount from '../../src/Server/Domain/WeekdayDiscount';
import UserDTO from '../../src/Server/DTO/UserDTO.js';
import EventController from '../../src/Server/Controller/EventController.js';
import { CONSTANTS } from '../../src/Util/Constants.js';

describe('평일 할인 도메인 테스트', () => {
  let weekday;
  let userDTO;
  let eventController;

  beforeEach(() => {
    userDTO = new UserDTO();
    weekday = new WeekdayDiscount();
    eventController = new EventController();
  });

  describe(`평일 할인에는 디저트 메뉴를 메뉴 1개당 ${CONSTANTS.discountAmount}원 할인한다.`, () => {
    const testCases = [
      { day: 3 ,input: '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1', expected: -2023 * 2 },
      { day: 4, input: '아이스크림-5,바비큐립-1,초코케이크-2,제로콜라-1', expected: -2023 * 7 },
      { day: 5, input: '아이스크림-8,바비큐립-1,초코케이크-2,제로콜라-1', expected: -2023 * 10 },
      { day: 6, input: '아이스크림-1,바비큐립-1,초코케이크-2,제로콜라-1', expected: -2023 * 3 },
      { day: 7, input: '바비큐립-1,초코케이크-2,제로콜라-1', expected: -2023 * 2 },
    ];

    test.each(testCases)('getDisCountHistory메서드는 할인된 금액 $expected을 반환한다.', ({ day, input, expected }) => {
      // when
      userDTO.setExpectedVisitDate(day);
      userDTO.setOrderMenu(input);
      weekday.discount(userDTO);

      // then
      expect(expected).toEqual(userDTO.getDisCountHistory()[0].discount);
    });
  });

  describe(`평일 날 구입 메뉴에 디저트 항목이 없으면 할인 내역에 디저트 항목이 없어야 한다.`, () => {
    const testCases = [
      { day: 3 ,input: '티본스테이크-1,바비큐립-1,제로콜라-1', expected: false },
      { day: 4, input: '타파스-1,제로콜라-3', expected: false },
      { day: 5, input: '시저샐러드-1,해산물파스타-1', expected: false },
      { day: 6, input: '바비큐립-1,레드와인-1', expected: false },
      { day: 7, input: '크리스마스파스타-1,샴페인-1', expected: false },
    ];

    test.each(testCases)('getDisCountHistory메서드는 할인된 금액 $expected을 반환한다.', ({ day, input, expected }) => {
      // when
      userDTO = new UserDTO();
      userDTO.setExpectedVisitDate(day);
      userDTO.setOrderMenu(input);
      eventController.handleDiscountEvent(userDTO);
      const discountHistory = userDTO.getDisCountHistory();
      const result = discountHistory.some(({ eventName }) => eventName === CONSTANTS.weekdayEventName);

      // then
      expect(expected).toEqual(result);
    });
  });
});
