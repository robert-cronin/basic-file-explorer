// this hook will inject a file system object into the component
import { FileSystem } from "../file-system/FileSystem";
import * as path from "path";
import { useState } from "react";

// this hook should use the file system context
export function useFileSystem(): FileSystem {
    const [fileSystem, setFileSystem] = useState<FileSystem>();
    if (!fileSystem) {
      const fs = new FileSystem();
      setFileSystem(fs);
      return fs
    }

    return fileSystem
}