// The file system will use vfs (virtual file system) to store the files
// This will be a class that can be initialized with a file system
// we need the following methods:
// 1. change directory (chdir)
// 2. read current directory (readdir)
// 3. create directory (mkdir)
// 4. delete directory (rmdir)
// 5. create file (touch)
// 6. delete file (rm)
// 7. get path (pwd)
// navigation
// 8. go to directory (cd)
// 9. back (cd ..)

import * as vfs from 'virtualfs';
// import the type fs to assign to vfs
import type Fs from 'fs';
import * as path from 'path';

interface FileSystemItem {
    type: 'file' | 'directory';
    name: string;
    path: string;
}

class FileSystem {
    private fs: typeof Fs;
    private cwd: string;
    private root: string;

    constructor(fs: typeof Fs, root: string) {
        this.fs = fs;
        this.root = root;
        this.cwd = root;
    }

    public chdir(dir: string): void {
        this.cwd = path.join(this.cwd, dir);
    }

    public readdir(): FileSystemItem[] {
        const files = this.fs.readdirSync(this.cwd);
        const items: FileSystemItem[] = [];

        for (const file of files) {
            const filePath = path.join(this.cwd, file);
            const stats = this.fs.statSync(filePath);
            const item: FileSystemItem = {
                type: stats.isDirectory() ? 'directory' : 'file',
                name: file,
                path: filePath,
            };
            items.push(item);
        }

        return items;
    }

    public mkdir(dir: string): void {
        this.fs.mkdirSync(path.join(this.cwd, dir));
    }

    public rmdir(dir: string): void {
        this.fs.rmdirSync(path.join(this.cwd, dir));
    }

    public createFile(file: string, contents = ''): void {
        this.fs.writeFileSync(path.join(this.cwd, file), contents);
    }

    public rm(file: string): void {
        this.fs.unlinkSync(path.join(this.cwd, file));
    }

    public pwd(): string {
        return this.cwd;
    }

    public cd(dir: string): void {
        this.cwd = path.join(this.cwd, dir);
    }

    public back(): void {
        this.cwd = path.join(this.cwd, '..');
    }
}

export { FileSystem, FileSystemItem };
