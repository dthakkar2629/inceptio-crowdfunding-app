import React, { useContext } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { UserContext } from '../Contexts/userContext';

function BalanceMsg(props) {
  const {userLocal} = useContext(UserContext);
  return (
    userLocal ?
    <MuiAlert style={props.styleProp} elevation={2} variant="filled" severity="info">Your Balance: ₹{userLocal.balance}</MuiAlert>
    :
    <></>
  )
};

export default BalanceMsg
