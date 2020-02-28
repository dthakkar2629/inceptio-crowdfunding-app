import React, { useContext, useState } from 'react';
import { makeStyles, TextField, Button, CircularProgress } from '@material-ui/core';
import { UserContext } from '../Contexts/userContext';
import Axios from 'axios';
import { serverUrl } from '../dummyProjectData';
import useInputState from '../Hooks/useInputState';
import { AlertContext } from '../Contexts/alertContext';
import { errorMessage } from '../utils/errorHandler';

const useStyles = makeStyles( theme => ({
  inputTextField: {
    marginTop: "2rem"
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

function PanelistLogin(props) {
  const classes = useStyles();
  const {setUserLocal, setTokenLocal} = useContext(UserContext);
  const [uid, setUid] = useInputState("");
  const [password, setPassword] = useInputState("");
  const {setAlert} = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    try {
      setLoading(true);
      const response = await Axios.post(`${serverUrl}/api/user/login`, {uid, password});
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
  return (
    <div>
      <div className={classes.inputTextField}>
        <TextField
          label="Id"
          variant="outlined"
          fullWidth
          color="secondary"
          value={uid}
          onChange={setUid}
          required
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
              input: classes.input
            }
          }}
          InputLabelProps={{
            style: {
              color: "white"
            }
          }}
        />
      </div>
      <div className={classes.inputTextField}>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          color="secondary"
          value={password}
          onChange={setPassword}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
              input: classes.input
            }
          }}
          InputLabelProps={{
            style: {
              color: "white"
            }
          }}
        />
      </div>
      <div className={classes.inputTextField}>
        <Button disabled={loading} onClick={handleLogin} fullWidth variant="contained" color="secondary">
          Sign In {loading && <CircularProgress/>}
        </Button>
      </div>
    </div>
  )
};

export default PanelistLogin;
