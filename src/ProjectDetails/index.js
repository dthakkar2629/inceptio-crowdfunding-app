import React, { useEffect, useState } from 'react';
import { Typography, Container, makeStyles, Grid, TextField, Button, Divider } from '@material-ui/core';
import Axios from 'axios';
import LoadingBar from '../LoadingBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NumberFormat from 'react-number-format';
import { serverUrl } from '../dummyProjectData';
import { authHeader } from '../utils/headerBuilder';

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

const addAmounts = [50000, 100000, 200000];

function ProjectDetails(props) {
  const classes = useStyles();
  const {id} = props.match.params;
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    fetchProject();// eslint-disable-next-line
  }, []);
  const fetchProject = async () => {
    try {
      const projectResponse = await Axios.get(`${serverUrl}/api/project/${id}`);
      const {project} = projectResponse.data;
      setProject(project);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  const bidNow = async (e) => {
    try {
      const response = await Axios.post(`${serverUrl}/api/bid/${id}`, {amount}, authHeader);
      console.log(response);
    } catch (error) {
      console.log(error);
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
                    <Fab variant="extended" size="small" color="secondary" value={amt} aria-label="add" onClick={e => setAmount(amount => parseInt(amount || 0)+amt)}>
                      <AddIcon />
                      ₹ <NumberFormat displayType="text" thousandSeparator={true} thousandsGroupStyle="lakh" value={amt} />
                    </Fab>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={bidNow} fullWidth variant="contained" color="primary">
                    Save Bid
                  </Button>
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
