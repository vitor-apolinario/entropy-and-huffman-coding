import TreeNode from '../interfaces/TreeNode';

class Huffman {
  symbolCount: {} = {};
  tree: TreeNode[] = [];
  treeHead: TreeNode;
  normalEncoding: string;
  mappingTable: {} = {};
  lastByte: string = '';

  byteArray: string[] = [];

  constructor(private messageBuffer: Buffer) {
    messageBuffer.forEach(charCode => {
      const symbol: string = String.fromCharCode(charCode);
      const sCount: number = this.symbolCount[symbol];

      this.symbolCount[symbol] = sCount ? sCount + 1 : 1;
    });
    
    Object.keys(this.symbolCount).forEach(symbolKey => this.tree.push({ 
      symbol: symbolKey,
      isLeaf: true, 
      frequency: this.symbolCount[symbolKey], 
      left: undefined, 
      right: undefined 
    }))

    this.sortNodes()
  }

  encode(): Buffer {
    while(this.tree.length > 1) {
      const nodeA: TreeNode = this.tree.pop();
      const nodeB: TreeNode = this.tree.pop();

      const nodeC: TreeNode = { 
        symbol: undefined,
        isLeaf: false, 
        frequency: nodeA.frequency + nodeB.frequency,
        left: nodeA, 
        right: nodeB 
      }

      this.tree.push(nodeC);
      this.sortNodes();
    }

    this.treeHead = this.tree.pop();
    this.createMappingTable(this.treeHead, '');

    const a = this.messageBuffer.reduce((accumulator, charCode: number) => {
      const char: string = String.fromCharCode(charCode)
      const bits: string = this.mappingTable[char];

      accumulator.bitSet += bits;

      while(accumulator.bitSet.length >= 8) {
        accumulator.byteArray.push(parseInt(accumulator.bitSet.substr(0, 8), 2));
        accumulator.bitSet = accumulator.bitSet.substr(8)
      }
      
      return accumulator;
    }, { bitSet: '', byteArray: [] })

    if(a.bitSet)
      this.lastByte = a.bitSet;

    return Buffer.from(a.byteArray);
  }

  decode(encodedMessageBuffer: Buffer): Buffer {
    let bitSet: string = encodedMessageBuffer.reduce((bitS, charCode) => bitS + charCode.toString(2).padStart(8, '0') , '')
    bitSet += this.lastByte;

    let currentNode: TreeNode = this.treeHead;

    const decodedMessage: string = [...bitSet].reduce((decodedBuffer, bitRepresentation) => {
      currentNode = bitRepresentation === "1" ? currentNode.right : currentNode.left;

      if(currentNode.isLeaf) {
        const { symbol } = currentNode;
        currentNode = this.treeHead;

        return decodedBuffer + symbol;
      }
      return decodedBuffer;
    }, '')

    return Buffer.from(decodedMessage);
  }

  private sortNodes(){
    this.tree.sort((na: TreeNode, nb: TreeNode) => nb.frequency - na.frequency)
  }

  private createMappingTable(currentNode: TreeNode, mappedCode: string) {
    if(currentNode.isLeaf) {
      this.mappingTable[currentNode.symbol] = mappedCode;
      return;
    }

    this.createMappingTable(currentNode.left, `${mappedCode}${0}`);
    this.createMappingTable(currentNode.right, `${mappedCode}${1}`);
  }
}

export default Huffman;