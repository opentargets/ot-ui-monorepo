import { useState } from 'react';
import { Button, Box } from '@mui/material';
import { Drawer } from './components';
import BlocksTreeView from './BlocksTreeView';

function TextArea({ blocks }) {
  const [value, setValue] = useState(JSON.stringify(blocks, null, 4));

  const onChangeText = e => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <textarea
      rows="40"
      cols={50}
      value={value}
      onChange={onChangeText}
      className="state-input"
    />
  );
}

function EditDrawer({ blocks, setBlocks }) {
  const [open, setOpen] = useState(false);

  const closeDrawer = () => {
    setOpen(false);
  };

  const toggleDrawer = event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(true);
  };

  const handleUpdate = () => {
    const inputValue = document.querySelector('.state-input').value;
    const objValue = JSON.parse(inputValue);
    setBlocks(objValue);
  };

  return (
    <>
      <Button variant="outlined" disableElevation onClick={toggleDrawer}>
        Edit
      </Button>
      <Drawer anchor="right" open={open} onClose={closeDrawer}>
        <Box
          marginTop={10}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <BlocksTreeView blocksState={blocks} />
        </Box>
        <Box
          marginTop={10}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TextArea blocks={blocks} />
        </Box>
        <Box
          marginTop={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="outlined" disableElevation onClick={handleUpdate}>
            Update state
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default EditDrawer;
