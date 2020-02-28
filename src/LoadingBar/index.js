import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}))

function LoadingBar(props) {
  const classes = useStyles();
  const {size, thickness} = props;
  return (
    <div className={classes.root}>
      <CircularProgress size={size} thickness={thickness} />
    </div>
  )
}

export default LoadingBar
