import React, { useState, useContext, useEffect } from 'react';
import { Container, Paper, makeStyles, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { serverUrl } from '../dummyProjectData';
import Axios from 'axios';
import { errorMessage } from '../utils/errorHandler';
import { AlertContext } from '../Contexts/alertContext';
import LoadingBar from '../LoadingBar';
import { authHeader } from '../utils/headerBuilder';
import { UserContext } from '../Contexts/userContext';

const useStyles = makeStyles(theme => ({
  bidPaper: {
    padding: "1rem",
    '& > *': {
      marginTop: theme.spacing(1),
    }
  }
}))

function Bid(props) {
  const {id} = useParams();
  const classes = useStyles();
  const history = useHistory();
  const {tokenLocal, userLocal, setUserLocal} = useContext(UserContext);
  const [project, setProject] = useState({});
  const [amount, setAmount] = useState(0);
  const {setAlert} = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [bidding, setBidding] = useState(false);
  useEffect(() => {
    fetchBid();// eslint-disable-next-line
  }, []);
  const handleAmountChange = e => setAmount(e.target.value);
  const fetchBid = async () => {
    try {
      const {data} = await Axios.get(`${serverUrl}/api/bid/${id}`, authHeader(tokenLocal));
      setProject(data.bid.project);
      setAmount(data.bid.amount);
      setLoading(false);
    } catch (error) {
      setAlert(true, errorMessage(error), "error");
    }
  }
  const saveBid = async e => {
    setBidding(true)
    try {
      if(amount < 100 ){
        setBidding(false);
        return setAlert(true, "Amount must be greater than 100", "error");
      }
      const response = await Axios.post(`${serverUrl}/api/bid/edit/${id}`, {amount}, authHeader(tokenLocal));
      setUserLocal({...userLocal, balance: response.data.balance});
      setBidding(false);
      setAlert(true, "Bid saved successfully!", "success");
      history.push(`/my-bids`);
    } catch (error) {
      setAlert(true, errorMessage(error), "error");
      setBidding(false);
    }
  }
  return (
    loading 
    ?
    <LoadingBar height={42}/> : 
    <Container maxWidth="xs">
      <Paper className={classes.bidPaper} elevation={3}>
        <Typography variant="h5">
          {project.title}
        </Typography>
        <TextField
          label="Bid Amount (in ₹)"
          variant="outlined"
          fullWidth
          value={amount > 0 ? amount : ""}
          onChange={handleAmountChange}
        />
        <Button
          onClick={saveBid} 
          fullWidth 
          disabled={bidding} 
          color="secondary" 
          variant="contained">
          Save {bidding && <CircularProgress />}
        </Button>
      </Paper>
    </Container>
  )
};

export default Bid;
