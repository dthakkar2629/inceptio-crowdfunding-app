import React, { useContext } from 'react';
import DrawerLeft from '../DrawerLeft';
import { Route, Switch } from 'react-router-dom';
import ProjectCardList from '../ProjectCardList';
import ProjectDetails from '../ProjectDetails';
import Login from '../Login';
import { UserContext } from '../Contexts/userContext';
import MyBids from '../MyBids';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { AlertContext } from '../Contexts/alertContext';

function Layout(props) {
  const {userLocal} = useContext(UserContext);
  const { 
    alertOpen,
    handleAlertClose,
    alertType,
    alertMsg } = useContext(AlertContext);
  return (
    <>
      <DrawerLeft/>
      {
        userLocal ?
        <div style={{minHeight: "80vh", paddingTop: "4rem"}}>
          <Switch>
            <Route exact path="/" render={(routeProps) => <ProjectCardList {...routeProps} />}/>
            <Route exact path="/project/:id" render={(routeProps) => <ProjectDetails {...routeProps} />} />
            <Route exact path="/my-bids" render={(routeProps) => <MyBids {...routeProps} />} />
          </Switch>
        </div>
        :
        <Login />
      }
      <Snackbar open={alertOpen} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  )
};

export default Layout
