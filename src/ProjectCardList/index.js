import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { serverUrl } from '../dummyProjectData';
import ProjectCard from '../ProjectCard';
import Axios from 'axios';
import LoadingBar from '../LoadingBar';
import { authHeader } from '../utils/headerBuilder';
import BalanceMsg from '../BalanceMsg';
import { UserContext } from '../Contexts/userContext';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    maxWidth: "1000px",
    margin: "1rem auto"
  },
  cardGrid: {
    display: "flex",
    justifyContent: "center"
  },
  heading: {
    margin: "0 auto 1rem auto",
    textAlign: "center",
    fontWeight: 700,
    color: blue[800]
  }
})

function ProjectCardList(props) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const {tokenLocal} = useContext(UserContext);
  useEffect(() => {
    fetchProjects();// eslint-disable-next-line
  }, []);
  const fetchProjects = async () => {
    const response = await Axios.get(`${serverUrl}/api/project/fetch-all`, authHeader(tokenLocal));
    console.log(response);
    setProjects(response.data.projects);
    setLoading(false);
  }
  const classes = useStyles();
  return (
  loading ? 
    <LoadingBar height={42}/> : 
    <div className={classes.root}>
      <BalanceMsg styleProp={{ maxWidth: "70vw", margin: "0 auto 1rem auto" }} />
      <Typography className={classes.heading} variant="h4">
        All Projects
      </Typography>
      <Grid container spacing={2}>
        {projects.map(p => 
          <Grid key={p._id} className={classes.cardGrid} item xs={12} sm={6} md={4}>
            <ProjectCard {...p} />
          </Grid>
        )}
      </Grid>
    </div>
  )
};

export default ProjectCardList
