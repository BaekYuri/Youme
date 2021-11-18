import React,{useState,useEffect}  from 'react';
import Layout from '../../layout';
import Wrapper from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, CardMedia, CardContent, Divider, CardActions, Input } from '@material-ui/core';
import { useHistory } from 'react-router';
import Loading from '../../components/Etc/Loading'
import {CLEAR_CONNECT_YOUME, CONNECT_YOUME_REQUEST} from '../../reducers/user'
import {OPEN_CONFIRM_MODAL} from '../../reducers/modal'
function App () {
  const dispatch = useDispatch()
  const history = useHistory()
  const [youmeId, setYoumeId] = useState("")
  const { connectYoumeLoading,connectYoumeDone} = useSelector((state) => state.user)
  useEffect(()=>{
    if(connectYoumeDone){
      dispatch({
        type:CLEAR_CONNECT_YOUME
      })
      history.push('/YoumeSetting')
    }
  },[connectYoumeDone])
  
  const connect = ()=>{
    if(!youmeId){
      dispatch({
        type:OPEN_CONFIRM_MODAL,
        message:"모델명을 입력해주세요."
      })
      return
    }
      dispatch({
        type:CONNECT_YOUME_REQUEST,
        data:youmeId
      })
    
  }
  return(
    <Wrapper>
      <Layout>
        <div className='menu daily-menu'><h3>유미(YOUME) 연결</h3></div>
        <hr/>
        <Card>
          <CardContent>
            <h4 style={{paddingTop:20, paddingBottom:20}}>유미 기기에 적혀있는 모델명을 적어주세요.</h4>
            <Input fullWidth onChange={(e) =>{setYoumeId(e.target.value)}}></Input>
          </CardContent>
          <CardActions style={{justifyContent: "end"}}>
            <Button color="primary" onClick={connect}>연결</Button>
          </CardActions>
        </Card>
        <Loading open={connectYoumeLoading}/>
      </Layout>
    </Wrapper>
  )
}
export default App;