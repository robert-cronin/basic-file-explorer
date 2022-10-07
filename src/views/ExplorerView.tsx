// This view will contain the following components:
// full width search bar on top
// two left-aligned buttons, 1) "Create new file", 2) "Create new folder"
// a small text linewith left: breadcrumbs to show current path and right: back button
// an interactive explorer view that shows icons for files and folders
// below explorer on right: Total number of files and folders (recursively)

import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import AddItemView, { } from './AddItemView';
import { ExplorerItemType } from '../components/ExplorerItem';
import { useFileSystem } from '../hooks/useFileSystem';
import { FileSystemItem } from '../file-system/FileSystem';

interface ExplorerViewProps {
}

const ExplorerView = (props: ExplorerViewProps) => {
    const { } = props;

    // use the file  system hook to get the current path and the list of files and folders
    const fileSystem = useFileSystem();

    // create new item state and actions
    const [createNewItemOpen, setCreateNewItemOpen] = React.useState(false);
    const [createNewItemIsFile, setCreateNewItemIsFile] = React.useState(false);
    const handleCreateNewItem = (isFile: boolean) => {
        setCreateNewItemOpen(true);
        setCreateNewItemIsFile(isFile);
    }

    // create file explorer states
    const [searchText, setSearchText] = useState('');
    const [currentPath, setCurrentPath] = useState('');
    const [currentItems, setCurrentItems] = useState<FileSystemItem[]>([]);



    // upon view load and whenever the current path changes, we need to update the current items
    // additionally, we filter based on the text, this should also be a dependency
    // since we might also add new items, we should also the modal open state as a dependency
    useEffect(() => {
        const _currentItems = fileSystem.readdir();
        setCurrentItems(_currentItems.filter(item => item.name.includes(searchText)));
    }, [currentPath, searchText, createNewItemOpen]);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {/* Search bar */}
                    <TextField id="search-bar" label="Search" variant="outlined" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    {/* Create new file and folder buttons */}
                    <Grid container xs={6}>
                        <Button variant="contained" onClick={() => handleCreateNewItem(true)}>
                            Create new file
                        </Button>
                        <Button variant="contained" onClick={() => handleCreateNewItem(false)}>
                            Create new folder
                        </Button>
                    </Grid>
                    {/* Breadcrumbs and back button */}
                    <Grid container xs={6}>
                        {/* breadcrumbs should show each segment of the path */}
                        <Breadcrumbs aria-label="breadcrumb">
                            {currentPath.split('/').map((segment, index) => {
                                return (
                                    <Button key={index} onClick={() => setCurrentPath(currentPath.split('/').slice(0, index).join('/'))}>
                                        {segment}
                                    </Button>
                                )
                            })}
                        </Breadcrumbs>
                        <Button onClick={() => setCurrentPath(currentPath.split('/').slice(0, -1).join('/'))}>
                            Back
                        </Button>
                    </Grid>
                    {/* Explorer view */}
                    <Grid container xs={12}>
                        <Paper>
                            <ExplorerView />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            {/* Create new item modal */}
            <AddItemView
                open={createNewItemOpen}
                onClose={() => setCreateNewItemOpen(false)}
                type={createNewItemIsFile ? ExplorerItemType.File : ExplorerItemType.Folder}
                onConfirm={(name, contents) => {
                    if (createNewItemIsFile) {
                        fileSystem.createFile(name, contents ?? '');
                    } else {
                        fileSystem.mkdir(name);
                    }
                    setCreateNewItemOpen(false);
                }}
            />
        </>
    );
};

export default ExplorerView;