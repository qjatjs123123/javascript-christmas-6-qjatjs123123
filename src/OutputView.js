/* eslint-disable no-undef */
import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from './Util/Message.js';
import { CONSTANTS } from './Util/Constants.js';

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

  printPaymentTotal(paymentTotal) {
    Console.print(OUTPUT_MESSAGE.paymentTotalTitle);
    Console.print(OUTPUT_MESSAGE.paymentTotal(paymentTotal));
  },

  printAllDiscountAmount(allDiscountAmount) {
    Console.print(OUTPUT_MESSAGE.allDiscountAmountTitle);
    Console.print(OUTPUT_MESSAGE.allDiscountAmount(allDiscountAmount));
  },

  // eslint-disable-next-line consistent-return
  printDiscountHistory(discountHistory) {
    Console.print(OUTPUT_MESSAGE.discountHistoryMessage);
    if (discountHistory === CONSTANTS.noEventWord) return Console.print(OUTPUT_MESSAGE.noEventWord);

    discountHistory.forEach(({ eventName, discount }) => {
      Console.print(OUTPUT_MESSAGE.discountHistory(eventName, discount));
    });
  },

  printOriginalOrderAmount(originalOrderAmount) {
    Console.print(OUTPUT_MESSAGE.originalOrderAmountTitleMessage);
    Console.print(OUTPUT_MESSAGE.originalOrderAmountMessage(originalOrderAmount));
  },

  printFreeGift(freeGift) {
    let message = freeGift;
    if (freeGift !== CONSTANTS.noEventWord) message = `${freeGift.menuName} ${freeGift.count}개`;
    Console.print(OUTPUT_MESSAGE.freeGiftTitleMessage);
    Console.print(OUTPUT_MESSAGE.freeGiftMessage(message));
  },

  printError(errorMessage) {
    Console.print(errorMessage);
  },

  printEventPreviewMessage(visitDay) {
    Console.print(OUTPUT_MESSAGE.eventPreviewMessage(visitDay));
  },
};

export default OutputView;
