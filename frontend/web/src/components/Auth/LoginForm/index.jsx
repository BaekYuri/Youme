import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Grid,
  Typography,
  Divider,
  TextField,
  Container,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';

import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_SIGN_UP_MODE, loginRequestAction, GET_YOUME_INFO_REQUEST } from '../../../reducers/user';
import { OPEN_CONFIRM_MODAL } from '../../../reducers/modal';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const regExpEm = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regExpPw = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

const LoginForm = () => {
  const dispatch = useDispatch()
  const { logInDone, logInError, getYoumeInfoDone, me, youmeInfo } = useSelector((state) => state.user)

  const [email, setEmail] = useState('')
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [])

  const [password, setPassword] = useState('')
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [])

  const [showPassword, setShowPassword] = useState(false)
  const onChangeShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

  const handleMouseDownPassword = useCallback((e) => {
    e.preventDefault();
  }, []);

  const [disabled, setDisabled] = useState(true)

  const onLogin = useCallback(() => {
    if (!password || !email) {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: '이메일 또는 비밀번호를 입력해주세요.'
      })
      return;
    }

    if (!regExpEm.test(email)) {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: '이메일 형식에 맞게 입력해주세요.'
      })
      return;
    }

    if (!regExpPw.test(password)) {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: '비밀번호는 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력하세요.'
      })
      return
    }

    dispatch(loginRequestAction({email, password}))
  }, [email, password, dispatch])

  const onChangeSignupMode = useCallback(() => {
    dispatch({
      type: CHANGE_SIGN_UP_MODE
    })
  }, [dispatch]) 

  useEffect(() => {
    if (email !== '' && password !== '') {
      setDisabled(false);
    }

    if (email === '' || password === '') {
      setDisabled(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (logInDone) {
      dispatch({
        type : GET_YOUME_INFO_REQUEST
      })
    }
    if (logInError) {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: logInError
      })
    }
  }, [logInDone, logInError,getYoumeInfoDone, dispatch])

  return (
    <Container maxWidth="xs" style={{margin: '0 20px', padding: '20px', background: '#ffffff', border: 'solid 1px #eeeeee', borderRadius: '10px', boxShadow: '2px 2px 2px #eeeeee'}}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        className="grid"
      >
 
        <Grid item xs={1} >
          <AccountBoxRoundedIcon color="action" fontSize='large' style={{marginTop:'6px'}} />
        </Grid>
        <Grid item xs={11}>
          <h3 style={{marginLeft:'10px'}}>
            로그인
          </h3>
        </Grid>
        <Grid item xs={12}style={{fontFamily: 'SCDream4'}}>
          <TextField
            id="outlined-required"
            label="이메일"
            className="text-field"
            defaultValue={email}
            variant="outlined"
            InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}
            fullWidth
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12} style={{fontFamily: 'SCDream4'}}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" style={{fontFamily: 'SCDream4'}}>비밀번호</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="비밀번호"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              defaultValue={password}
              variant="outlined"
              fullWidth
              onChange={onChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onChangeShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} className="grid-item">
          <Button
            variant="contained"
            disabled={disabled}
            fullWidth={true}
            color="primary"
            onClick={onLogin}
            className="grid-item-button"
            style={{fontFamily: 'SCDream4'}}
          >
            login
          </Button>
        </Grid>
        <Grid item xs={12} className="grid-item">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <Grid item xs={5}>
              <Divider />
            </Grid>

            <Grid item xs={2}>
              <Typography align="center" className="grid-item-typography1">
                or
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item xs={3} >
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <img src="/images/naver.png" alt="" width="40px"/>
          </Grid>
        </Grid>
        <Grid item xs={3} >
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <img src="/images/facebook.png" alt="" width="40px" />
          </Grid>
        </Grid>
        <Grid item xs={3} >
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <img src="/images/google.png" alt="" width="40px" />
          </Grid>
        </Grid>
        <Grid item xs={3} >
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <img src="/images/kakao.png" alt="" width="40px" />
          </Grid>
        </Grid> */}

        <Grid item xs={6} >
          <div style={{textAlign: 'center'}}>
            계정이 없으신가요?
          </div>
        </Grid>

        <Grid item xs={6} >
          <Button
            fullWidth={true}
            onClick={onChangeSignupMode}
            className="grid2-item-button"
          >
            회원가입
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginForm