import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import './ProjectCard.css';
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
  const {_id, title, brief, picture, funds, rank} = props;
  const classes = useStyles();
  const rankClass = rank => {
    let classname = '';
    let position = '';
    switch (rank) {
      case 1: classname = "firstRank"; position = 'Winner';
        break;
      case 2: classname = "secondRank"; position = 'Runner Up';
        break;
      case 3: classname = "thirdRank"; position = 'Second Runner Up';
        break;
      default: classname = ""; position = '';
    }
    return {classname, position};
  }
  return (
    <Paper elevation={rank <= 3 ? 6 : 2}>
      <Card className={`${classes.card} ${rankClass(rank).classname}`}>
        <Link className={classes.cardLink} to={`/project/${_id}`}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`http://iecnmims.in/cw/${picture}.png`}
              title={title}
            />
            <CardContent className={classes.cardActionArea}>
              <Typography gutterBottom color="textPrimary" variant="h5">
                {title}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                Funds: ₹{funds}
              </Typography>
              {
                rank <= 3 &&
                <Typography style={{color: "black", fontWeight: 800, position: "absolute", bottom: "10px"}} variant="h6">
                  {rankClass(rank).position}
                </Typography>
              }
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Paper>
  )
}

export default ProjectCard;