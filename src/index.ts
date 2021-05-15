import { readFileSync } from 'fs';
import { join } from 'path';

import ShanonEntropyUtil from './utils/shanonEntropyUtil';
import Huffman from './models/huffman';
import FileUtils from './utils/fileUtils';


const documents: string[] = ['index.html', 'topics_for_evaluation.zip', 'charles-proxy-ssl-proxying-certificate.pem', 'A Winter Pilgrimage.txt']
// const documents: string[] = ['as_casas_amarelas.txt']


documents.forEach(fileName => {
  const messageBuffer: Buffer = readFileSync(join(__dirname, "..", "static", fileName));

  console.log(`----------${fileName}----------`);
  const he: Huffman = new Huffman(messageBuffer);
  
  const encodedMessageBuffer: Buffer = he.encode();
  FileUtils.writeFile(encodedMessageBuffer, ['static', 'output', 'huffman_encoded'], fileName);

  const decodedMessageBuffer: Buffer = he.decode(encodedMessageBuffer);
  FileUtils.writeFile(decodedMessageBuffer, ['static', 'output', 'huffman_decoded'], fileName);

  const decodedSize: number = messageBuffer.length;
  const encodedSize: number = encodedMessageBuffer.length

  const decodedEntropy: number = ShanonEntropyUtil.getEntropy(messageBuffer);
  const encodedEntropy: number = ShanonEntropyUtil.getEntropy(encodedMessageBuffer);

  console.log(`size in bytes\nnormal encoding: ${decodedSize}\nhuffman: ${encodedSize}\ndiff: ${(1 - (encodedSize/decodedSize))*100}%\n`);
  console.log(`original: ${decodedEntropy}`);
  console.log(`encoded:  ${encodedEntropy}`);
  console.log(`diff:  ${ShanonEntropyUtil.getEntropy(encodedMessageBuffer) - ShanonEntropyUtil.getEntropy(decodedMessageBuffer)}\n`);
});

