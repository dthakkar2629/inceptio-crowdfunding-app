import React, { useContext, useState, useEffect } from 'react';
import { Container, CssBaseline, makeStyles, Typography, TextField, Button, CircularProgress, Grid } from '@material-ui/core';
import { UserContext } from '../Contexts/userContext';
import Axios from 'axios';
import { serverUrl } from '../dummyProjectData';
import useInputState from '../Hooks/useInputState';
import { AlertContext } from '../Contexts/alertContext';
import { errorMessage } from '../utils/errorHandler';
import TimerButton from './TimerButton';

const useStyles = makeStyles( theme => ({
  inputTextField: {
    paddingTop: "2rem"
  },
  notchedOutline: {
    borderWidth: "3px",
    borderColor: "white !important"
  },
  input: {
    color: "white",
    fontWeight: 500
  }
}))

function AudienceLogin(props) {
  const classes = useStyles();
  const {setUserLocal, setTokenLocal} = useContext(UserContext);
  const [email, setEmail, resetEmail] = useInputState("");
  const [otp, setOtp, resetOtp] = useInputState("");
  const [otpSent, setOtpSent] = useState(false);
  const {setAlert} = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const sendOtp = async () => {
    try {
      setLoading(true);
      const response = await Axios.post(`${serverUrl}/api/user/sendotp`, {email});
      const {msg} = response.data;
      setAlert(true, msg, "success");
      setOtpSent(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlert(true, errorMessage(error), "error");
    }
  }
  const handleLogin = async (e) => {
    try {
      setLoading(true);
      const response = await Axios.post(`${serverUrl}/api/user/auth-otp`, {email, otp});
      const {token, user} = response.data;
      console.log({token, user});
      setAlert(true, "Awesome! Logged in Successfully!", "success");
      setTokenLocal(token);
      setUserLocal(user);      
    } catch (error) {
      setLoading(false);
      setAlert(true, errorMessage(error), "error");
    }
  }
  const handleEmailChange = async (e) => {
    setOtpSent(false);
    setTimer(30);
    resetEmail();
    resetOtp();
  }
  const handleResendOtp = async (e) => {
    try {
      setTimer(30);
      sendOtp();
    } catch (error) {
      console.log(error);
      setAlert(true, "Something went wrong!", "error");
    }
  }
  return (
    <div className={classes.loginMain}>
      <>
        <div className={classes.inputTextField}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            disabled={otpSent}
            className={classes.inputTextFieldMain}
            value={email}
            onChange={setEmail}
            required
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
                input: classes.input
              }
            }}
            InputLabelProps={{ style: { color: "white" } }}
          />
        </div>
        {
          otpSent &&
          <div className={classes.inputTextField}>
            <TextField
              label="OTP"
              variant="outlined"
              fullWidth
              required
              className={classes.inputTextFieldMain}
              value={otp}
              onChange={setOtp}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.input
                }
              }}
              InputLabelProps={{ style: {color: "white"} }}
            />
          </div>
        }
        <div className={classes.inputTextField}>
          <Button disabled={loading} onClick={otpSent ? handleLogin : sendOtp} fullWidth variant="contained" color="secondary">
            {otpSent ? "Login" : "Send OTP"} {loading && <CircularProgress/>}
          </Button>
        </div>
        {
          otpSent && 
          <div style={{paddingTop: "1rem"}}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button onClick={handleEmailChange} fullWidth variant="contained">
                  Change Email Id
                </Button>
              </Grid>
              <Grid item xs={6}>
                <TimerButton timer={timer} setTimer={setTimer} handleResendOtp={handleResendOtp}/>
              </Grid>
            </Grid>
          </div>
        }
      </>
    </div>
  )
};

export default AudienceLogin;