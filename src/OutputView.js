/* eslint-disable no-undef */
import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from './Util/Message.js';

const OutputView = {
  printWelcomeMessage() {
    Console.print(OUTPUT_MESSAGE.welcomeMessage);
  },

  printMenu(userMenu) {
    Console.print(OUTPUT_MESSAGE.orderMenuTitleMessage);
    userMenu.forEach(({ menuName, menuCount }) => {
      Console.print(OUTPUT_MESSAGE.orderMenuMessage(menuName, menuCount));
    });
  },

  printError(errorMessage) {
    Console.print(errorMessage);
  },

  printEventPreviewMessage(visitDay) {
    Console.print(OUTPUT_MESSAGE.eventPreviewMessage(visitDay));
  },
};

export default OutputView;
