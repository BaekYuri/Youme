// react
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';

// import store from './redux';
import store, { persistor } from './store/configureStore'
import { PersistGate } from 'redux-persist/integration/react';
import { CLEAR_MODAL } from './reducers/modal';
import { useDispatch } from 'react-redux';
// page
import RoutineSetting from './pages/RoutineSetting/';
import HabitSetting from './pages/HabitSetting/';
import Home from './pages/Home/';
import ChallengeHome from './pages/Challenge/';
import ChallengeDetail from './pages/Challenge/[id]';
import ChallengeDashboard from './pages/Challenge/ChallengeDashboard/[id]';
import CreateChallenge from './pages/Challenge/CreateChallenge';
import SearchChallenge from './pages/Challenge/SearchChallenge';
import MoreChallenges from './pages/Challenge/ChallengeMore';
import Profile from './pages/Profile/';
import YoumeSetting from './pages/YoumeSetting'
import SpeakerRecognization from './pages/SpeakerRecognization'
import ConnectYoume from './pages/ConnectYoume'
import ManageYoume from './pages/ManageYoume'
// import MirrorSetting from './pages/MirrorSetting/';
import Auth from './pages/Auth/';
// import ChangePassword from './pages/ChangePassword'
import RoutineModal from './components/Routine/RoutineModal/index';
import CreateRoutineModal from './components/Routine/CreateRoutineModal/index';
import ModifyHabitModal from './components/Habit/ModifyHabitModal/index';
import AlertModal from './components/Etc/AlertModal/index';
import ConfirmModal from './components/Etc/ConfirmModal/index';
import CreateEventModal from './components/Home/Calendar/CreateEvent/index';
import ModifyEventModal from './components/Home/Calendar/ModifyEvent/index';
import PostCodeModal from './components/Auth/PostCodeModal';

// css
import './index.css';
import ScrollToTop from './common/ScrollToTop';


const Routers = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(()=>{
    return history.listen((location)=>{
      dispatch({type:CLEAR_MODAL})
    })
  },[history])
  return (
    <Switch>
                  <Route exact path="/" component={Auth} />
                  <Route path="/Home" component={Home} />
                  <Route path="/RoutineSetting" component={RoutineSetting} />
                  <Route path="/HabitSetting" component={HabitSetting} />
                  <Route path="/ChallengeHome" component={ChallengeHome} />
                  <Route path="/CreateChallenge" component={CreateChallenge} />
                  <Route path="/SearchChallenge" component={SearchChallenge} />
                  <Route path="/ChallengeMore/:category" component={MoreChallenges} />
                  <Route path="/Profile" component={Profile} />
                  <Route path="/Challenge/:challengeId" component={ChallengeDetail} />
                  <Route path="/ChallengeDashboard/:challengeId" component={ChallengeDashboard} />
                  <Route path="/YoumeSetting" component={YoumeSetting} />
                  <Route path="/ManageYoume" component={ManageYoume}/>
                  <Route path="/ConnectYoume" component={ConnectYoume}/>
                  <Route path="/SpeakerRecognization" component={SpeakerRecognization}/>
              </Switch>
  )
}
// app
const App = () => {
  return (
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor} >
          <BrowserRouter>
            <ScrollToTop>
              <Routers/>
            </ScrollToTop>
          </BrowserRouter>
          <RoutineModal/>
          <CreateRoutineModal/>
          <ModifyHabitModal/>
          <AlertModal/>
          <ConfirmModal/>
          <CreateEventModal/>
          <PostCodeModal/>
          <ModifyEventModal/>
      </PersistGate>
    </Provider>
  );
};

export default App;
