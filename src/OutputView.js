/* eslint-disable no-undef */
import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from './Util/Message.js';

const OutputView = {
  printWelcomeMessage() {
    Console.print(OUTPUT_MESSAGE.welcomeMessage);
  },

  printMenu() {
    Console.print('<주문 메뉴>');
  },
};

export default OutputView;
