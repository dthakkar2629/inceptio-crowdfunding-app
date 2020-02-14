import React, { useState, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { serverUrl } from '../dummyProjectData';
import ProjectCard from '../ProjectCard';
import Axios from 'axios';
import LoadingBar from '../LoadingBar';

const useStyles = makeStyles({
  root: {
    maxWidth: "1000px",
    margin: "2rem auto"
  },
  cardGrid: {
    display: "flex",
    justifyContent: "center"
  }
})

function ProjectCardList(props) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    const response = await Axios.get(`${serverUrl}/api/project/fetch-all`);
    console.log(response);
    setProjects(response.data.projects);
    setLoading(false);
  }
  const classes = useStyles();
  return (
  loading ? 
    <LoadingBar height={42}/> : 
    <div className={classes.root}>
      <Grid container spacing={2}>
        {projects.map(p => 
          <Grid className={classes.cardGrid} item xs={12} sm={6} md={4}>
            <ProjectCard key={p._id} {...p} />
          </Grid>
        )}
      </Grid>
    </div>
  )
};

export default ProjectCardList
