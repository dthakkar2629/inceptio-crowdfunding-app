import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Home, CasinoOutlined, FileCopy, ExitToAppOutlined, Person} from '@material-ui/icons';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import BalanceMsg from '../BalanceMsg';
import { UserContext } from '../Contexts/userContext';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  noLinkDecor: {
    textDecoration: "none",
    color: "black"
  }
});

export default function DrawerLeft(props) {
  const classes = useStyles();
  const {userLocal, setUserLocal, setTokenLocal} = useContext(UserContext);
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const deleteUser = () => {
    setUserLocal("");
    setTokenLocal("");
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link className={classes.noLinkDecor} to="/">
          <ListItem button>
            <ListItemIcon><Home/></ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon><Person/></ListItemIcon>
            <ListItemText>{userLocal.name}</ListItemText>
          </ListItem>
        </Link>
        <ListItem>
          <BalanceMsg/>
        </ListItem>
      </List>
      <Divider />
      <List>
        <Link className={classes.noLinkDecor} to="/my-bids">
          <ListItem button>
            <ListItemIcon><CasinoOutlined/></ListItemIcon>
            <ListItemText>My Recent Bids</ListItemText>
          </ListItem>
        </Link>
        <Link className={classes.noLinkDecor} to="/">
          <ListItem button>
            <ListItemIcon><FileCopy/></ListItemIcon>
            <ListItemText>All Projects</ListItemText>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem onClick={deleteUser} button>
          <ListItemIcon><ExitToAppOutlined/></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </List>
      {
        userLocal.isAdmin && 
        <>
          <Divider />
          <List>
            <Link className={classes.noLinkDecor} to="/admin/results">
              <ListItem button>
                <ListItemIcon><ExitToAppOutlined/></ListItemIcon>
                <ListItemText>Admin - Results</ListItemText>
              </ListItem>
            </Link>
          </List>
        </>
      }
    </div>
  );

  return (
    userLocal &&
    <div>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
            edge="start"
            className={clsx(classes.menuButton, state.left && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            CrowdFunding
          </Typography>
        </Toolbar>
      </AppBar>
      {props.children}
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}