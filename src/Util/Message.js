/* eslint-disable prettier/prettier */
const OUTPUT_MESSAGE = Object.freeze({
  welcomeMessage: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
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
});

export { OUTPUT_MESSAGE, INPUT_MESSAGE, ERROR_MESSAGE };
