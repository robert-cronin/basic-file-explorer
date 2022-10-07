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
import ExplorerItem, { ExplorerItemType, ExplorerItemProps } from '../components/ExplorerItem';

interface ExplorerComponentProps {
    items: FileSystemItem[];
    onItemClick: (item: FileSystemItem) => void;
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
    const { items, onItemClick } = props;

    // layout items
    return (
        <Grid container item spacing={2} style={{
            minHeight: '50vh', border: '1px solid #ccc', borderRadius: '5px', margin: 'auto'
        }}>
            {/* need to show empty if there are no items in current folder */}
            {
                items.length === 0 && (
                    <Grid item xs={12} style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Item style={{ border: 'none', boxShadow: 'none' }}>
                            <h3>Empty</h3>
                        </Item>
                    </Grid>
                )
            }
            {/* sort based on alphabetical but show folders first */}
            {
                items.length > 0 && items
                    .sort((a, b) => {
                        if (a.type === "directory" && b.type === "file") {
                            return -1;
                        } else if (a.type === "file" && b.type === "directory") {
                            return 1;
                        } else {
                            return a.name.localeCompare(b.name);
                        }
                    })
                    .map(item => (
                        <Grid item xs={2} key={item.path}>
                            <ExplorerItem
                                name={item.name}
                                type={item.type}
                                onClick={() => onItemClick(item)}
                            />
                        </Grid>
                    ))
            }
        </Grid >
    );
}

export default ExplorerComponent;