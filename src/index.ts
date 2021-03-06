import { readFileSync } from 'fs';
import { join } from 'path';

import ShanonEntropy from './models/ShanonEntropy';


const documents: string[] = ['index.html', 'topics_for_evaluation.zip', 'charles-proxy-ssl-proxying-certificate.pem', 'A Winter Pilgrimage.txt']


console.log('----------DOCUMENTS ENTROPY----------');
documents.forEach(documentName => {
  const messageBuffer: Buffer = readFileSync(join(__dirname, "..", "static", documentName));

  const se: ShanonEntropy = new ShanonEntropy(messageBuffer);
  console.log(`${documentName} - ${se.getEntropy()}`);
});
