const OUTPUT_MESSAGE = Object.freeze({
  welcomeMessage: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n',
});

const INPUT_MESSAGE = Object.freeze({
  expectedVisitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
});

const ERROR_MESSAGE = Object.freeze({
  isChar: '[ERROR] 문자를 입력하시면 안 됩니다.',
});

export { OUTPUT_MESSAGE, INPUT_MESSAGE, ERROR_MESSAGE };
