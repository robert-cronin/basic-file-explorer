// // Language: typescript
// // Test the file system
// import { FileSystem } from '../../src/file-system/FileSystem';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as vfs from 'virtualfs';
// // import jest
// import { mock, MockProxy } from 'jest-mock-extended';
// import { File } from '../../src/file-system/File';
// import { Directory } from '../../src/file-system/Directory';

// describe('FileSystem', () => {
//     let fsInstance: FileSystem;
//     let vfsMock: MockProxy<typeof vfs>;

//     beforeEach(() => {
//         vfsMock = mock<typeof vfs>();
//         fsInstance = new FileSystem(vfsMock, '/');
//     });

//     it('should be defined', () => {
//         expect(fsInstance).toBeDefined();
//     });

//     it('should be able to create a file', () => {
//         try {
//             fsInstance.createFile('file.txt');
//         } catch (error) {
//             expect(error).toBeUndefined();
//         }
//     });

//     it('should be able to create a directory', () => {
//         const dir = fsInstance.createDirectory('dir');
//         expect(dir).toBeDefined();
//     });

//     it('should be able to read a file', () => {
//         fileMock.read.mockReturnValue('file contents');
//         fsInstance.createFile('file.txt', fileMock);
//         const contents = fsInstance.readFile('file.txt');
//         expect(contents).toBe('file contents');
//     });

//     it('should be able to write a file', () => {
//         fsInstance.createFile('file.txt', fileMock);
//         fsInstance.writeFile('file.txt', 'file contents');
//         expect(fileMock.write).toHaveBeenCalledWith('file contents');
//     });

//     it('should be able to delete a file', () => {
//         fsInstance.createFile('file.txt', fileMock);
//         fsInstance.deleteFile('file.txt');
//         expect(fileMock.delete).toHaveBeenCalled();
//     });

//     it('should be able to delete a directory', () => {
//         fsInstance.createDirectory('dir', dirMock);
//         fsInstance.deleteDirectory('dir');
//         expect(dirMock.delete).toHaveBeenCalled();
//     });

//     it('should be able to list files', () => {
//         fsInstance.createFile('file.txt', fileMock);
//         fsInstance.createFile('file2.txt', fileMock);
//         fsInstance.createFile('file3.txt', fileMock);
//         const files = fsInstance.listFiles
//         expect(files).toEqual(['file.txt', 'file2.txt', 'file3.txt']);
//     }
