// This item could be either a file or a folder

import * as React from 'react';
import { styled } from '@mui/material/styles';

import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import { FileSystemItem } from '../file-system/FileSystem';

type ExplorerItemType = 'directory' | 'file';

interface ExplorerItemProps {
    name: string;
    type: ExplorerItemType;
    onClick: () => void;
}

const ExplorerItem = (props: ExplorerItemProps) => {
    const { name, type, onClick } = props;

    // we want the icon and the text to be vertically aligned
    return (
        <ListItem className="explorer-item" button onClick={onClick}>
            <ListItemIcon className="explorer-item-icon">
                {type === "directory" ? <FolderIcon /> : <DescriptionIcon />}
            </ListItemIcon>
            <ListItemText primary={name} />
        </ListItem>
    );
};

export default ExplorerItem;
export { ExplorerItemType, ExplorerItemProps };