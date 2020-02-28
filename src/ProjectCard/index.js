import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
  },
  media: {
    height: 140,
    width: 300
  },
  cardLink: {
    textDecoration: "none"
  },
  cardActionArea: {
    height: "144.4px"
  }
});

function ProjectCard(props) {// eslint-disable-next-line
  const {_id, title, brief, picture} = props;
  const classes = useStyles();
  return (
    <Paper elevation={4}>
      <Card className={classes.card}>
        <Link className={classes.cardLink} to={`/project/${_id}`}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`http://iecnmims.in/cw/${picture}.png`}
              title={title}
            />
            <CardContent className={classes.cardActionArea}>
              <Typography gutterBottom  color="textPrimary" variant="h5">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {brief}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Paper>
  )
}

export default ProjectCard;