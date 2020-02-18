import React, { useContext } from 'react';
import { Container, CssBaseline, makeStyles, Typography, TextField, Button } from '@material-ui/core';
import { UserContext } from '../Contexts/userContext';
import Axios from 'axios';
import { serverUrl } from '../dummyProjectData';
import useInputState from '../Hooks/useInputState';
import { AlertContext } from '../Contexts/alertContext';
import { errorMessage } from '../utils/errorHandler';
const useStyles = makeStyles( theme => ({
  root: {
    minHeight: "100vh"
  },
  title: {
    textAlign: "center",
    fontWeight: 600
  },
  inputTextField: {
    paddingTop: "2rem"
  },
  loginMain: {
    paddingTop: "4rem"
  }
}))

function Login(props) {
  const classes = useStyles();
  const {setUserLocal, setTokenLocal} = useContext(UserContext);
  const [uid, setUid] = useInputState("");
  const [password, setPassword] = useInputState("");
  const {setAlert} = useContext(AlertContext);
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await Axios.post(`${serverUrl}/api/user/login`, {uid, password});
      const {token, user} = response.data;
      console.log({token, user});
      setAlert(true, "Awesome! Logged in Successfully!", "success");
      setTokenLocal(token);
      setUserLocal(user);
    } catch (error) {
      setAlert(true, errorMessage(error), "error");
    }
  }
  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <CssBaseline/>
        <div className={classes.loginMain}>
          <Typography style={{fontWeight: 700}} variant="h3">
            Crowdfunding
          </Typography>
          <Typography variant="caption">
            by Inceptio
          </Typography>
          <div className={classes.inputTextField}>
            <TextField
              label="Id"
              variant="outlined"
              fullWidth
              color="secondary"
              className={classes.inputTextFieldMain}
              value={uid}
              onChange={setUid}
            />
          </div>
          <div className={classes.inputTextField}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              color="secondary"
              className={classes.inputTextFieldMain}
              value={password}
              onChange={setPassword}
            />
          </div>
          <div className={classes.inputTextField}>
            <Button onClick={handleLogin} fullWidth variant="outlined" color="secondary">
              Sign In
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
};

export default Login;
