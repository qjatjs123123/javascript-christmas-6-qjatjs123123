import Calendar from '../../src/Server/Domain/Calendar';
import { CONSTANTS } from '../../src/Util/Constants';

describe('Calendar 도메인 테스트', () => {
  let calendar;

  beforeEach(() => {
    calendar = new Calendar();
  });

  describe('크리스마스 디데이 테스트', () => {
    describe(`${CONSTANTS.christMasEventStartDay}~${CONSTANTS.christMasEventEndDay}는 크리스마스 디데이다.`, () => {
      // given
      const testCases = [
        { input: 1 },
        { input: 5 },
        { input: 15 },
        { input: 25 },
      ];

      test.each(testCases)('방문날짜로 $input이 주어지는 경우 크리스마스 디데이다', ({ input }) => {
        // when
        const isChristmasDdayEvent = calendar.isChristmasDdayEvent(input);

        // then
        expect(isChristmasDdayEvent).toBe(true);
      });
    });

    describe(`${CONSTANTS.christMasEventStartDay}~${CONSTANTS.christMasEventEndDay}이외는 크리스마스 디데이가 아니다.`, () => {
      // given
      const testCases = [
        { input: 0 },
        { input: 26 },
        { input: 27 },
        { input: 31 },
      ];

      test.each(testCases)('방문날짜로 $input이 주어지는 경우 크리스마스 디데이가 아니다', ({ input }) => {
        // when
        const isChristmasDdayEvent = calendar.isChristmasDdayEvent(input);

        // then
        expect(isChristmasDdayEvent).toBe(false);
      });
    });
  });

  describe('평일 할인(일요일~목요일) 테스트', () => {
    describe('평일 할인은 일요일 ~ 목요일이다.', () => {
      // given
      const testCases = [
        { input: 3 },
        { input: 4 },
        { input: 5 },
        { input: 6 },
        { input: 7 },
      ];

      test.each(testCases)('방문날짜로 $input이 주어지는 경우 평일 할인이다', ({ input }) => {
        // when
        const isWeekDayEvent = calendar.isWeekDayEvent(input);

        // then
        expect(isWeekDayEvent).toBe(true);
      });
    });

    describe('일요일 ~ 목요일이외는 평일 할인이 아니다.', () => {
      // given
      const testCases = [
        { input: 8 },
        { input: 9 },
      ];

      test.each(testCases)('방문날짜로 $input이 주어지는 경우 평일 할인이 아니다', ({ input }) => {
        // when
        const isWeekDayEvent = calendar.isWeekDayEvent(input);

        // then
        expect(isWeekDayEvent).toBe(false);
      });
    });
  });

  describe('주말 할인(금요일, 토요일) 테스트', () => {
    describe('주말 할인은 금요일, 토요일이다.', () => {
      // given
      const testCases = [
        { input: 8 },
        { input: 9 },
      ];

      test.each(testCases)('방문날짜로 $input이 주어지는 경우 주말 할인이다', ({ input }) => {
        // when
        const isWeekEndEvent = calendar.isWeekEndEvent(input);

        // then
        expect(isWeekEndEvent).toBe(true);
      });
    });

    describe('금요일, 토요일이외에는 주말 할인이 아니다', () => {
      // given
      const testCases = [
        { input: 3 },
        { input: 4 },
      ];

      test.each(testCases)('방문날짜로 $input이 주어지는 경우 주말 할인이 아니다', ({ input }) => {
        // when
        const isWeekEndEvent = calendar.isWeekEndEvent(input);

        // then
        expect(isWeekEndEvent).toBe(false);
      });
    });
  });

  describe('특별 할인 테스트', () => {
    describe(`${CONSTANTS.specialDiscount}만 특별 할인이다.`, () => {
      // given
      const testCases = CONSTANTS.specialDiscount;

      test.each(testCases)('방문날짜로 %d 주어지는 경우 특별 할인이다.', (day) => {
        // when
        const isSpecialEvent = calendar.isSpecialEvent(day);

        // then
        expect(isSpecialEvent).toBe(true);
      });
    });

    describe(`${CONSTANTS.specialDiscount}이외는 특별 할인이 아니다.`, () => {
      // given
      const testCases = [1, 5, 15, 27];

      test.each(testCases)('방문날짜로 %d 주어지는 경우 특별 할인이 아니다.', (day) => {
        // when
        const isSpecialEvent = calendar.isSpecialEvent(day);

        // then
        expect(isSpecialEvent).toBe(false);
      });
    });
  });
});
