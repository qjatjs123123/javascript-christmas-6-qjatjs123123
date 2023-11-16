import UserDTO from '../../src/Server/DTO/UserDTO.js';
import EventController from '../../src/Server/Controller/EventController.js';
import { CONSTANTS } from '../../src/Util/Constants.js';
import { ERROR_MESSAGE } from '../../src/Util/Message.js';

describe('UserDTO 도메인 테스트', () => {
  let userDTO;
  let eventController;

  beforeEach(() => {
    userDTO = new UserDTO();
    eventController = new EventController();
  });

  describe('총주문 금액이 10000원 미만이면 이벤트가 적용되지 않는다.', () => {
    // given
    const testCases = [
      { day: 1, input: '시저샐러드-1', expected: CONSTANTS.noEventWord },
      { day: 24, input: '아이스크림-1,제로콜라-1', expected: CONSTANTS.noEventWord },
      { day: 23, input: '양송이수프-1', expected: CONSTANTS.noEventWord },
      { day: 23, input: '양송이수프-1,제로콜라-1', expected: CONSTANTS.noEventWord },
      { day: 23, input: '아이스크림-1', expected: CONSTANTS.noEventWord },
    ];

    test.each(testCases)('할인 내역 메서드 getDiscountHistory에 없음이 리턴되어야 한다.', ({ day, input, expected }) => {
      // when
      userDTO = new UserDTO();
      userDTO.setExpectedVisitDate(day);
      userDTO.setOrderMenu(input);
      eventController.handleDiscountEvent(userDTO);
      const discountHistory = userDTO.getDisCountHistory();

      // then
      expect(discountHistory).toBe(expected);
    });
  });

  describe('방문 날짜 유효성 검사', () => {
    describe('공백을 입력할 경우, 예외가 발생한다.', () => {
      // given
      const testCases = [
        { input: '' },
      ];
  
      test.each(testCases)('방문날짜로 $input이 주어지는 경우, 예외가 발생한다.', ({ input }) => {
        // when
        const setExpectedVisitDate = () => userDTO.setExpectedVisitDate(input);

        // then
        expect(setExpectedVisitDate).toThrow(ERROR_MESSAGE.isBlank);
      });
    });

    describe('문자를 입력할 경우, 예외가 발생한다.', () => {
      // given
      const testCases = [
        { input: 'a' },
        { input: '홍' },
        { input: '!' },
        { input: '1홍' },
      ];
  
      test.each(testCases)('방문날짜로 $input이 주어지는 경우, 예외가 발생한다.', ({ input }) => {
        // when
        const setExpectedVisitDate = () => userDTO.setExpectedVisitDate(input);

        // then
        expect(setExpectedVisitDate).toThrow(ERROR_MESSAGE.isChar);
      });
    });

    describe(`${CONSTANTS.eventStartDay}~${CONSTANTS.eventEndDay} 범위의 숫자가 아닌 경우 에러가 발생한다.`, () => {
      // given
      const testCases = [
        { input: 0 },
        { input: 32 },
        { input: -1 },
      ];
  
      test.each(testCases)('방문날짜로 $input이 주어지는 경우, 예외가 발생한다.', ({ input }) => {
        // when
        const setExpectedVisitDate = () => userDTO.setExpectedVisitDate(input);

        // then
        expect(setExpectedVisitDate).toThrow(ERROR_MESSAGE.isNotDateRange);
      });
    });

    describe(`정상적인 방문날짜를 입력할 경우`, () => {
      // given
      const testCases = [
        { input: 1 },
        { input: 31 },
        { input: 5 },
      ];
  
      test.each(testCases)('getExpectedVisitDate메서드에서 $input을 반환한다.', ({ input }) => {
        // when
        userDTO.setExpectedVisitDate(input);

        // then
        expect(userDTO.getExpectedVisitDate()).toBe(input);
      });
    });
  });

  describe('주문할 메뉴 유효성 검사', () => {
    describe('"메뉴이름-개수"형태가 아니면 에러를 출력한다', () => {
      // given
      const testCases = [
        { input: '해산물파스타/1,제로콜라/1' },
        { input: '해산물파스타|1,제로콜라|1' },
        { input: '해산물파스타,1,제로콜라,1' },
        { input: '1-해산물파스타,1-제로콜라' },
      ];

      test.each(testCases)('주문할 메뉴로 $input이 주어지는 경우, 예외 발생한다.', ({ input }) => {
        // when
        const setOrderMenu = () => userDTO.setOrderMenu(input);

        // then
        expect(setOrderMenu).toThrow(ERROR_MESSAGE.isNotOrderMenuFormat);
      });
    });

    describe('메뉴판에 존재하는 메뉴가 아니면 에러가 발생한다.', () => {
      // given
      const testCases = [
        { input: '라면-1' },
        { input: '피자-1' },
        { input: '햄버거-1' },
        { input: '치킨-1' },
      ];

      test.each(testCases)('주문할 메뉴로 $input이 주어지는 경우, 예외 발생한다.', ({ input }) => {
        // when
        const setOrderMenu = () => userDTO.setOrderMenu(input);

        // then
        expect(setOrderMenu).toThrow(ERROR_MESSAGE.isNotOrderMenuFormat);
      });
    });

    describe('메뉴가 중복되어 입력되면 에러를 출력한다.', () => {
      // given
      const testCases = [
        { input: '해산물파스타-1,해산물파스타-1' },
        { input: '초코케이크-1,해산물파스타-1,초코케이크-1' },
        { input: '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1,티본스테이크-1' },
      ];

      test.each(testCases)('주문할 메뉴로 $input이 주어지는 경우, 예외 발생한다.', ({ input }) => {
        // when
        const setOrderMenu = () => userDTO.setOrderMenu(input);

        // then
        expect(setOrderMenu).toThrow(ERROR_MESSAGE.isDuplicate);
      });
    });

    describe('음료만 주문시 에러를 출력한다.', () => {
      // given
      const testCases = [
        { input: '제로콜라-1' },
        { input: '제로콜라-1,레드와인-1' },
        { input: '제로콜라-1,레드와인-1,샴페인-1' },
      ];

      test.each(testCases)('주문할 메뉴로 $input이 주어지는 경우, 예외 발생한다.', ({ input }) => {
        // when
        const setOrderMenu = () => userDTO.setOrderMenu(input);

        // then
        expect(setOrderMenu).toThrow(ERROR_MESSAGE.isDuplicate);
      });
    });

    describe('메뉴 개수가 총 20개를 넘으면 에러를 출력한다.', () => {
      // given
      const testCases = [
        { input: '양송이수프-21' },
        { input: '양송이수프-5,타파스-5,시저샐러드-5,초코케이크-6' },
        { input: '바비큐립-10,해산물파스타-9,-크리스마스파스타-2' },
      ];

      test.each(testCases)('주문할 메뉴로 $input이 주어지는 경우, 예외 발생한다.', ({ input }) => {
        // when
        const setOrderMenu = () => userDTO.setOrderMenu(input);

        // then
        expect(setOrderMenu).toThrow(ERROR_MESSAGE.isNotLength);
      });
    });

    describe('메뉴의 개수는 1이상이 아니면 에러를 출력한다.', () => {
      // given
      const testCases = [
        { input: '양송이수프-0' },
        { input: '양송이수프-5,타파스-5,시저샐러드-5,초코케이크-0' },
        { input: '바비큐립-10,해산물파스타-9,-크리스마스파스타-0' },
      ];

      test.each(testCases)('주문할 메뉴로 $input이 주어지는 경우, 예외 발생한다.', ({ input }) => {
        // when
        const setOrderMenu = () => userDTO.setOrderMenu(input);

        // then
        expect(setOrderMenu).toThrow(ERROR_MESSAGE.isNotOrderMenuFormat);
      });
    });

    describe(`정상적인 주문할 메뉴를 입력할 경우`, () => {
      // given
      const testCases = [
        { input: '양송이수프-1', expected: [{ menuName: '양송이수프', menuCount: 1 }] },
        {
          input: '양송이수프-5,타파스-5,시저샐러드-5,초코케이크-1',
          expected: [
            { menuName: '양송이수프', menuCount: 5 },
            { menuName: '타파스', menuCount: 5 },
            { menuName: '시저샐러드', menuCount: 5 },
            { menuName: '초코케이크', menuCount: 1 },
          ],
        },
        {
          input: '바비큐립-10,해산물파스타-9,크리스마스파스타-1',
          expected: [
            { menuName: '바비큐립', menuCount: 10 },
            { menuName: '해산물파스타', menuCount: 9 },
            { menuName: '크리스마스파스타', menuCount: 1 },
          ],
        },
      ];

      test.each(testCases)('getUserMenu메서드에서 $expected을 반환한다.', ({ input, expected }) => {
        // when
        userDTO.setOrderMenu(input);

        // then
        expect(userDTO.getUserMenu()).toEqual(expected);
      });
    });
  });
});
