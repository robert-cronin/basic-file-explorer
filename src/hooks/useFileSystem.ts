// this hook will inject a file system object into the component
import { FileSystem } from "../file-system/FileSystem";
import * as vfs from "virtualfs";
import * as path from "path";
import { useState } from "react";

// this hook should use the file system context
export function useFileSystem(): FileSystem {
  const [fs, setFs] = useState<FileSystem>();

  if (fs === null) {
    const fsInstance = new FileSystem(vfs, path.join(__dirname, "test"));
    setFs(fsInstance);
  }

  return fs!;
}