import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { project, projects } from '../dummyProjectData';
import ProjectCard from '../ProjectCard';

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
  const {} = props
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {projects.map(p => 
          <Grid className={classes.cardGrid} item xs={12} sm={6} md={4}>
            <ProjectCard key={p.id} {...p} />
          </Grid>
        )}
      </Grid>
    </div>
  )
};

export default ProjectCardList
