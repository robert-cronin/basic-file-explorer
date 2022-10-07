// Language: typescript
// Test the file system
import { FileSystem } from '../src/file-system/FileSystem';
import * as fs from 'fs';
import * as path from 'path';

describe('FileSystem', () => {
    const testDir = path.join(__dirname, 'test');
    const fsInstance = new FileSystem(fs, testDir);

    beforeEach(() => {
        fsInstance.mkdir('test');
    });

    afterEach(() =>