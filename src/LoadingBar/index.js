import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: '#e0dfdc',
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: '#c4c4c2',  
      }
    }
  }
}))

function LoadingBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}

export default LoadingBar
