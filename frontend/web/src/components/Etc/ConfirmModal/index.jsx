import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {useDispatch, useSelector} from 'react-redux';
import { CLOSE_CONFIRM_MODAL } from '../../../reducers/modal';
function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#E5E3E3',
    border: '1px solid #66A091',
    boxShadow: theme.shadows[5],
    padding: "40px",
    borderRadius:'10px',
    maxWidth:'90%',
    maxHeight:'90%',
  },
  message:{
    fontSize: "18px",
    textAlign: "center"
  },
  button:{
    width: '100%',
    border: 'none',
    padding: '5px',
    borderRadius: '20px',
    height:'40px',
    backgroundColor: '#89DDBF',
    color:'white',
    fontWeight:'bold'
  },
  buttonDiv:{
    marginTop:'20px',
    textAlign:'center'
  },
}));

function SimpleModal(props) {
  const dispatch = useDispatch()
  const {confirmModal, alertModalMessage} = useSelector((state) =>state.modal)
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  //모달 닫는 함수
  function closeModal(){
    dispatch({
      type: CLOSE_CONFIRM_MODAL
    })
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <div className={classes.message}>{alertModalMessage}</div>
            <div className={classes.buttonDiv}>
            <button className={classes.button} onClick={closeModal}>확인</button>
        </div>
    </div>
  );

  return (
    <Modal
        open={confirmModal}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
  );
}

export default SimpleModal;