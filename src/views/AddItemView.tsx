// this view will be a popup modal that will either create file or create directory under the current directory
// the modal heading is either "New File" or "New Folder"
// name field
// optional content field (only for file)
// two actions: 1) "Cancel" and 2) "Create"

import * as React from 'react';
import { useState } from 'react';
import { ExplorerItemType } from '../components/ExplorerItem';
import { Typography, Modal, Box, TextField, Button } from '@mui/material';

interface AddItemViewProps {
    open: boolean;
    onClose: () => void;
    type: ExplorerItemType;
    onConfirm: (name: string, contents?: string) => void;
}

const AddItemView = (props: AddItemViewProps) => {
    const { open, onClose, type, onConfirm } = props;

    const [name, setName] = useState('');
    const [contents, setContents] = useState('');

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {type === "file" ? 'New File' : 'New Folder'}
                </Typography>
                {/* Name field */}
                <TextField fullWidth id="name-field" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                {/* Content field (only for file) */}
                {type === "file" && (
                    <TextField fullWidth id="content-field" label="Content" variant="outlined" value={contents} onChange={(e) => setContents(e.target.value)} />
                )}
                {/* Actions (should be on one line, right-aligned) */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => onConfirm(name, contents)}>
                        Create
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AddItemView;