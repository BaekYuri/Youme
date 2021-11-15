import React, { useEffect, useState } from 'react';
import Layout from '../../layout/';
import {Wrapper, useStyles} from './styles';
import RefreshIcon from '@material-ui/icons/Refresh';
import TodayRoutineTab from './TodayRoutineTab/'
import MySchedule from './MySchedule/'
import { LOAD_TODAY_ROUTINES_REQUEST, SET_CHOOSED_ROUTINE } from '../../reducers/routine';
import { GET_TURTLEBOT_POINT_REQUEST } from '../../reducers/user';
import { LOAD_MY_CHALLENGES_REQUEST } from '../../reducers/challenge';
import { LOAD_EVENT_REQUEST } from '../../reducers/calendar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {LocalMoviesRounded, EventAvailableRounded} from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux';


import {Tabs, Tab, Fab} from '@material-ui/core'
import MyChallengeHome from './MyChallenge';
const App = () => {
  const {youmeInfo} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const classes = useStyles()
  let [tabValue, setTabValue] = useState(0)
  
  useEffect(() => {
    dispatch({
      type: LOAD_TODAY_ROUTINES_REQUEST
    })
    dispatch({
      type: LOAD_MY_CHALLENGES_REQUEST
    })
    dispatch({
      type: LOAD_EVENT_REQUEST
    })
    dispatch({type: SET_CHOOSED_ROUTINE, idx:-1})
    dispatch({
      type:GET_TURTLEBOT_POINT_REQUEST,
      data: youmeInfo?youmeInfo.YoumeId:""
    })
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return(
    <Layout>
      <Wrapper>
      <div>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant="fullWidth"
          classes={{
            indicator: classes.indicator,
          }}
          className='tab'
          aria-label="icon label tabs example"
        >
          <Tab className={tabValue !==0?'':'active-tab'} icon={<DashboardIcon />} label="나의 챌린지" />
          <Tab className={tabValue !==1?'':'active-tab'} icon={<LocalMoviesRounded />} label="오늘의 루틴" />
          <Tab className={tabValue !==2?'':'active-tab'} icon={<EventAvailableRounded />} label="나의 일정" />
        </Tabs>
        <div hidden={tabValue !== 0}>
          <MyChallengeHome />
        </div>
        <div hidden={tabValue !== 1}>
          <TodayRoutineTab/>
        </div>
        <div hidden={tabValue !== 2}>
          <MySchedule/>
        </div>
      </div>
      <Fab size="small" className='refresh-btn' onClick={()=>{window.location.replace("/Home")}}><RefreshIcon/></Fab>
      </Wrapper>
    </Layout>
  );
}

export default App