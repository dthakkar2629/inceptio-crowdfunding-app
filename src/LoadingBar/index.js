import React from 'react';
import { LinearProgress, makeStyles } from '@material-ui/core';

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
  const {height} = props
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LinearProgress className={classes.colorPrimary} style={{height: `${height ? height : "10"}px`}} variant="query" color="primary" />
    </div>
  )
}

export default LoadingBar
