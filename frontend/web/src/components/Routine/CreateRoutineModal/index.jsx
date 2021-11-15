import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DayOfWeek from './DayOfWeek/index';
import DayTimeInput from './DayTimeInput/index';
import Switch from '../../../common/Switch';
import {Close} from '@material-ui/icons';
import {connect, useDispatch, useSelector} from 'react-redux';
import { CLOSE_CREATE_ROUTINE_MODAL, OPEN_ALERT_MODAL, OPEN_CONFIRM_MODAL, SET_ALERT_MODAL_FUNCTION } from '../../../reducers/modal';
import { ADD_ROUTINE_REQUEST, SET_MODAL_INPUT_NAME, SET_MODAL_INPUT_ALARM, SET_MODAL_INPUT_ACTIVE_DAY, MODIFY_ROUTINE_REQUEST} from '../../../reducers/routine';
function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    overflow:'auto'
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width:400,
    backgroundColor: '#E5E3E3',
    border: '1px solid #66A091',
    boxShadow: theme.shadows[5],
    padding: '16px',
    borderRadius:'10px',
    maxWidth:'90%',
    maxHeight:'90%'
  },
  day:{
    textAlign: 'center',
    marginBottom:'10px'
  },
  text:{
    textAlign: "center",
    marginBottom: "10px"
  },
  inputDiv:{
    backgroundColor:'white',
    padding:'10px',
    borderRadius:'10px',
    marginBottom:'10px',
    width:'100%',
    border:'#66A091 1px solid'
  },
  buttonRight:{
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
    marginTop:'10px',
  },
  floatRight:{
    float:'right',
    color: 'lightgray',
  },
  switch:{
    marginTop: '-7px',
  }
}));

function SimpleModal(props) {
  const dispatch = useDispatch()
  const { createRoutineModal } = useSelector((state) => state.modal)
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const { createRoutineInfo, choosedRoutine } = useSelector((state) => state.routine);
  const dayName = ['월','화','수','목','금','토','일'];

  //모달 닫는 함수
  const handleClose = () => {
    dispatch({type:CLOSE_CREATE_ROUTINE_MODAL});
  };

  const changeDayClicked =(idx) =>{
    let tempClicked = Object.assign({},createRoutineInfo.active_day_of_week[idx]);
    tempClicked.active = !tempClicked.active;
    // console.log({type: SET_MODAL_INPUT_ACTIVE_DAY, activeDay: tempClicked, "idx":idx })
    dispatch({type: SET_MODAL_INPUT_ACTIVE_DAY, activeDay: tempClicked, "idx":idx });
  };

  const changeName = (e) =>{
    dispatch({type:SET_MODAL_INPUT_NAME, name: e.target.value});
  }

  const changeAlarm = (e) =>{
    dispatch({type:SET_MODAL_INPUT_ALARM, checked : e.target.checked});
  }

  const changeTimeInfo = (e, idx) =>{
    createRoutineInfo.active_day_of_week[idx].start_time = e.target.value
  }
  
  const add = () =>{
    if(validate()){
      if(choosedRoutine === -1){
        dispatch({
          type: ADD_ROUTINE_REQUEST,
          data: {
            name: createRoutineInfo.name,
            alarm: createRoutineInfo.alarm,
            "active_day_of_week": createRoutineInfo.active_day_of_week
          }
          
        })
      } else {
        dispatch({
          type:MODIFY_ROUTINE_REQUEST,
          data:{
            name: createRoutineInfo.name,
            alarm: createRoutineInfo.alarm,
            "active_day_of_week": createRoutineInfo.active_day_of_week
          },
          id: createRoutineInfo.id
        });
      }
      handleClose()
    }
    
  }

  function setAdd(){
    if(validate()){
      dispatch({type: SET_ALERT_MODAL_FUNCTION, alertModalFunction: add})
      if(choosedRoutine === -1){
        dispatch({type: OPEN_ALERT_MODAL, message:'루틴을 생성하시겠습니까?'})
      }else{
        dispatch({type: OPEN_ALERT_MODAL, message:'루틴을 수정하시겠습니까?'})
      }
    }
  }
  const validate = () =>{
    let titlesKorean = ['루틴 이름을']
    let titlesEnglish =['name']
    for(let i=0;i<titlesKorean.length;i++){
      if(!createRoutineInfo[titlesEnglish[i]]){
        dispatch({
          type:OPEN_CONFIRM_MODAL,
          message:titlesKorean[i]+' 입력해주세요.'
        })
        return false;
      }
    }
    for(let item of createRoutineInfo.active_day_of_week){
      if(item.active){
        return true;
      }
    }
    dispatch({
      type:OPEN_CONFIRM_MODAL,
      message:'요일을 하나 이상 선택해주세요.'
    })
    return false;
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
            <div>
           <h2 id="simple-modal-title" style={{marginBottom: "10px", float:'left'}}>루틴 {choosedRoutine===-1?'생성':'수정'}</h2><Close onClick={handleClose} style={{float:'right'}}></Close>
           </div>
           <div>
           <input type="text" placeholder="루틴 이름 입력" className={classes.inputDiv} onChange={changeName} defaultValue={createRoutineInfo.name} maxLength='50'></input>
            <div className={classes.day}>
                {
                  dayName.map((str, idx) => (
                    <DayOfWeek key={idx} dayName={str} clicked={createRoutineInfo.active_day_of_week[idx].active} onClick={()=>{changeDayClicked(idx);}}></DayOfWeek>
                  ))
                }
              </div>
            <div className={classes.inputDiv}>
                <h3 className={classes.text}>시작 시간을 선택해주세요.</h3>
                {
                  dayName.map((str, idx) => (
                    <DayTimeInput dayName={str} key={idx} idx = {idx} clicked={createRoutineInfo.active_day_of_week[idx].active} timeInfo={createRoutineInfo.active_day_of_week[idx].start_time} change={changeTimeInfo}/>
                  ))
                }   
              </div>
              <div className={classes.inputDiv}>
                <span className={classes.text}>알림</span><div className={classes.floatRight}><Switch className={classes.switch} onChange={changeAlarm} defaultChecked={createRoutineInfo.alarm}/></div>
              </div>
              </div>
        <div className={classes.buttonDiv}>
          {/* <button className={classes.buttonLeft +' btn'} onClick={handleClose}>취소</button> */}
          <button className={classes.buttonRight +' btn'} onClick = {setAdd}>완료</button>
        </div>
    </div>
  );

  return (
    <Modal
      open={createRoutineModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}


const mapStateToProps = (state) =>{
  return {
      state
  }
}
export default connect(mapStateToProps)(SimpleModal);