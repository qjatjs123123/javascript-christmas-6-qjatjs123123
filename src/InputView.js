import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from './Util/Message.js';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.expectedVisitDate);
    return input;
  },
};

export default InputView;
