import React,{useState,useEffect}  from 'react';
import Layout from '../../layout';
import Wrapper from './styles';
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, CardMedia, CardHeader, CardContent, Divider, CardActions } from '@material-ui/core';
import {Stop, Policy, Explore, FitnessCenter, LocalCafe, KingBed, CropPortrait, DesktopMac} from '@material-ui/icons'
import { OPEN_CONFIRM_MODAL } from '../../reducers/modal';
import { useHistory } from 'react-router';
import { backUrl } from '../../config/config';
const socket = socketIOClient(backUrl)
function App () {
  const dispatch = useDispatch()
  const history = useHistory()
  const {youmeInfo, turtlebotPoint} = useSelector((state) => state.user)
  const mode = ["정지", "순찰 모드", "자유 모드", "운동", "이동 중"]

  const [nowMode,setNowMode] = useState(0)
  useEffect(()=>{
    if(youmeInfo && youmeInfo.connectedYoume){
      socket.emit("roomjoin", youmeInfo.YoumeId);
      socket.emit("sendNowMode", youmeInfo.YoumeId);
    }
    socket.on("getNowMode",function(data){
      setNowMode(data)
    })

    socket.on("getTurtlebotMsg", function(data){
      dispatch({type:OPEN_CONFIRM_MODAL, message:data})
    })
  })
  const send =(msg)=>{
    if(youmeInfo.connectedYoume)
      socket.emit("turtlebot", {id : youmeInfo.YoumeId, data : msg})
  }
  const goSomewhere = (where) =>{
    if(youmeInfo.connectedYoume)
      socket.emit("goSomewhere", {id : youmeInfo.YoumeId, data : where})
  }
  return(
    <Wrapper>
      <Layout>
        <div className='menu daily-menu'><h3>유미(YOUME) 관리</h3></div>
        <hr/>
        {
          youmeInfo && youmeInfo.connectedYoume?
          <Card>
            <CardContent>
              <h2>나의 유미</h2>
              <p>{youmeInfo?youmeInfo.YoumeId:""}</p>
            </CardContent>
            <CardMedia
              component="img"
              height="194"
              image="https://img.khan.co.kr/news/2021/07/21/l_2021072101002799900235801.jpg"
              alt="Paella dish"
            />
            <CardContent>
              <h3>모드 변경</h3>
              <Divider/>
              <div className='button-div'>
              <Button className={nowMode==0?"selected":""} variant={nowMode==0?"contained":"outlined"} onClick={()=>{send(0)}} startIcon={<Stop/>}>정지</Button>
              <Button className={nowMode==1?"selected":""} variant={nowMode==1?"contained":"outlined"} onClick={()=>{send(1)}} disabled={!turtlebotPoint} startIcon={<Policy/>}>순찰</Button>
              <Button className={nowMode==2?"selected":""} variant={nowMode==2?"contained":"outlined"} onClick={()=>{send(2)}} startIcon={<Explore/>}>자유</Button>
              <Button className={nowMode==3?"selected":""} variant={nowMode==3?"contained":"outlined"} onClick={()=>{send(3)}} startIcon={<FitnessCenter/>}>운동</Button>
              </div>
              <h3>유미 호출</h3>
              <Divider/>
              <div className='button-div'>
              <Button variant="outlined" onClick={()=>{goSomewhere(0)}} disabled={!turtlebotPoint} startIcon={<KingBed/>}>침대</Button>
              <Button variant="outlined" onClick={()=>{goSomewhere(1)}} disabled={!turtlebotPoint} startIcon={<LocalCafe/>}>커피머신</Button>
              <Button variant="outlined" onClick={()=>{goSomewhere(2)}} disabled={!turtlebotPoint} startIcon={<CropPortrait/>}>스마트미러</Button>
              <Button variant="outlined" onClick={()=>{goSomewhere(3)}} disabled={!turtlebotPoint} startIcon={<DesktopMac/>}>작업공간</Button>
              </div>
              {
                !turtlebotPoint?
                <p>※ 순찰 모드 및 유미 호출은 rviz에서 좌표를 저장한 후에 이용 가능합니다.</p>
                :
                <></>
              }
            </CardContent>
          </Card>
          :
          <Card>
            <CardContent>
              <h3 style={{paddingTop:20, paddingBottom:20}}>유미를 먼저 등록해주세요.</h3>
            </CardContent>
            <CardActions style={{justifyContent: "end"}}>
            <Button color="primary"onClick={()=>{history.push("/YoumeSetting")}}>바로가기</Button>
            </CardActions>
          </Card>
        }
        
      </Layout>
    </Wrapper>
  )
}
export default App;