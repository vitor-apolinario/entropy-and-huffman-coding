import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const makeDir = require('make-dir');


class FileUtils {
  static createDir(dirPath: string[]): string {
    const joinedPath: string = join(...dirPath);

    if(existsSync(joinedPath)) {
      return joinedPath;
    }
    
    return makeDir.sync(joinedPath);
  }

  static writeFile(fileBuffer: Buffer, filePath: string[], fileName: string): void{    
    const existantPath: string = this.createDir(filePath);

    writeFileSync(join(existantPath, fileName), fileBuffer);
  }
}

export default FileUtils;