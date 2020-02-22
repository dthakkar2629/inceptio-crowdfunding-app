import React from 'react';
import { ListItem, Paper, ListItemText, Fab, makeStyles } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import NumberFormat from 'react-number-format'
import Moment from 'react-moment'
import { Edit, Add } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  bidItemPaper: {
    width: "100%",
    padding: "1rem"
  },
  mainHeading: {
    padding: "0 1rem"
  },
  noLinkDecor: {
    textDecoration: "none",
    color: "inherit"
  },
  bidActions: {
    float: "right",
    "& > *": {
      marginLeft: theme.spacing(1)
    }
  }
}))

function BidItem(props) {
  const {bid, addNewBid} = props;
  const history = useHistory();
  const classes = useStyles();
  const handleEdit = async (e) => {
    try {
      history.push(`/bid/${bid._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ListItem>
      <Paper className={classes.bidItemPaper} elevation={2}>
        <ListItemText 
          primary={bid.project.title} 
          secondary={
            <span>
              <span style={{color: green[500], fontWeight: 700}}>
              ₹ <NumberFormat displayType="text" thousandSeparator={true} thousandsGroupStyle="lakh" value={bid.amount} />
              </span>
              <span style={{marginLeft: "1rem"}}>
                <Moment fromNow>{new Date(bid.createdAt)}</Moment>
              </span>
              {/* <span>
                <Button size="small" onClick={e => handleExploreProject(e, bid.project._id)}>Learn More</Button>
              </span> */}
              <span className={classes.bidActions}>
                <Fab color="secondary" aria-label="edit" size="small" onClick={e => handleEdit(e, bid._id)}>
                  <Edit />
                </Fab>
                {
                  addNewBid && 
                  <Fab color="secondary" aria-label="edit" size="small" onClick={e => history.push(`/project/${bid.project._id}`)}>
                    <Add />
                  </Fab>
                }
              </span>
            </span>
        }  />
      </Paper>
    </ListItem>
  )
};

export default BidItem
