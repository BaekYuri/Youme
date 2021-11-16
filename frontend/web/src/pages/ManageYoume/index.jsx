import React,{useState,useEffect}  from 'react';
import Layout from '../../layout';
import Wrapper from './styles';
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, CardMedia, CardContent, Divider, CardActions, Table, TableHead, TableBody, TableCell, Grid, TableRow ,LinearProgress, Box} from '@material-ui/core';
import {Stop, Policy, Explore, FitnessCenter, LocalCafe, KingBed, CropPortrait, DesktopMac} from '@material-ui/icons'
import { OPEN_CONFIRM_MODAL } from '../../reducers/modal';
import { useHistory } from 'react-router';
import { socketUrl } from '../../config/config';
const socket = socketIOClient(socketUrl+'/a203a')

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
          {props.text}
      </Box>
    </Box>
  );
}
function App () {
  const dispatch = useDispatch()
  const history = useHistory()
  const {youmeInfo, turtlebotPoint, familiarityLevel} = useSelector((state) => state.user)
  const mode = ["정지", "순찰 모드", "자유 모드", "운동", "이동 중"]
  const levelMsg = ["","아직은 조금 서먹한 사이에요.","유미가 당신을 보고싶어해요.","유미와 둘도 없는 사이에요."]
  const [nowMode,setNowMode] = useState(0)
  const [battery, setBattery] = useState(0)
  useEffect(()=>{
    if(youmeInfo && youmeInfo.connectedYoume){
      socket.emit("roomjoin", youmeInfo.YoumeId);
      socket.emit("sendNowMode", youmeInfo.YoumeId);
      socket.emit("sendBattery", youmeInfo.YoumeId);
    }
    socket.on("getNowMode",function(data){
      setNowMode(data)
    })

    socket.on("getTurtlebotMsg", function(data){
      dispatch({type:OPEN_CONFIRM_MODAL, message:data})
    })

    socket.on("battery", function(data){
      setBattery(data.toFixed(1))
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
              <h3 style={{fontSize: "1.34em"}}>나의 유미</h3>
              <p>{youmeInfo?youmeInfo.YoumeId:""}</p>
            </CardContent>
            <CardMedia
              component="img"
              height="300"
              image="images/youme.jpg"
              alt="Paella dish"
            />
            <CardContent>
              <h3>친밀도</h3>
              <Divider/>
              <Card>
                <Grid container>
                  <Grid className="familiarty" item xs={6} style={{textAlign:"center", alignSelf:"center"}}>
                    <img className="reward" src={'images/level'+familiarityLevel+'.png'} alt=''/>
                    <h3>Level {familiarityLevel}</h3>
                  </Grid>
                  <Grid className="familiarty familiarty-description" item xs={6} style={{textAlign:"center", alignSelf:"center"}}>
                    <h4 style={{fontSize:"14.4px"}}>{levelMsg[familiarityLevel]}</h4>
                    <p style={{fontSize:"13.4px"}}>유미와 대화하고 친밀도를 올려보세요!</p>
                    <LinearProgressWithLabel text={(familiarityLevel==1?youmeInfo.familiarity:(familiarityLevel==2?youmeInfo.familiarity-5:youmeInfo.familiarity-20))+' / '+(familiarityLevel==1?5:(familiarityLevel==2?15:"max"))} value={(100*(familiarityLevel==1?youmeInfo.familiarity/5:(familiarityLevel==2?(youmeInfo.familiarity-5)/15:100)))}/>
                  </Grid>
                </Grid>
              </Card>
            </CardContent>
            <CardContent>
                <h3>상태</h3>
                  <Divider/>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>속성</TableCell>
                      <TableCell>정보</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                        <TableCell>배터리</TableCell>
                        <TableCell><LinearProgressWithLabel value={battery} text={battery+'%'}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>모드</TableCell>
                        <TableCell>{mode[nowMode]}</TableCell>
                      </TableRow>
                  </TableBody>
                  </Table>
            </CardContent>
            <CardContent>
              <h3>모드 변경</h3>
              <Divider/>
              <div className='button-div'>
              <Button className={nowMode==0?"selected":""} variant={nowMode==0?"contained":"outlined"} onClick={()=>{send(0)}} startIcon={<Stop/>}>정지</Button>
              <Button className={nowMode==1?"selected":""} variant={nowMode==1?"contained":"outlined"} onClick={()=>{send(1)}} disabled={!turtlebotPoint} startIcon={<Policy/>}>순찰</Button>
              <Button className={nowMode==2?"selected":""} variant={nowMode==2?"contained":"outlined"} onClick={()=>{send(2)}} startIcon={<Explore/>}>자유</Button>
              <Button className={nowMode==3?"selected":""} variant={nowMode==3?"contained":"outlined"} onClick={()=>{send(3)}} startIcon={<FitnessCenter/>}>운동</Button>
              </div>
            </CardContent>
            <CardContent>
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