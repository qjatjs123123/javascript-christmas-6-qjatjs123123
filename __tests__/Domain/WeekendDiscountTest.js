/* eslint-disable prettier/prettier */
import WeekendDiscount from '../../src/Server/Domain/WeekendDiscount.js';
import UserDTO from '../../src/Server/DTO/UserDTO.js';
import EventController from '../../src/Server/Controller/EventController.js';
import { CONSTANTS } from '../../src/Util/Constants.js';

describe('주말 할인 도메인 테스트', () => {
  let weekend;
  let userDTO;
  let eventController;

  beforeEach(() => {
    userDTO = new UserDTO();
    weekend = new WeekendDiscount();
    eventController = new EventController();
  });

  describe(`주말에는 메인 메뉴를 메뉴 1개당 ${CONSTANTS.discountAmount}원 할인한다.`, () => {
    const testCases = [
      { day:1, input: '티본스테이크-5,바비큐립-2,초코케이크-2,제로콜라-1', expected: -2023 * 7 },
      { day:2, input: '해산물파스타-7,크리스마스파스타-1,초코케이크-2,제로콜라-1', expected: -2023 * 8 },
      { day:9, input: '티본스테이크-5,바비큐립-2,해산물파스타-7,크리스마스파스타-1', expected: -2023 * 15 },
    ];

    test.each(testCases)('getDisCountHistory메서드는 할인된 금액 $expected을 반환한다.', ({ day, input, expected }) => {
      // when
      userDTO.setExpectedVisitDate(day);
      userDTO.setOrderMenu(input);
      weekend.discount(userDTO);

      // then
      expect(expected).toEqual(userDTO.getDisCountHistory()[0].discount);
    });
  });

  describe(`주말에 메인메뉴를 주문하지 않으면 주말 이벤트가 적용되지 않아야 한다.`, () => {
    const testCases = [
      { day:1, input: '초코케이크-2,제로콜라-1', expected: false },
      { day:2, input: '양송이수프-5,초코케이크-2,제로콜라-1', expected: false },
      { day:9, input: '타파스-2,시저샐러드-5', expected: false },
    ];

    test.each(testCases)('getDisCountHistory메서드는 할인된 금액 $expected을 반환한다.', ({ day, input, expected }) => {
      // when
      userDTO = new UserDTO();
      userDTO.setExpectedVisitDate(day);
      userDTO.setOrderMenu(input);
      eventController.handleDiscountEvent(userDTO);
      const discountHistory = userDTO.getDisCountHistory();
      const result = discountHistory.some(({ eventName }) => eventName === CONSTANTS.weekendEventName);

      // then
      expect(expected).toEqual(result);
    });
  });
});
