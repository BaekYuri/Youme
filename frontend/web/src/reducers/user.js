import produce from 'immer'
import { PURGE } from 'redux-persist/es/constants'

const initialState = {
  updateMyInfoLoading: false, 
  updateMyInfoDone: false,
  updateMyInfoError: null,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  getYoumeInfoLoading : false,
  getYoumeInfoDone : false,
  getYoumeInfoError : null,
  createSpeakerIdLoading : false,
  createSpeakerIdDone : false,
  createSpeakerIdError : null,
  entrollSpeakerLoading:false,
  entrollSpeakerDone:false,
  entrollSpeakerError:null,
  deleteSpeakerLoading:false,
  deleteSpeakerDone:false,
  deleteSpeakerError:null,
  connectYoumeLoading : false,
  connectYoumeDone : false,
  connectYoumeError : null,
  disconnectYoumeLoading : false,
  disconnectYoumeDone : false,
  disconnectYoumeError : null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  getTurtlebotPointLoading : false,
  getTurtlebotPointDone : false,
  getTurtlebotPointError : null,
  me: null,             // 현재 로그인한 유저 정보
  isSignUp: false,      // 로그인 폼 <-> 회원가입 폼
  youmeInfo : null,
  turtlebotPoint : false,
}

export const UPDATE_MY_INFO_REQUEST = 'UPDATE_MY_INFO_REQUEST'
export const UPDATE_MY_INFO_SUCCESS = 'UPDATE_MY_INFO_SUCCESS'
export const UPDATE_MY_INFO_FAILURE = 'UPDATE_MY_INFO_FAILURE'

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS'
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const CREATE_SPEAKER_ID_REQUEST = 'CREATE_SPEAKER_ID_REQUEST'
export const CREATE_SPEAKER_ID_SUCCESS = 'CREATE_SPEAKER_ID_SUCCESS'
export const CREATE_SPEAKER_ID_FAILURE = 'CREATE_SPEAKER_ID_FAILURE'
export const CLEAR_CREATE_SPEAKER_ID = 'CLEAR_CREATE_SPEAKER_ID'

export const ENTROLL_SPEAKER_REQUEST = 'ENTROLL_SPEAKER_REQUEST'
export const ENTROLL_SPEAKER_SUCCESS = 'ENTROLL_SPEAKER_SUCCESS'
export const ENTROLL_SPEAKER_FAILURE = 'ENTROLL_SPEAKER_FAILURE'
export const CLEAR_ENTROLL_SPEAKER_ID = 'CLEAR_ENTROLL_SPEAKER_ID'

export const DELETE_SPEAKER_REQUEST = 'DELETE_SPEAKER_REQUEST'
export const DELETE_SPEAKER_SUCCESS = 'DELETE_SPEAKER_SUCCESS'
export const DELETE_SPEAKER_FAILURE = 'DELETE_SPEAKER_FAILURE'
export const CLEAR_DELETE_SPEAKER_ID = 'CLEAR_DELETE_SPEAKER_ID'

export const GET_YOUME_INFO_REQUEST = 'GET_YOUME_INFO_REQUEST'
export const GET_YOUME_INFO_SUCCESS = 'GET_YOUME_INFO_SUCCESS'
export const GET_YOUME_INFO_FAILURE = 'GET_YOUME_INFO_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const GET_TURTLEBOT_POINT_REQUEST = 'GET_TURTLEBOT_POINT_REQUEST'
export const GET_TURTLEBOT_POINT_SUCCESS = 'GET_TURTLEBOT_POINT_SUCCESS'
export const GET_TURTLEBOT_POINT_FAILURE = 'GET_TURTLEBOT_POINT_FAILURE'

export const CONNECT_YOUME_REQUEST = 'CONNECT_YOUME_REQUEST'
export const CONNECT_YOUME_SUCCESS = 'CONNECT_YOUME_SUCCESS'
export const CONNECT_YOUME_FAILURE = 'CONNECT_YOUME_FAILURE'
export const CLEAR_CONNECT_YOUME = 'CLEAR_CONNECT_YOUME'

export const DISCONNECT_YOUME_REQUEST = 'DISCONNECT_YOUME_REQUEST'
export const DISCONNECT_YOUME_SUCCESS = 'DISCONNECT_YOUME_SUCCESS'
export const DISCONNECT_YOUME_FAILURE = 'DISCONNECT_YOUME_FAILURE'

