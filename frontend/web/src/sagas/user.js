import {
  all,
  fork,
  put,
  takeLatest,
  call
} from 'redux-saga/effects'
import axios from 'axios'
import dotenv from 'dotenv'
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  GET_YOUME_INFO_SUCCESS,
  GET_YOUME_INFO_REQUEST,
  GET_YOUME_INFO_FAILURE,
  CREATE_SPEAKER_ID_REQUEST,
  CREATE_SPEAKER_ID_SUCCESS,
  CREATE_SPEAKER_ID_FAILURE,
  ENTROLL_SPEAKER_REQUEST,
  ENTROLL_SPEAKER_SUCCESS,
  ENTROLL_SPEAKER_FAILURE,
  DELETE_SPEAKER_REQUEST,
  DELETE_SPEAKER_SUCCESS,
  DELETE_SPEAKER_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  // FOLLOW_REQUEST,
  // FOLLOW_SUCCESS,
  // FOLLOW_FAILURE,
  // UNFOLLOW_REQUEST,
  // UNFOLLOW_SUCCESS,
  // UNFOLLOW_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  UPDATE_MY_INFO_REQUEST,
  UPDATE_MY_INFO_SUCCESS,
  UPDATE_MY_INFO_FAILURE,
  GET_TURTLEBOT_POINT_REQUEST,
  GET_TURTLEBOT_POINT_SUCCESS,
  GET_TURTLEBOT_POINT_FAILURE,
  CONNECT_YOUME_REQUEST,
  CONNECT_YOUME_SUCCESS,
  CONNECT_YOUME_FAILURE,
  DISCONNECT_YOUME_REQUEST,
  DISCONNECT_YOUME_SUCCESS,
  DISCONNECT_YOUME_FAILURE,
  // CHANGE_NICKNAME_REQUEST,
  // CHANGE_NICKNAME_SUCCESS,
  // CHANGE_NICKNAME_FAILURE,
  // LOAD_FOLLOWERS_REQUEST,
  // LOAD_FOLLOWERS_SUCCESS,
  // LOAD_FOLLOWERS_FAILURE,
  // LOAD_FOLLOWINGS_REQUEST,
  // LOAD_FOLLOWINGS_SUCCESS,
  // LOAD_FOLLOWINGS_FAILURE,
  // REMOVE_FOLLOWER_REQUEST,
  // REMOVE_FOLLOWER_SUCCESS,
  // REMOVE_FOLLOWER_FAILURE,
  // LOAD_USER_REQUEST,
  // LOAD_USER_SUCCESS,
  // LOAD_USER_FAILURE,
} from '../reducers/user'
import {
  OPEN_CONFIRM_MODAL
} from '../reducers/modal'
// function loadFollowersAPI(data) {
//   return axios.get('/user/followers', data)
// }

// function* loadFollowers(action) {
//   try {
//       const result = yield call(loadFollowersAPI, action.data)
//       yield put({
//           type: LOAD_FOLLOWERS_SUCCESS,
//           data: result.data
//       })
//   } catch (err) {
//       yield put({
//           type: LOAD_FOLLOWERS_FAILURE,
//           error: err.response.data
//       })
//   }
// }

// function removeFollowerAPI(data) {
//   return axios.delete(`/user/follower/${data}`)
// }

// function* removeFollower(action) {
//   try {
//       const result = yield call(removeFollowerAPI, action.data)
//       yield put({
//           type: REMOVE_FOLLOWER_SUCCESS,
//           data: result.data
//       })
//   } catch (err) {
//       yield put({
//           type: REMOVE_FOLLOWER_FAILURE,
//           error: err.response.data
//       })
//   }
// }

// function loadFollowingsAPI(data) {
//   return axios.get('/user/followings', data)
// }

// function* loadFollowings(action) {
//   try {
//       const result = yield call(loadFollowingsAPI, action.data)
//       yield put({
//           type: LOAD_FOLLOWINGS_SUCCESS,
//           data: result.data
//       })
//   } catch (err) {
//       yield put({
//           type: LOAD_FOLLOWINGS_FAILURE,
//           error: err.response.data
//       })
//   }
// }

// function changeNicknameAPI(data) {
//   return axios.patch('/user/nickname', { nickname: data })
// }

// function* changeNickname(action) {
//   try {
//       const result = yield call(changeNicknameAPI, action.data)
//       yield put({
//           type: CHANGE_NICKNAME_SUCCESS,
//           data: result.data
//       })
//   } catch (err) {
//       yield put({
//           type: CHANGE_NICKNAME_FAILURE,
//           error: err.response.data
//       })
//   }
// }

