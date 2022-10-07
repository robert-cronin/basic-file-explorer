// This view will contain the following components:
// full width search bar on top
// two left-aligned buttons, 1) "Create new file", 2) "Create new folder"
// a small text linewith left: breadcrumbs to show current path and right: back button
// an interactive explorer view that shows icons for files and folders
// below explorer on right: Total number of files and folders (recursively)

import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import AddItemView, { } from './AddItemView';
import { useFileSystem } from '../hooks/useFileSystem';
import { FileSystemItem } from '../file-system/FileSystem';
import ExplorerComponent from '../components/ExplorerComponent';
import { Typography } from '@mui/material';
import * as Path from 'path';

interface ExplorerViewProps {}

const ExplorerView = (props: ExplorerViewProps) => {
    const { } = props;

    // use the file  system hook to get the current path and the list of files and folders
    const fileSystem = useFileSystem();

    // create new item state and actions
    const [createNewItemOpen, setCreateNewItemOpen] = useState(false);
    const [createNewItemIsFile, setCreateNewItemIsFile] = useState(false);
    const handleCreateNewItem = (isFile: boolean) => {
        setCreateNewItemOpen(true);
        setCreateNewItemIsFile(isFile);
    }
    // track if user can go back
    const [canGoBack, setCanGoBack] = useState(false);

    // create file explorer states
    const [searchText, setSearchText] = useState('');
    const [currentPath, setCurrentPath] = useState('/');
    const [currentItems, setCurrentItems] = useState<FileSystemItem[]>([]);

    // keep track of total number of files and folders
    const [totalFiles, setTotalFiles] = useState(0);
    const [totalFolders, setTotalFolders] = useState(0);

    const handleOpenItem = (item: FileSystemItem) => {
        if (item.type === "directory") {
            fileSystem.chdir(item.path);
            setCurrentPath(item.path);
        } else {
            // open file
            alert("File contets: " + fileSystem.readFile(item.path));
        }
    }

    const handleChangePath = (path: string) => {
        fileSystem.chdir(path);
        setCurrentPath(path);
    }

    const handleBack = () => {
        const previousPath = fileSystem.back();
        setCurrentPath(previousPath);
    }

    // upon view load and whenever the current path changes, we need to update the current items
    // additionally, we filter based on the text, this should also be a dependency
    // since we might also add new items, we should also the modal open state as a dependency
    useEffect(() => {
        const _currentItems = fileSystem.readdir(currentPath);
        setCurrentItems(_currentItems.filter(item => item.name.includes(searchText)));
    }, [currentPath, searchText, createNewItemOpen]);

    // everytime we chdir, want to get the new total count
    useEffect(() => {
        const {
            totalFiles,
            totalFolders
        } = fileSystem.getTotalItems(currentPath);
        setTotalFiles(totalFiles);
        setTotalFolders(totalFolders);
    }, [currentPath, createNewItemOpen]);

    // update if user can go back
    useEffect(() => {
        setCanGoBack(fileSystem.canGoBack());
    }, [currentPath]);

    // upon load check which folder we are in from history
    useEffect(() => {
        const currentPath = fileSystem.pwd();
        setCurrentPath(currentPath);
    }, []);

    return (
        <>
            <Box className="explorer-view">
                {/* need to make this grid extend all the way */}
                <Grid container spacing={1} xs={12} className="explorer-view-container">
                    {/* Search bar */}
                    <Grid item xs={12} className="search-bar">
                        <TextField className="search-bar" label="Search" variant="outlined" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    </Grid>
                    {/* Create new file and folder buttons */}
                    <Grid item xs={12}>
                        {/* create container to justify to the right */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', spacing: 2 }}>
                            <Button variant="contained" onClick={() => handleCreateNewItem(true)}>
                                Create new file
                            </Button>
                            {/* add some space */}
                            <Box sx={{ width: 10 }} />
                            <Button variant="contained" onClick={() => handleCreateNewItem(false)}>
                                Create new folder
                            </Button>
                        </Box>
                    </Grid>
                    {/* Breadcrumbs and back button */}
                    <Grid container item xs={12}>
                        {/* create container to space out items */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            {/* breadcrumbs should show each segment of the path */}
                            <Breadcrumbs aria-label="breadcrumb">
                                {/* 2 cases here, current path is root or not */}
                                {currentPath === '/' ? <Button key='/'>Root</Button> : currentPath.split('/').map((segment, index) => {
                                    // if the segment is empty, we are at the root
                                    if (segment === '') {
                                        return <Button key='/' onClick={() => handleChangePath('/')}>Root</Button>
                                    }
                                    // otherwise, we need to create a button for each segment
                                    // we also need to create a path for each segment
                                    const path = currentPath.split('/').slice(0, index + 1).join('/');
                                    return <Button key={path} onClick={() => handleChangePath(path)}>{segment}</Button>
                                })}
                            </Breadcrumbs>
                            {/* navigate up one level in the cwdHistory if there is a history otherwise disable */}
                            <Button variant="text" disabled={!canGoBack} onClick={handleBack}>
                                Back
                            </Button>
                        </Box>
                    </Grid>
                    {/* Explorer component */}
                    <Grid item xs={12} className="explorer-component">
                        {/* explorer should expand to fille available space */}
                        <ExplorerComponent items={currentItems} onItemClick={handleOpenItem} />
                    </Grid>
                    {/* Total number of files and folders */}
                    <Grid item xs={12} style={{ flexGrow: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            {/* e.g. Total: 7 files and 2 folders */}
                            <Typography variant="body2">
                                Total: {totalFiles} files and {totalFolders} folders.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/* Create new item modal */}
            <AddItemView
                open={createNewItemOpen}
                onClose={() => setCreateNewItemOpen(false)}
                type={createNewItemIsFile ? "file" : "directory"}
                onConfirm={(name, contents) => {
                    if (createNewItemIsFile) {
                        fileSystem.createFile(Path.join(currentPath, name), contents ?? '');
                    } else {
                        fileSystem.mkdir(Path.join(currentPath, name));
                    }
                    setCreateNewItemOpen(false);
                }}
            />
        </>
    );
};

export default ExplorerView;