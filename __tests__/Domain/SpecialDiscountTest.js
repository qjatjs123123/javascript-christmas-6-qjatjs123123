/* eslint-disable prettier/prettier */
import UserDTO from '../../src/Server/DTO/UserDTO.js';
import { CONSTANTS } from '../../src/Util/Constants.js';
import EventController from '../../src/Server/Controller/EventController.js';

describe('특별 할인 도메인 테스트', () => {
  let userDTO;
  let eventController;

  const inputOrderMenu = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
  beforeEach(() => {
    userDTO = new UserDTO();
    eventController = new EventController();
  });

  describe(`입력한 날짜가 이벤트 달력에 별이 있으면 총주문 금액에서 ${CONSTANTS.specialAmount}원 할인`, () => {
    // given
    const testCases = [
      { input: 3, expected: -1000 },
      { input: 10, expected: -1000 },
      { input: 17, expected: -1000 },
      { input: 24, expected: -1000 },
      { input: 25, expected: -1000 },
      { input: 31, expected: -1000 },
    ];

    test.each(testCases)('getDiscountHistory메서드는 이벤트 적용 히스토리를 주고 특별할인은 1000이여야 한다.', ({ input, expected }) => {
      // when
      userDTO = new UserDTO();
      userDTO.setExpectedVisitDate(input);
      userDTO.setOrderMenu(inputOrderMenu);
      eventController.handleDiscountEvent(userDTO);
      const discountHistory = userDTO.getDisCountHistory();
      const result = discountHistory.filter(({ eventName }) => eventName === CONSTANTS.specialEventName);

      // then
      expect(expected).toEqual(result[0].discount);
    });
  });

  describe(`입력한 날짜가 이벤트 달력에 별이 없으면 이벤트가 적용되지 않는다.`, () => {
    // given
    const testCases = [
      { input: 5, expected: false },
      { input: 11, expected: false },
      { input: 22, expected: false },
    ];

    test.each(testCases)('getDiscountHistory메서드는 이벤트 적용 히스토리를 보여주는데 특별할인은 없어야 한다.', ({ input, expected }) => {
      // when
      userDTO = new UserDTO();
      userDTO.setExpectedVisitDate(input);
      userDTO.setOrderMenu(inputOrderMenu);
      eventController.handleDiscountEvent(userDTO);
      const discountHistory = userDTO.getDisCountHistory();
      const result = discountHistory.some(({ eventName }) => eventName === CONSTANTS.specialEventName);

      // then
      expect(expected).toEqual(result);
    });
  });
});
