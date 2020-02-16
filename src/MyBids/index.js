import React, { useState, useEffect } from 'react';
import LoadingBar from '../LoadingBar';
import { Typography, List, ListItem, ListItemText, Paper, makeStyles } from '@material-ui/core';
import Axios from 'axios';
import { serverUrl } from '../dummyProjectData';
import { authHeader } from '../utils/headerBuilder';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { green } from '@material-ui/core/colors';
import BalanceMsg from '../BalanceMsg';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(({
  bidItemPaper: {
    width: "100%",
    padding: "1rem"
  },
  mainHeading: {
    padding: "0 1rem"
  },
  noLinkDecor: {
    textDecoration: "none",
    color: "inherit"
  }
}))

function MyBids(props) {
  const classes = useStyles();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchBids();
  }, []);
  const fetchBids = async () => {
    const response = await Axios.get(`${serverUrl}/api/bid/fetch-all`, authHeader);
    setBids(response.data.bids);
    setLoading(false);
  }
  return (
    loading?
    <LoadingBar/>
    :
    <>
      <Typography className={classes.mainHeading} variant="h4">Recent Bids</Typography>
      <List>
        <ListItem>
          <BalanceMsg styleProp={{width: "100%"}}/>
        </ListItem>
        {
          bids.map(bid => (
            <Link key={bid._id} className={classes.noLinkDecor} to={`/project/${bid.project._id}`}>
              <ListItem button>
                <Paper className={classes.bidItemPaper} elevation={2}>
                  <ListItemText 
                    primary={bid.project.title} 
                    secondary={
                      <span>
                        <span style={{color: green[500], fontWeight: 700}}>
                        ₹ <NumberFormat displayType="text" thousandSeparator={true} thousandsGroupStyle="lakh" value={bid.amount} />
                        </span>
                        <Moment style={{float: "right"}} fromNow>{new Date(bid.createdAt)}</Moment>
                      </span>
                  }  />
                </Paper>
              </ListItem>
            </Link>
          ))
        }
      </List>
    </>
  )
}

export default MyBids
