// ExplorerComponent will store the interface for the explorer
// We need icons for each file type (folder and file)
// We need a method for getting the current list of files and folders

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { FileSystemItem } from '../file-system/FileSystem';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface ExplorerComponentProps {
    items: FileSystemItem[];
    onItemDoubleClick: (item: FileSystemItem) => void;
}

// since we might need our file explorer to be resizeable best way to go would be a grid layout
// file items need a file icon
// folder items need a folder icon
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ExplorerComponent = (props: ExplorerComponentProps) => {
    const { items, onItemDoubleClick } = props;

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* layout items */}
            <Grid container spacing={2}>
                {/* need to show empty if there are no items in current folder */}
                {items.length === 0 && <Item>Empty</Item>}
                {items.length > 0 && items.map(item => (
                    <Grid item xs={2} key={item.name}>
                        <Item onDoubleClick={() => onItemDoubleClick(item)}>
                            {item.type === 'directory' ? <FolderIcon /> : <InsertDriveFileIcon />}
                            {item.name}
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ExplorerComponent;