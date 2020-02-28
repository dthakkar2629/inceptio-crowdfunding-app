import React, { useState, useContext, useEffect } from 'react';
import { serverUrl } from '../../dummyProjectData';
import { authHeader } from '../../utils/headerBuilder';
import { UserContext } from '../../Contexts/userContext';
import Axios from 'axios';
import LoadingBar from '../../LoadingBar';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import ProjectCard from './ProjectCard';

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

function Results(props) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const {tokenLocal} = useContext(UserContext);
  const classes = useStyles();
  useEffect(() => {
    fetchProjects();// eslint-disable-next-line
  }, []);
  const fetchProjects = async () => {
    const response = await Axios.get(`${serverUrl}/admin/results`, authHeader(tokenLocal));
    console.log(response);
    setProjects(response.data.projects);
    setLoading(false);
  };
  return (
    loading ? 
    <LoadingBar thickness={5} size={100} /> : 
    <div className={classes.root}>
      <Typography className={classes.heading} variant="h4">
        All Projects
      </Typography>
      <Grid container spacing={2}>
        {projects.map((p, i) => 
          <Grid key={p._id} className={classes.cardGrid} item xs={12} sm={6} md={4}>
            <ProjectCard {...p} rank={i+1} />
          </Grid>
        )}
      </Grid>
    </div>
  )
};

export default Results;