function loadMyInfoAPI() {
  return axios.get('/user')
}

function* loadMyInfo(action) {
  try {
      const result = yield call(loadMyInfoAPI)
      yield put({
          type: LOAD_MY_INFO_SUCCESS,
          data: result.data
      })
  } catch (err) {
      yield put({
          type: LOAD_MY_INFO_FAILURE,
          error: err.response.data
      })
  }
}

function updateMyInfoAPI(data) {
  return axios.put('/user/profile', data)
}

function* updateMyInfo(action) {
  try {
      yield call(updateMyInfoAPI, action.data)
      yield put({
          type: UPDATE_MY_INFO_SUCCESS,
          data: action.data
      })
      yield put({
        type:OPEN_CONFIRM_MODAL,
        message: '정보 수정이 완료되었습니다.'
      })
  } catch (err) {
      yield put({
          type: UPDATE_MY_INFO_FAILURE,
          error: err.response.data
      })
      yield put({
        type:OPEN_CONFIRM_MODAL,
        message: '중복된 닉네임입니다. 변경 후 시도해주세요.'
      })
  }
}

// function loadUserAPI(data) {
//   return axios.get(`/user/${data}`);
// }

// function* loadUser(action) {
//   try {
//       const result = yield call(loadUserAPI, action.data);
//       yield put({
//           type: LOAD_USER_SUCCESS,
//           data: result.data,
//       });
//   } catch (err) {
//       console.error(err);
//       yield put({
//           type: LOAD_USER_FAILURE,
//           error: err.response.data,
//       });
//   }
// }

// function followAPI(data) {
//   return axios.patch(`/user/${data}/follow`)
// }

// function* follow(action) {
//   try {
//       const result = yield call(followAPI, action.data)
//       yield put({
//           type: FOLLOW_SUCCESS,
//           data: result.data
//       })
//   } catch (err) {
//       yield put({
//           type: FOLLOW_FAILURE,
//           error: err.response.data
//       })
//   }
// }

// function unfollowAPI(data) {
//   return axios.delete(`/user/${data}/follow`)
// }

// function* unfollow(action) {
//   try {
//       const result = yield call(unfollowAPI, action.data)
//       yield put({
//           type: UNFOLLOW_SUCCESS,
//           data: result.data,
//       })
//   } catch (err) {
//       yield put({
//           type: UNFOLLOW_FAILURE,
//           error: err.response.data,
//       })
//   }
// }

function logInAPI(data) {
  return axios.post('/user/login', data)
}

function* logIn(action) {
  try {
      const result = yield call(logInAPI, action.data)
      yield put({
          type: LOG_IN_SUCCESS,
          data: result.data
      })
  } catch (err) {
      yield put({
          type: LOG_IN_FAILURE,
          error: err.response.data
      })
  }
}

function getYoumeInfoAPI(){
  return axios.get('/UsersYoume/')
}
function* getYoumeInfo(){
  try{
    const result = yield call(getYoumeInfoAPI)
    yield put({
      type:GET_YOUME_INFO_SUCCESS,
      data : result.data
    })
  }catch(err){
    yield put({
      type: GET_YOUME_INFO_FAILURE,
      error: err.response.data
    })
  }
}
function logOutAPI() {
  return axios.post('/user/logout')
}

function* logOut() {
  try {
      yield call(logOutAPI)
      yield put({
          type: LOG_OUT_SUCCESS,
      })
  } catch (err) {
      yield put({
          type: LOG_OUT_FAILURE,
          error: err.response.data
      })
  }
}

function signUpAPI(data) {
  return axios.post('/user/join', data)
}

function* signUp(action) {
  try {
      yield call(signUpAPI, action.data)
      yield put({
          type: SIGN_UP_SUCCESS,
      })
  } catch (err) {
      yield put({
          type: SIGN_UP_FAILURE,
          error: err.response.data
      })
  }
}
function createSpeakerIdAPI(){
  return axios.post('/usersYoume/profile')
}
function* createSpeakerId(){
  try{
    const result = yield call(createSpeakerIdAPI)
    yield put({
      type: CREATE_SPEAKER_ID_SUCCESS,
      data : result
    })
  }catch(err){
    yield put({
      type:CREATE_SPEAKER_ID_FAILURE,
      error: err
    })
  }
}
function entrollSpeakerAPI(data){
  return axios.post('/usersYoume/entroll',
  data,
  )
}
function* entrollSpeaker(action){
  try{
    const result = yield call(entrollSpeakerAPI, action.data)
    yield put({
      type:ENTROLL_SPEAKER_SUCCESS,
      data: result
    })
  }catch(err){
    yield put({
      type:ENTROLL_SPEAKER_FAILURE,
      error:err
    })
  }
}

