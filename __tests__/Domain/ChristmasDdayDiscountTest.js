/* eslint-disable prettier/prettier */
import UserDTO from '../../src/Server/DTO/UserDTO.js';
import EventController from '../../src/Server/Controller/EventController.js';
import { CONSTANTS } from '../../src/Util/Constants.js';

describe('크리스마스 디데이 할인 테스트', () => {
  let userDTO;
  let eventController;
  const inputOrderMenu = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';

  beforeEach(() => {
    userDTO = new UserDTO();
    eventController = new EventController();
  });

  describe('크리스마스 디데이는 1,000원으로 시작하여 크리스마스가 다가올수록 날마다 할인 금액이 100원씩 증가한다.', () => {
    const testCases = [
      { input: 1, expected: -1000 },
      { input: 2, expected: -1100 },
      { input: 10, expected: -1900 },
      { input: 25, expected: -3400 },
    ];

    test.each(testCases)('getDisCountHistory에서 할인된 금액 $expected를 반환한다.', ({ input, expected }) => {
      // when
      userDTO.setExpectedVisitDate(input);
      userDTO.setOrderMenu(inputOrderMenu);
      eventController.handleDiscountEvent(userDTO);
      const discountHistory = userDTO.getDisCountHistory();
      const result = discountHistory.filter(({ eventName }) => eventName === CONSTANTS.christmasDdayEventName);

      // then
      expect(expected).toEqual(result[0].discount);
    });
  });

  describe('크리스마스 디데이는 25일이 지나면 이벤트가 종료된다.', () => {
    const testCases = [
      { input: 26 },
      { input: 27 },
      { input: 31 },
    ];

    test.each(testCases)('getDisCountHistory에서 할인 내역에 크리스마스 디데이가 없어야 한다.', ({ input }) => {
      // when
      userDTO = new UserDTO();
      userDTO.setExpectedVisitDate(input);
      userDTO.setOrderMenu(inputOrderMenu);
      eventController.handleDiscountEvent(userDTO);
      const discountHistory = userDTO.getDisCountHistory();
      const result = discountHistory.some(({ eventName }) => eventName === CONSTANTS.christmasDdayEventName);

      // then
      expect(result).toBe(false);
    });
  });

});
