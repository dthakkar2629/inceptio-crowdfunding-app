import React, { useState, useEffect, useContext } from 'react';
import LoadingBar from '../LoadingBar';
import { Typography, List, ListItem, makeStyles } from '@material-ui/core';
import Axios from 'axios';
import { serverUrl } from '../dummyProjectData';
import { authHeader } from '../utils/headerBuilder';
import BalanceMsg from '../BalanceMsg';
import { UserContext } from '../Contexts/userContext';
import BidItem from './BidItem';

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
  const {tokenLocal} = useContext(UserContext);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchBids();// eslint-disable-next-line
  }, []);
  const fetchBids = async () => {
    try {
      const response = await Axios.get(`${serverUrl}/api/bid/fetch-all`, authHeader(tokenLocal));
      console.log({response});
      setBids(response.data.bids);
      setLoading(false);
    } catch (error) {
      
    }
  };
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
            <BidItem bid={bid} addNewBid />
          ))
        }
      </List>
    </>
  )
}

export default MyBids;