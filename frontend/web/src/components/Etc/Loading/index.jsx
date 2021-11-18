import React from 'react';
import {CircularProgress, Modal, Box} from '@material-ui/core';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'none',
    border: 'none',
  };
function App (props) {
  return(
        <Modal
            open={props.open}
        >
            <Box sx={{ ...style }}>
            <CircularProgress />
            </Box>
        </Modal>
  )
}
export default App;