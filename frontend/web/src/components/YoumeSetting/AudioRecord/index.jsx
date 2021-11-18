import React,{useState, useEffect} from 'react'
import Wrapper from './styles'
import {Grid, IconButton} from '@material-ui/core'
import {Mic, Stop} from '@material-ui/icons'
import AudioReactRecorder, {RecordState} from 'audio-react-recorder'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import {OPEN_CONFIRM_MODAL} from '../../../reducers/modal'
import {ENTROLL_SPEAKER_REQUEST} from '../../../reducers/user'
function App () {
  const {youmeInfo,entrollSpeakerDone} = useSelector((state) => state.user)
  const {confirmModal} = useSelector((state)=>state.modal)
  const dispatch = useDispatch()
  let [stage, setStage] = useState(0)
  let [onRecord, setOnRecord] = useState(null)
  let [recordedData,setRecordedData] = useState(null)
  let history = useHistory()
  const words = ["유미야, 오늘 루틴 알려줘", "지금 날씨 너무 좋다. 산책 가기 딱 좋은 날이야!", "오늘 내가 해야할 일이 있을까?", "내일도 잘부탁해!"]
  let [alreadyModal, setAlreadyModal] = useState(false)
  const startRecord = () =>{
    setOnRecord(RecordState.START)
  }
  const stopRecord = () =>{
    setOnRecord(RecordState.STOP)
  }

  async function onStop(audioData){
    
    
    const data = new FormData()
    
    data.append('file', audioData.blob)
    setRecordedData(data)
    entroll()
  }
  const entroll = () =>{
    dispatch({
      type:ENTROLL_SPEAKER_REQUEST,
      data : recordedData
    })
  }

  useEffect(()=>{
    if(entrollSpeakerDone){
      if(stage==3){
        dispatch({
          type:OPEN_CONFIRM_MODAL,
          message:"목소리 등록이 완료되었습니다."
        })
      }else {
        setStage(stage+1)
      }
    }
    
  },[entrollSpeakerDone])
  useEffect(()=>{
    if(!confirmModal){
      if(!alreadyModal){
        setAlreadyModal(true)
      }else{
        history.push('/YoumeSetting')
      }
    }
  },[confirmModal])
  return(
    <Wrapper>
      {
        youmeInfo && youmeInfo.connectedSpeaker?
        <Grid xs={12}>
        <AudioReactRecorder state={onRecord} onStop={onStop} />
        <h3 style={{fontWeight:100}}>아래 문장을 말해주세요.</h3>
        <h3 style={{fontSize:"17px",color:'darkslateblue'}}>"{words[stage]}"</h3>
        <IconButton color="primary" aria-label="upload picture" component="span">
        {
          onRecord==RecordState.START?<Stop className='icon-btn' onClick={stopRecord}/>:<Mic className='icon-btn' onClick={startRecord}/>
        }
        </IconButton>
        </Grid>:
        <></>
      }
    </Wrapper>
  )
}
export default App;