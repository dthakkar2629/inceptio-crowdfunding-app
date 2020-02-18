import React, { useEffect, useState, useContext } from 'react';
import { Typography, Container, makeStyles, Grid, TextField, Button, Divider, CircularProgress } from '@material-ui/core';
import Axios from 'axios';
import LoadingBar from '../LoadingBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NumberFormat from 'react-number-format';
import { serverUrl } from '../dummyProjectData';
import { authHeader } from '../utils/headerBuilder';
import { useParams, useHistory } from 'react-router-dom';
import { AlertContext } from '../Contexts/alertContext';
import { UserContext } from '../Contexts/userContext';
import { errorMessage } from '../utils/errorHandler';
import BalanceMsg from '../BalanceMsg';

const useStyles = makeStyles(theme => ({
  projectImage: {
    width: "100%"
  },
  projectAction: {
    marginTop: 10
  },
  addButtons: {
    display: "flex",
    justifyContent: "space-between"
  },
  resetButton: {
    margin: "10px 0 10px 5px"
  },
  description: {
    marginTop: "2rem"
  }
}));

function ProjectDetails(props) {
  const classes = useStyles();
  const {id} = useParams();
  const history = useHistory();
  const {tokenLocal, setUserLocal, userLocal} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [amount, setAmount] = useState(0);
  const [enableBidding, setEnableBidding] = useState(true);
  const {setAlert} = useContext(AlertContext);
  const [addAmounts, setAddAmounts] = useState([1000, 2000, 5000])
  useEffect(() => {
    fetchProject();
    defineAddAmount();// eslint-disable-next-line
  }, []);
  const fetchProject = async () => {
    try {
      const response = await Axios.get(`${serverUrl}/api/project/${id}`, authHeader(tokenLocal));
      if(Math.floor(response.status/100) === 2){
        const {project} = response.data;
        setProject(project);
        setLoading(false);
      } else {
        setAlert(true, response.data.msg || "Connection to server cannot be estabilished!", "error");
      }
    } catch (error) {
      setAlert(true, errorMessage(error), "error");
    }
  }
  const defineAddAmount = () => {
    const unit = userLocal.balance/100;
    const factor = (unit < 20000) ? ((unit < 10000) ? ((unit < 5000) ? 1000 : 5000) : 10000) : 20000; 
    const factors = [factor, 2*factor, 5*factor];
    setAddAmounts(factors);
  }
  const bidNow = async (e) => {
    try {
      setEnableBidding(false);
      if(amount < 100 ){
        setEnableBidding(true);
        return setAlert(true, "Amount must be greater than 100", "error");
      }
      if(amount > userLocal.balance){
        setEnableBidding(true);
        return setAlert(true, "Insufficient Funds!", "error");
      }
      const response = await Axios.post(`${serverUrl}/api/bid/${id}`, {amount}, authHeader(tokenLocal));
      console.log(response);
      if(Math.floor(response.status/100) === 2){
        setUserLocal({...userLocal, balance: response.data.balance});
        setAlert(true, "Bid Successfull !", "success");
        history.push('/');
      } else {
        setEnableBidding(true);
        setAlert(true, response.data.msg || "Connection to server cannot be estabilished!", "error");
      }
    } catch (error) {
      setEnableBidding(true);
      setAlert(true, errorMessage(error), "error");
    }
  }
  const handleAmountChange = e => setAmount(e.target.value);
  return (
    <>
      {loading ? 
        <LoadingBar height={42}/> : 
        <Container>
          <Typography variant="h4">
            {project.title}
          </Typography>
          <Typography variant="body1">
            {project.brief}
          </Typography>
          <Divider style={{ margin: "0 0 2rem 0"}}/>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <div>
                <img className={classes.projectImage} src={`https://picsum.photos/seed/${project.title.split(" ")[0]}/1014/570`} alt="project"/>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
            <div className={classes.projectAction}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={9}>
                      <TextField
                        label="Bid Amount (in ₹)"
                        variant="outlined"
                        fullWidth
                        value={amount > 0 ? amount : ""}
                        onChange={handleAmountChange}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Button size="large" className={classes.resetButton} onClick={e => setAmount(0)}>Reset</Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.addButtons}>
                  {addAmounts.map(amt => (
                    <Fab key={amt} variant="extended" size="small" color="secondary" value={amt} aria-label="add" onClick={e => setAmount(amount => parseInt(amount || 0)+amt)}>
                      <AddIcon />
                      ₹ <NumberFormat displayType="text" thousandSeparator={true} thousandsGroupStyle="lakh" value={amt} />
                    </Fab>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Button disabled={!enableBidding} onClick={bidNow} fullWidth variant="contained" color="primary">
                    Save Bid { !enableBidding && <CircularProgress /> }
                  </Button>
                  <BalanceMsg styleProp={{marginTop: "1rem"}} />
                </Grid>
              </Grid>
            </div>
            <Typography variant="body2" className={classes.description}>
              Existing research on antecedent of funding success mainly focuses on basic project properties such as funding goal, duration, and project category. In this study, we view the process by which project owners raise funds from backers as a persuasion process through project descriptions. Guided by the unimodel theory of persuasion, this study identifies three exemplary antecedents (length, readability, and tone) from the content of project descriptions and two antecedents (past experience and past expertise) from the trustworthy cue of project descriptions. The proposed model also has superior true positive and true negative rates. 
            </Typography>
            </Grid>
          </Grid>
        </Container>
      }
    </>  
  )
};

export default ProjectDetails
