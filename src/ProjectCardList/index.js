import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { serverUrl } from '../dummyProjectData';
import ProjectCard from '../ProjectCard';
import Axios from 'axios';
import LoadingBar from '../LoadingBar';
import { authHeader } from '../utils/headerBuilder';
import BalanceMsg from '../BalanceMsg';
import { UserContext } from '../Contexts/userContext';

const useStyles = makeStyles({
  root: {
    maxWidth: "1000px",
    margin: "1rem auto"
  },
  cardGrid: {
    display: "flex",
    justifyContent: "center"
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
