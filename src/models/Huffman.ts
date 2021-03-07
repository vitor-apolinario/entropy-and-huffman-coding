import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

import TreeNode from '../interfaces/TreeNode';

class Huffman {
  symbolCount: {} = {};
  tree: TreeNode[] = [];
  treeHead: TreeNode;
  normalEncoding: string;
  huffmanEncoding: string;
  mappingTable: {} = {};

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

  encode(fileName: string) {
    this.byteEncode(fileName);

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
    this.mapTree(this.treeHead, '');

    this.huffmanEncoding = this.messageBuffer.reduce((bitArray: string, charCode: number) => {
      const char: string = String.fromCharCode(charCode)

      const byte: string = this.mappingTable[char];
      return bitArray + byte;
    }, '')
    
    const filePath = join(__dirname, '..', '..', 'static', 'output', 'huffman_encoded', fileName);
    writeFileSync(filePath, this.huffmanEncoding);
  }

  // mesmo sendo leaf tem que mapear o binário para algum estado
  decode(fileName: string) {
    const encodedMessageBuffer: Buffer = readFileSync(join(__dirname, '..', '..', 'static', 'output', 'huffman_encoded', fileName));
    let currentNode: TreeNode = this.treeHead;
    
    const decodedMessage: string = encodedMessageBuffer.reduce((decodedBuffer, bitRepresentation) => {
      currentNode = String.fromCharCode(bitRepresentation) === "1" ? currentNode.right : currentNode.left;

      if(currentNode.isLeaf) {
        const { symbol } = currentNode;
        currentNode = this.treeHead;

        return decodedBuffer + symbol;
      }
      return decodedBuffer;
    }, '')
   
    const filePath = join(__dirname, '..', '..', 'static', 'output', 'huffman_decoded', fileName);
    writeFileSync(filePath, decodedMessage)
  }

  private byteEncode(fileName: string) {
    this.normalEncoding = this.messageBuffer.reduce((bitArray: string, charCode: number) => {
      const byte: string = charCode.toString(2).padStart(8, '0');
      return bitArray + byte;
    }, '')

    const filePath = join(__dirname, '..', '..', 'static', 'output', 'byte_encoded', fileName);
    writeFileSync(filePath, this.normalEncoding);
  }

  private sortNodes(){
    this.tree.sort((na: TreeNode, nb: TreeNode) => nb.frequency - na.frequency)
  }

  private mapTree(currentNode: TreeNode, mappedCode: string) {
    if(currentNode.isLeaf) {
      this.mappingTable[currentNode.symbol] = mappedCode;
      return;
    }

    this.mapTree(currentNode.left, `${mappedCode}${0}`);
    this.mapTree(currentNode.right, `${mappedCode}${1}`);
  }
}

export default Huffman;