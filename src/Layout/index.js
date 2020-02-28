import React, { useContext } from 'react';
import DrawerLeft from '../DrawerLeft';
import { Route, Switch } from 'react-router-dom';
import ProjectCardList from '../ProjectCardList';
import ProjectDetails from '../ProjectDetails';
import { UserContext } from '../Contexts/userContext';
import MyBids from '../MyBids';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { AlertContext } from '../Contexts/alertContext';
import Login from '../Login';
import Bid from '../Bid';
import Results from '../Admin/Results';

function Layout(props) {
  const {userLocal} = useContext(UserContext);
  const { 
    alertOpen,
    handleAlertClose,
    alertType,
    alertMsg } = useContext(AlertContext);
  const routes = [
    {
      path: "/",
      component: ProjectCardList
    },
    {
      path: "/project/:id",
      component: ProjectDetails
    },
    {
      path: "/my-bids",
      component: MyBids 
    },
    {
      path: "/bid/:id",
      component: Bid
    },
    {
      path: "/admin/results",
      component: Results
    }
  ]
  return (
    <>
      <DrawerLeft/>
      {
        userLocal ?
        <div style={{minHeight: "80vh", paddingTop: "4rem"}}>
          <Switch>
            {
              routes.map(route => <Route exact {...route} />)
            }
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