export const CHANGE_SIGN_UP_MODE = 'CHANGE_SIGN_UP_MODE'

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data
  }
}

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST
  }
}

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case PURGE:
      return { ...initialState }
    case UPDATE_MY_INFO_REQUEST:
      draft.updateMyInfoLoading = true
      draft.updateMyInfoDone = false
      draft.updateMyInfoError = null
      break
    case UPDATE_MY_INFO_SUCCESS:
      draft.updateMyInfoLoading = false
      draft.updateMyInfoDone = true
      draft.me.age = action.data.age
      draft.me.gender = action.data.gender
      draft.me.nickname = action.data.nickname
      draft.me.phone_number = action.data.phone_number
      draft.me.post_code = action.data.post_code
      draft.me.main_address = action.data.main_address
      draft.me.sub_address = action.data.sub_address
      break
    case UPDATE_MY_INFO_FAILURE:
      draft.updateMyInfoLoading = false
      draft.updateMyInfoError = action.error
      break
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true
      draft.loadMyInfoDone = false
      draft.loadMyInfoError = null
      break
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoading = false
      draft.loadMyInfoDone = true
      draft.me = action.data
      break
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false
      draft.loadMyInfoError = action.error
      break
    case LOG_IN_REQUEST:
      draft.logInLoading = true
      draft.logInDone = false
      draft.logInError = null
      break
    case LOG_IN_SUCCESS:
      draft.logInLoading = false
      draft.logInDone = true
      draft.me = action.data
      break
    case LOG_IN_FAILURE:
      draft.logInLoading = false
      draft.logInError = action.error
      break
    case GET_YOUME_INFO_REQUEST:
      draft.getYoumeInfoLoading = true
      draft.getYoumeInfoDone = false
      draft.getYoumeInfoError = null
      break
    case GET_YOUME_INFO_SUCCESS:
      draft.getYoumeInfoLoading = false
      draft.youmeInfo = action.data
      draft.getYoumeInfoDone = true
      break
    case GET_YOUME_INFO_FAILURE:
      draft.getYoumeInfoLoading = false
      draft.getYoumeInfoError = action.error
      break
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true
      draft.logOutDone = false
      draft.logOutError = null
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false
      draft.logOutDone = true
      draft.me = null
      draft.youmeInfo = null
      // storage.removeItem('persist:root')
      break
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false
      draft.logOutError = action.error
      break
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true
      draft.signUpDone = false
      draft.signUpError = null
      break
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false
      draft.signUpDone = true
      break
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false
      draft.signUpError = action.error
      break
    case CREATE_SPEAKER_ID_REQUEST:
      draft.createSpeakerIdLoading=true
      draft.createSpeakerIdDone=false
      draft.createSpeakerIdError=null
      break
    case CREATE_SPEAKER_ID_SUCCESS:
      draft.createSpeakerIdLoading=false
      draft.createSpeakerIdDone=true
      draft.youmeInfo.connectedSpeaker = true
      draft.youmeInfo.SpeakerId = action.data
      break
    case CREATE_SPEAKER_ID_FAILURE:
      draft.createSpeakerIdLoading=false
      draft.createSpeakerIdError=action.error
      console.log(action.error)
    case CLEAR_CREATE_SPEAKER_ID:
      draft.createSpeakerIdLoading=false
      draft.createSpeakerIdDone=false
      draft.createSpeakerIdError=null
    case ENTROLL_SPEAKER_REQUEST:
      draft.entrollSpeakerLoading=true
      draft.entrollSpeakerDone=false
      draft.createSpeakerIdError=null
      break
    case ENTROLL_SPEAKER_SUCCESS:
      draft.entrollSpeakerLoading=false
      draft.entrollSpeakerDone=true
      console.log(action.data)
      break
    case ENTROLL_SPEAKER_FAILURE:
      draft.entrollSpeakerLoading=false
      draft.entrollSpeakerError=action.error
      console.log(action.error)
      break
    case CLEAR_ENTROLL_SPEAKER_ID:
      draft.entrollSpeakerLoading=false
      draft.entrollSpeakerDone=false
      draft.createSpeakerIdError=null
    case DELETE_SPEAKER_REQUEST:
      draft.deleteSpeakerLoading=true
      draft.deleteSpeakerDone=false
      draft.deleteSpeakerError=null
      break
    case DELETE_SPEAKER_SUCCESS:
      draft.deleteSpeakerDone=true
      draft.deleteSpeakerLoading=false
      draft.youmeInfo.connectedSpeaker=false
      draft.youmeInfo.SpeakerId=null
      break
    case DELETE_SPEAKER_FAILURE:
      draft.deleteSpeakerLoading=false
      draft.deleteSpeakerError=action.error
      break
    case CLEAR_DELETE_SPEAKER_ID:
      draft.deleteSpeakerLoading=false
      draft.deleteSpeakerDone=false
      draft.deleteSpeakerError=null
      break
    case CHANGE_SIGN_UP_MODE:
      draft.isSignUp = !draft.isSignUp
      break
    case GET_TURTLEBOT_POINT_REQUEST:
      draft.getTurtlebotPointLoading=true
      draft.getTurtlebotPointDone=false
      draft.getTurtlebotPointError=null
      break
    case GET_TURTLEBOT_POINT_SUCCESS:
      draft.getTurtlebotPointLoading=false
      draft.getTurtlebotPointDone=true
      draft.turtlebotPoint=true
      break
    case GET_TURTLEBOT_POINT_FAILURE:
      draft.getTurtlebotPointLoading=false
      draft.turtlebotPoint=false
      draft.getTurtlebotPointError=action.error
      break
    case CONNECT_YOUME_REQUEST:
      draft.connectYoumeLoading=true
      draft.connectYoumeDone=false
      draft.connectYoumeError=null
      break
    case CONNECT_YOUME_SUCCESS:
      draft.connectYoumeLoading=false
      draft.connectYoumeDone=true
      draft.youmeInfo.connectedYoume = true
      draft.youmeInfo.YoumeId = action.data
      break
    case CONNECT_YOUME_FAILURE:
      draft.connectYoumeLoading=false
      draft.connectYoumeError=action.error
      break
    case CLEAR_CONNECT_YOUME:
      draft.connectYoumeLoading=false
      draft.connectYoumeDone=false
      draft.connectYoumeError=null
      break
    case DISCONNECT_YOUME_REQUEST:
      draft.disconnectYoumeLoading=true
      draft.disconnectYoumeDone=false
      draft.disconnectYoumeError=null
      break
    case DISCONNECT_YOUME_SUCCESS:
      draft.disconnectYoumeLoading=false
      draft.disconnectYoumeDone=true
      draft.youmeInfo.connectedYoume = false
      draft.youmeInfo.YoumeId = null
      break
    case DISCONNECT_YOUME_FAILURE:
      draft.disconnectYoumeLoading=false
      draft.disconnectYoumeError=action.error
      break  
      default:break
  }
})

export default reducer