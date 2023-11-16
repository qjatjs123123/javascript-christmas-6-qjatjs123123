/* eslint-disable prettier/prettier */
import FreeGiftEvent from '../../src/Server/Domain/FreeGiftEvent.js';
import UserDTO from '../../src/Server/DTO/UserDTO.js';
import { CONSTANTS } from '../../src/Util/Constants.js';

describe('증정품 이벤트 도메인 테스트', () => {
  let freeGift;
  let userDTO;

  beforeEach(() => {
    userDTO = new UserDTO();
    freeGift = new FreeGiftEvent();
  });

  describe(`할인 전 총주문 금액이 ${CONSTANTS.freeGiftLimitAmount}만 원 이상일 때, ${CONSTANTS.freeGift.menuName} ${CONSTANTS.freeGift.count}개 증정`, () => {
    const testCases = [
      { input: '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1', expected: CONSTANTS.freeGift},
      { input: '양송이수프-20', expected: CONSTANTS.freeGift },
      { input: '티본스테이크-2,초코케이크-1', expected: CONSTANTS.freeGift},
    ];

    test.each(testCases)(`getFreeGift에서 증정품 ${CONSTANTS.freeGift}을 반환한다.`, ({ input, expected }) => {
      // when
      userDTO.setExpectedVisitDate(3);
      userDTO.setOrderMenu(input);
      freeGift.getFreeGift(userDTO);

      // then
      expect(expected).toEqual(userDTO.getFreeGift());
    });
  });

  describe(`할인 전 총주문 금액이 ${CONSTANTS.freeGiftLimitAmount}만 원 미만일 때, 이벤트는 적용되지 않는다.`, () => {
    const testCases = [
      { input: '티본스테이크-1,바비큐립-1', expected: CONSTANTS.noEventWord},
      { input: '양송이수프-19', expected: CONSTANTS.noEventWord },
      { input: '티본스테이크-2', expected: CONSTANTS.noEventWord},
    ];

    test.each(testCases)(`getFreeGift에서 ${CONSTANTS.noEventWord}을 반환한다.`, ({ input, expected }) => {
      // when
      userDTO.setExpectedVisitDate(3);
      userDTO.setOrderMenu(input);
      freeGift.getFreeGift(userDTO);

      // then
      expect(expected).toEqual(userDTO.getFreeGift());
    });
  });
});
