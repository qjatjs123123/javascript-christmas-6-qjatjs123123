/* eslint-disable prettier/prettier */
import { CONSTANTS } from './Constants.js';

const OUTPUT_MESSAGE = Object.freeze({
  welcomeMessage: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  eventPreviewMessage: (visitDay) => `${CONSTANTS.eventMonth}월 ${visitDay}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
  orderMenuTitleMessage: '<주문 메뉴>',
  orderMenuMessage: (menuName, menuCount) => `${menuName} ${menuCount}개`,
  originalOrderAmountTitleMessage: '\n<할인 전 총주문 금액>',
  originalOrderAmountMessage: (originalOrderAmount) => `${originalOrderAmount.toLocaleString()}원`,
  freeGiftTitleMessage: '\n<증정 메뉴>',
  freeGiftMessage: (message) => `${message}`,
  discountHistoryMessage: '\n<혜택 내역>',
  discountHistory: (eventName, discount) => `${eventName}: ${discount.toLocaleString()}원`,
  noEventWord: `${CONSTANTS.noEventWord}`,
  allDiscountAmountTitle: '\n<총혜택 금액>',
  allDiscountAmount: (allDiscountAmount) => `${allDiscountAmount.toLocaleString()}원`,
});

const INPUT_MESSAGE = Object.freeze({
  expectedVisitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  menuAndCountMessage: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

const ERROR_MESSAGE = Object.freeze({
  isChar: '[ERROR] 문자를 입력하시면 안 됩니다. 다시 입력해 주세요.',
  isBlank: '[ERROR] 공백를 입력하시면 안 됩니다. 다시 입력해 주세요.',
  isNotDateRange: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  isNotAPI: '[ERROR] 유효하지 않은 URL 입니다. 다시 입력해 주세요',
  isNotOrderMenuFormat: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  isDuplicate: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  isAllBeverage: '[ERROR] 음료만 주문 시, 주문할 수 없습니다.',
  isNotLength: '[ERROR] 메뉴는 최대 20개 까지 가능합니다. 다시 입력해 주세요.'
});

export { OUTPUT_MESSAGE, INPUT_MESSAGE, ERROR_MESSAGE };
