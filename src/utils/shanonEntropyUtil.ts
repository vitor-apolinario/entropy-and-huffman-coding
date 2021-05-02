class ShanonEntropyUtil {

  static getEntropy(messageBuffer: Buffer): number {
    const symbolCount: {} = {};

    const messageSize: number = messageBuffer.reduce((messageSize, charCode) => {
      const symbol: string = String.fromCharCode(charCode);
      const sCount: number = symbolCount[symbol];

      symbolCount[symbol] = sCount ? sCount + 1 : 1;

      return (messageSize + 1);
    }, 0);

    const alphabetSize = Object.keys(symbolCount).length;

    return Object.keys(symbolCount).reduce((entropySum, symbol) => {
      const symbolProbability: number = symbolCount[symbol] / messageSize;

      return entropySum -(symbolProbability * (Math.log(symbolProbability) / Math.log(alphabetSize)))
    }, 0)
  }
}

export default ShanonEntropyUtil;