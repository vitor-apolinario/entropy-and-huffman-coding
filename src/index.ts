import { readFileSync } from 'fs';
import { join } from 'path';

import ShanonEntropyUtil from './utils/shanonEntropyUtil';
import Huffman from './models/Huffman';


const documents: string[] = ['index.html', 'topics_for_evaluation.zip', 'charles-proxy-ssl-proxying-certificate.pem', 'A Winter Pilgrimage.txt']
// const documents: string[] = ['as_casas_amarelas.txt']


documents.forEach(fileName => {
  const messageBuffer: Buffer = readFileSync(join(__dirname, "..", "static", fileName));

  console.log(`----------${fileName}----------`);
  const he: Huffman = new Huffman(messageBuffer);
  he.encode(fileName);
  he.decode(fileName);

  const encodedMessageBuffer: Buffer = readFileSync(join(__dirname, "..", "static", "output", "huffman_encoded",  fileName));

  console.log(`original: ${ShanonEntropyUtil.getEntropy(messageBuffer)}`);
  console.log(`encoded:  ${ShanonEntropyUtil.getEntropy(encodedMessageBuffer)}\n`);
});

