/* eslint-disable prettier/prettier */
import ChristmasDdayDiscount from '../../src/Server/Domain/ChristmasDdayDiscount';
import UserDTO from '../../src/Server/DTO/UserDTO.js';

describe('크리스마스 디데이 할인 테스트', () => {
  let christmas;
  let userDTO;
  const inputOrderMenu = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';

  beforeEach(() => {
    userDTO = new UserDTO();
    christmas = new ChristmasDdayDiscount();
  });

  describe('크리스마스 디데이는 1,000원으로 시작하여 크리스마스가 다가올수록 날마다 할인 금액이 100원씩 증가한다.', () => {
    const testCases = [
      { input: 1, expected: -1000 },
      { input: 2, expected: -1100 },
      { input: 10, expected: -1900 },
      { input: 25, expected: -3400 },
    ];

    test.each(testCases)('크리스마스 디데이 할인 금액은 100원씩 증가한다.', ({ input, expected }) => {
      // when
      userDTO.setExpectedVisitDate(input);
      userDTO.setOrderMenu(inputOrderMenu);
      christmas.discount(userDTO);

      // then
      expect(expected).toEqual(userDTO.getDisCountHistory()[0].discount);
    });
  });
});
