class ShanonEntropyUtils {
  symbolCount: {} = {};
  messageSize: number;
  alphabetSize: number;
  messageEntropy: number = undefined;


  constructor(private messageBuffer: Buffer) {
    this.messageSize = messageBuffer.reduce((messageSize, charCode) => {
      const symbol: string = String.fromCharCode(charCode);
      const sCount: number = this.symbolCount[symbol];

      this.symbolCount[symbol] = sCount ? sCount + 1 : 1;

      return (messageSize + 1);
    }, 0);

    this.alphabetSize = Object.keys(this.symbolCount).length;
  }

  private calculateEntropy(): void {
    this.messageEntropy = Object.keys(this.symbolCount).reduce((entropySum, symbol) => {
      const symbolProbability: number = this.symbolCount[symbol] / this.messageSize;

      return entropySum -(symbolProbability * (Math.log(symbolProbability) / Math.log(this.alphabetSize)))
    }, 0)

    return;
  }

  getEntropy(): number {
    if (!this.messageEntropy) {
      this.calculateEntropy();
    }

    return this.messageEntropy;
  }

}

export default ShanonEntropyUtils;