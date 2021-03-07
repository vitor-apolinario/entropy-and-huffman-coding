import { readFileSync } from 'fs';
import { join } from 'path';

import ShanonEntropy from './models/ShanonEntropy';
import Huffman from './models/Huffman';


const documents: string[] = ['index.html', 'topics_for_evaluation.zip', 'charles-proxy-ssl-proxying-certificate.pem', 'A Winter Pilgrimage.txt']
// const documents: string[] = ['as_casas_amarelas.txt']


console.log('----------DOCUMENTS ENTROPY----------');
documents.forEach(fileName => {
  const messageBuffer: Buffer = readFileSync(join(__dirname, "..", "static", fileName));

  const se: ShanonEntropy = new ShanonEntropy(messageBuffer);
  console.log(`${fileName} - ${se.getEntropy()}`);
});

console.log('----------HUFFMAN CODING----------');
documents.forEach(fileName => {
  const messageBuffer: Buffer = readFileSync(join(__dirname, "..", "static", fileName));

  console.log(fileName);
  const he: Huffman = new Huffman(messageBuffer);
  he.encode(fileName);
  he.decode(fileName);
});

