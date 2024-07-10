import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CustomDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpenDialog}>
        Open Dialog
      </Button>
      <Dialog open={isOpen} onClose={handleCloseDialog}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the content of the dialog.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomDialog;
