// This item could be either a file or a folder

import * as React from 'react';
import { styled } from '@mui/material/styles';

import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';

type ExplorerItemType = 'directory' | 'file';

interface ExplorerItemProps {
    name: string;
    type: ExplorerItemType;
    onDoubleClick: () => void;
}

const ExplorerItem = (props: ExplorerItemProps) => {
    const { name, type, onDoubleClick } = props;

    return (
        <ListItem button onDoubleClick={onDoubleClick}>
            <ListItemIcon>
                {type === "directory" ? <FolderIcon /> : <DescriptionIcon />}
            </ListItemIcon>
            <ListItemText primary={name} />
        </ListItem>
    );
};

export default ExplorerItem;
export { ExplorerItemType, ExplorerItemProps };