import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';

function TimerButton(props) {
  const {timer, setTimer, handleResendOtp} = props;
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);

    return () => clearInterval(interval);// eslint-disable-next-line
  }, []);
  return (
    <Button onClick={handleResendOtp} fullWidth variant="contained" disabled={timer > 0} color="primary">
      Resend OTP { timer > 0 && `in ${timer}`}
    </Button>
  )
}

export default TimerButton
