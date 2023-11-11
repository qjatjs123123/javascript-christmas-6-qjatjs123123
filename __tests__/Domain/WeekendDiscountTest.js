/* eslint-disable prettier/prettier */
import WeekendDiscount from '../../src/Server/Domain/WeekendDiscount.js';
import UserDTO from '../../src/Server/DTO/UserDTO.js';
import { CONSTANTS } from '../../src/Util/Constants.js';

describe('주말 할인 도메인 테스트', () => {
  let weekend;
  let userDTO;

  beforeEach(() => {
    userDTO = new UserDTO();
    weekend = new WeekendDiscount();
  });

  describe(`주말에는 메인 메뉴를 메뉴 1개당 ${CONSTANTS.discountAmount}원 할인한다.`, () => {
    const testCases = [
      { input: '티본스테이크-5,바비큐립-2,초코케이크-2,제로콜라-1', expected: -2023 * 7 },
      { input: '해산물파스타-7,크리스마스파스타-1,초코케이크-2,제로콜라-1', expected: -2023 * 8 },
      { input: '티본스테이크-5,바비큐립-2,해산물파스타-7,크리스마스파스타-1', expected: -2023 * 15 },
    ];

    test.each(testCases)('getDisCountHistory메서드는 할인된 금액 $expected을 반환한다.', ({ input, expected }) => {
      // when
      userDTO.setExpectedVisitDate(8);
      userDTO.setOrderMenu(input);
      weekend.discount(userDTO);

      // then
      expect(expected).toEqual(userDTO.getDisCountHistory()[0].discount);
    });
  });
});
