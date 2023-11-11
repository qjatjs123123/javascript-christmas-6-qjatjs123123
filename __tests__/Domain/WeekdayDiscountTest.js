/* eslint-disable prettier/prettier */
import WeekdayDiscount from '../../src/Server/Domain/WeekdayDiscount';
import UserDTO from '../../src/Server/DTO/UserDTO.js';
import { CONSTANTS } from '../../src/Util/Constants.js';

describe('평일 할인 도메인 테스트', () => {
  let weekday;
  let userDTO;

  beforeEach(() => {
    userDTO = new UserDTO();
    weekday = new WeekdayDiscount();
  });

  describe(`평일 할인에는 디저트 메뉴를 메뉴 1개당 ${CONSTANTS.discountAmount}원 할인한다.`, () => {
    const testCases = [
      { input: '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1', expected: -2023 * 2 },
      { input: '아이스크림-5,바비큐립-1,초코케이크-2,제로콜라-1', expected: -2023 * 7 },
      { input: '아이스크림-8,바비큐립-1,초코케이크-2,제로콜라-1', expected: -2023 * 10 },
    ];

    test.each(testCases)('getDisCountHistory메서드는 할인된 금액 $expected을 반환한다.', ({ input, expected }) => {
      // when
      userDTO.setExpectedVisitDate(3);
      userDTO.setOrderMenu(input);
      weekday.discount(userDTO);

      // then
      expect(expected).toEqual(userDTO.getDisCountHistory()[0].discount);
    });
  });
});
