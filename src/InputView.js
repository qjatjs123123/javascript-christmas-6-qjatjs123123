import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from './Util/Message.js';

const InputView = {
  async readDate() {
    const expectedVisitDate = await Console.readLineAsync(INPUT_MESSAGE.expectedVisitDate);
    return expectedVisitDate;
  },

  async readOrderMenuAndCount() {
    const orderMenuAndCount = await Console.readLineAsync(INPUT_MESSAGE.menuAndCountMessage);
    return orderMenuAndCount;
  },
};

export default InputView;
