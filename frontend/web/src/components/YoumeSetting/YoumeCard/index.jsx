import React, {useEffect} from 'react';
import Wrapper from './styles';
import { useHistory } from 'react-router-dom';
import Loading from '../../Etc/Loading/index'
import {List, ListItem, ListItemText, Divider, ListSubheader} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux'
import {CREATE_SPEAKER_ID_REQUEST, DELETE_SPEAKER_REQUEST, CLEAR_CREATE_SPEAKER_ID, CLEAR_DELETE_SPEAKER_ID, DISCONNECT_YOUME_REQUEST} from '../../../reducers/user'
import {SET_ALERT_MODAL_FUNCTION, OPEN_ALERT_MODAL} from '../../../reducers/modal'
function App () {
  let {youmeInfo, createSpeakerIdDone, deleteSpeakerDone, createSpeakerIdLoading, deleteSpeakerLoading} = useSelector((state)=> state.user)
  const history = useHistory()
  const dispatch = useDispatch()
  const move = (link) =>{
    history.push(link)
  }

  const speaker = () =>{
    if(!youmeInfo.connectedSpeaker){ //연결된 상태일 때
      dispatch({type: SET_ALERT_MODAL_FUNCTION, alertModalFunction: createSpeaker})
      dispatch({type: OPEN_ALERT_MODAL, message:'목소리 인식을 등록하시겠습니까?'})
    }else{
      dispatch({type: SET_ALERT_MODAL_FUNCTION, alertModalFunction: deleteSpeaker})
      dispatch({type: OPEN_ALERT_MODAL, message:'목소리 인식을 삭제하시겠습니까?'})
    }
  }
  const createSpeaker = () =>{
    dispatch({
      type:CREATE_SPEAKER_ID_REQUEST
    })
  }
  const deleteSpeaker = () =>{
    dispatch({
      type:DELETE_SPEAKER_REQUEST
    })
  }
  useEffect(()=>{
    if(createSpeakerIdDone){
      dispatch({
        type:CLEAR_CREATE_SPEAKER_ID
      })
      move('/SpeakerRecognization')
    }
    if(deleteSpeakerDone){
      dispatch({
        type:CLEAR_DELETE_SPEAKER_ID
      })
    }
  },[createSpeakerIdDone,deleteSpeakerDone])

  const youme = () =>{
    if(youmeInfo.connectedYoume){
      dispatch({type: SET_ALERT_MODAL_FUNCTION, alertModalFunction: disconnect})
      dispatch({type: OPEN_ALERT_MODAL, message:'연결을 해제하시겠습니까?'})
    }else{
      move('/ConnectYoume')
    }
  }

  const disconnect = () =>{
    dispatch({
      type:DISCONNECT_YOUME_REQUEST
    })
  }
  return(
    <Wrapper>
        <List>
              <ListSubheader>유미(YOUME)</ListSubheader>
              <ListItem onClick={youme}>
                  <ListItemText primary="유미(YOUME) 연결" secondary={youmeInfo && youmeInfo.connectedYoume?youmeInfo.YoumeId:"연결 안함"}/>
              </ListItem>
              <Divider/>
              <ListSubheader>목소리 인식</ListSubheader>
            <ListItem onClick={speaker}>
                  <ListItemText primary="목소리 인식" secondary={youmeInfo && youmeInfo.connectedSpeaker?"사용 중":"사용하지 않음"}/>
              </ListItem>
              <ListItem disabled={!youmeInfo || !youmeInfo.connectedSpeaker} onClick={()=>{if(youmeInfo && youmeInfo.connectedSpeaker) move('/SpeakerRecognization')}}>
              <ListItemText primary="목소리 인식 강화"/>
              </ListItem>
        </List>
        <Loading open={createSpeakerIdLoading || deleteSpeakerLoading}/>
    </Wrapper>
  )
}
export default App;