function deleteSpeakerAPI(){
  return axios.delete('/usersYoume/profile')
}
function* deleteSpeaker(){
  try{
    const result = yield call(deleteSpeakerAPI)
    yield put({
      type:DELETE_SPEAKER_SUCCESS,
      data:result
    })
  }catch(err){
    yield put({
      type:DELETE_SPEAKER_FAILURE,
      error:err
    })
  }
}

function getTurtlebotPointAPI(data){
  console.log("hello")
  return axios.get('/turtlebotPoint/'+data)
}
function* getTurtlebotPoint(action){
  try{
    const result = yield call(getTurtlebotPointAPI, action.data)
    yield put({
      type:GET_TURTLEBOT_POINT_SUCCESS
    })
  }catch(err){
    yield put({
      type:GET_TURTLEBOT_POINT_FAILURE,
      error:err
    })
  }
}

function connectYoumeAPI(data){
  return axios.put('/usersYoume/connect', {id:data})
}
function* connectYoume(action){
  try{
    yield call(connectYoumeAPI, action.data)
    yield put({
      type:CONNECT_YOUME_SUCCESS,
      data:action.data
    })
  }catch(err){
    yield put({
      type:CONNECT_YOUME_FAILURE,
      error:err
    })
  }
}
function disconnectYoumeAPI(){
  return axios.put('/usersYoume/disconnect',)
}
function* disconnectYoume(){
  try{
    yield call(disconnectYoumeAPI)
    yield put({
      type:DISCONNECT_YOUME_SUCCESS,
    })
  }catch(err){
    yield put({
      type:DISCONNECT_YOUME_FAILURE,
      error:err
    })
  }
}
// function* watchRemoveFollower() {
//   yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower)
// }

// function* watchLoadFollowers() {
//   yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers)
// }

// function* watchLoadFollowings() {
//   yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings)
// }

// function* watchChangeNickname() {
//   yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname)
// }

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
}

function* watchUpdateMyInfo() {
  yield takeLatest(UPDATE_MY_INFO_REQUEST, updateMyInfo)
}

// function* watchLoadUser() {
//   yield takeLatest(LOAD_USER_REQUEST, loadUser);
// }

// function* watchFollow() {
//   yield takeLatest(FOLLOW_REQUEST, follow)
// }

// function* watchUnfollow() {
//   yield takeLatest(UNFOLLOW_REQUEST, unfollow)
// }

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}
function* watchGetYoumeInfo(){
  yield takeLatest(GET_YOUME_INFO_REQUEST, getYoumeInfo)
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function* watchCreateSpeakerId(){
  yield takeLatest(CREATE_SPEAKER_ID_REQUEST, createSpeakerId)
}

function* watchEntrollSpeaker(){
  yield takeLatest(ENTROLL_SPEAKER_REQUEST, entrollSpeaker)
}
function* watchDeleteSpeaker(){
  yield takeLatest(DELETE_SPEAKER_REQUEST, deleteSpeaker)
}
function* watchGetTurtlebotPoint(){
  yield takeLatest(GET_TURTLEBOT_POINT_REQUEST,getTurtlebotPoint)
}

function* watchConnectYoume(){
  yield takeLatest(CONNECT_YOUME_REQUEST,connectYoume)
}
function* watchDisconnectYoume(){
  yield takeLatest(DISCONNECT_YOUME_REQUEST,disconnectYoume)
}
export default function* userSaga() {
  yield all([
      fork(watchLogIn),
      fork(watchLogOut),
      fork(watchSignUp),
      fork(watchGetYoumeInfo),
      fork(watchCreateSpeakerId),
      fork(watchEntrollSpeaker),
      fork(watchDeleteSpeaker),
      // fork(watchFollow),
      // fork(watchUnfollow),
      // fork(watchLoadUser),
      fork(watchLoadMyInfo),
      fork(watchUpdateMyInfo),
      fork(watchGetTurtlebotPoint),
      fork(watchConnectYoume),
      fork(watchDisconnectYoume),
      // fork(watchChangeNickname),
      // fork(watchLoadFollowers),
      // fork(watchLoadFollowings),
      // fork(watchRemoveFollower),
  ])
}