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

// import the type fs to assign to vfs
import * as Path from 'path';
import mfs from 'memory-fs';

interface FileSystemItem {
    type: 'file' | 'directory';
    name: string;
    path: string;
}

interface FileSystemState {
    cwd: string;
    cwdHistory: string[];
    fs: JSON;
}

class FileSystem {
    private fs: any;
    private cwd: string;
    private cwdHistory: string[];

    constructor() {
        // getState if available
        const state = this.getSate();
        debugger;
        if (state) {
            this.fs = new mfs(state.fs);
            this.cwd = state.cwd;
            this.cwdHistory = state.cwdHistory ?? [];
        } else {
            this.fs = new mfs();
            this.cwd = '/';
            this.cwdHistory = [];
        }
    }

    private getSate(): FileSystemState | null {
        try {
            const json = localStorage.getItem('mfs');
            // parse the json
            const state: FileSystemState = JSON.parse(json);
            return state
        } catch (error) {
            return null
        }
    }

    // create method for saving state
    private saveState(): void {
        // save the state of the file system
        // state will be saved to local storage
        // state includes: cwd and the state of the file system (json representing vfs)
        const state = {
            cwd: this.cwd,
            fs: this.fs.data,
            cwdHistory: this.cwdHistory,
        };
        const json = JSON.stringify(state);
        localStorage.setItem('mfs', json);
    }

    public chdir(dir: string): void {
        this.cwdHistory.push(this.cwd);
        this.cwd = dir
        this.saveState();
    }

    public readdir(path: string): FileSystemItem[] {
        const files = this.fs.readdirSync(path);
        const items: FileSystemItem[] = [];

        for (const file of files) {
            const filePath = Path.join(path, file);
            const stats = this.fs.statSync(filePath);
            const item: FileSystemItem = {
                type: stats.isDirectory() ? 'directory' : 'file',
                name: file,
                path: filePath,
            };
            items.push(item);
        }

        // don't return any files that start with a .
        return items.filter((item) => !item.name.startsWith('.'));
    }

    // get total items (files and folders) with recursion
    public getTotalItems(dir: string): { totalFiles: number; totalFolders: number } {
        const items = this.readdir(dir);
        let totalFiles = 0;
        let totalFolders = 0;
        for (const item of items) {
            if (item.type === 'directory') {
                totalFolders++;
                const { totalFiles: _totalFiles, totalFolders: _totalFolders } = this.getTotalItems(item.path);
                totalFiles += _totalFiles;
                totalFolders += _totalFolders;
            } else {
                totalFiles++;
            }
        }
        return { totalFiles, totalFolders };
    }

    public mkdir(dir: string): void {
        this.fs.mkdirSync(dir);
        // we also must add a .keep file due to mfs not allowing empty directories
        this.fs.writeFileSync(Path.join(dir, '.keep'), 'keep');
        this.saveState();
    }

    public rmdir(dir: string): void {
        this.fs.rmdirSync(dir);
        this.saveState();
    }

    public createFile(file: string, contents = ''): void {
        this.fs.writeFileSync(file, contents);
        this.saveState();
    }

    public rm(file: string): void {
        this.fs.unlinkSync(file);
        this.saveState();
    }

    public pwd(): string {
        return this.cwd;
    }

    public back(): string {
        const last = this.cwdHistory.pop();
        debugger;
        if (last) {
            this.cwd = last;
        }
        this.saveState();
        return this.cwd
    }
    // method to check if user can go back 
    public canGoBack(): boolean {
        debugger;
        return this.cwdHistory?.length > 0;
    }

    // read file
    public readFile(file: string): string {
        const _file = this.fs.readFileSync(file);
        return Buffer.from(_file).toString();
    }
}

export { FileSystem, FileSystemItem };
