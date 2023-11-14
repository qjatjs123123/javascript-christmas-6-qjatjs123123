/* eslint-disable prettier/prettier */
import EventBadge from '../../src/Server/Domain/EventBadge.js';
import UserDTO from '../../src/Server/DTO/UserDTO.js';
import { CONSTANTS } from '../../src/Util/Constants.js';
import EventController from '../../src/Server/Controller/EventController.js';

describe('이벤트 배지 도메인 테스트', () => {
  let eventBadge;
  let userDTO;
  let eventController;

  beforeEach(() => {
    userDTO = new UserDTO();
    eventBadge = new EventBadge();
    eventController = new EventController();
  });

  describe(`총혜택 금액에 따라 다른 이벤트 배지를 부여한다.`, () => {
    const testCases = [
      { input: { visitDay: 3, menu: '아이스크림-3'}, expected: CONSTANTS.starBadge.badgeName },
      { input: { visitDay: 3, menu: '아이스크림-5'}, expected: CONSTANTS.treeBadge.badgeName },
      { input: { visitDay: 3, menu: '아이스크림-6'}, expected: CONSTANTS.treeBadge.badgeName },
      { input: { visitDay: 3, menu: '아이스크림-10'}, expected: CONSTANTS.santaBadge.badgeName },
    ];

    test.each(testCases)('getEventBadge 할인된 금액 $expected을 반환한다.', ({ input, expected }) => {
      // when
      userDTO = new UserDTO();
      userDTO.setExpectedVisitDate(input.visitDay);
      userDTO.setOrderMenu(input.menu);
      eventController.handleDiscountEvent(userDTO);
      eventBadge.getEventBadge(userDTO);

      // then
      expect(expected).toEqual(userDTO.getEventBadge());
    });
  });

  describe(`총혜택 금액이 5천원 이하이면 이벤트 배지 이벤트가 적용되지 않아야 한다.`, () => {
    const testCases = [
      { input: { visitDay: 2, menu: '아이스크림-2'}, expected: CONSTANTS.noEventWord },
      { input: { visitDay: 3, menu: '티본스테이크-1,바비큐립-1'}, expected: CONSTANTS.noEventWord },
      { input: { visitDay: 4, menu: '초코케이크-1'}, expected: CONSTANTS.noEventWord },
      { input: { visitDay: 26, menu: '타파스-1,제로콜라-1'}, expected: CONSTANTS.noEventWord },
    ];

    test.each(testCases)('getEventBadge 할인된 금액 $expected을 반환한다.', ({ input, expected }) => {
      // when
      userDTO = new UserDTO();
      userDTO.setExpectedVisitDate(input.visitDay);
      userDTO.setOrderMenu(input.menu);
      eventController.handleDiscountEvent(userDTO);
      eventBadge.getEventBadge(userDTO);

      // then
      expect(expected).toEqual(userDTO.getEventBadge());
    });
  });
});
