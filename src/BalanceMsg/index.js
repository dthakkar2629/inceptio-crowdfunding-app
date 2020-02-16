import React from 'react';
import { useLocalStorageState } from '../Hooks/useLocalStorageState';
import MuiAlert from '@material-ui/lab/Alert';

function BalanceMsg(props) {
  const [user] = useLocalStorageState("user", "");
  return (
    user ?
    <MuiAlert style={props.styleProp} elevation={6} variant="filled" severity="info">Your Balance: ₹ {user.balance}</MuiAlert>
    :
    <></>
  )
};

export default BalanceMsg
