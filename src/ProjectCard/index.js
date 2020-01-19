import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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
  }
});

function ProjectCard(props) {
  const {id, title, description, picture} = props;
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Link className={classes.cardLink} to={`/project/${id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`https://picsum.photos/seed/${title.split(" ")[0]}/200/300`}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Bid Now
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
        </Link>
      </Card>
  )
}

export default ProjectCard
