import React from 'react';
import logo from './logo.svg';
import './App.css';
import DrawerLeft from './DrawerLeft';
import { Route, Switch } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { project } from './dummyProjectData';
import { Container } from '@material-ui/core';
import ProjectCardList from './ProjectCardList';

function App() {
  return (
    <div className="App">
      <DrawerLeft/>
      <div style={{minHeight: "90vh", paddingTop: "3rem"}}>
        <Switch>
          <Route exact path="/" render={(routeProps) => <ProjectCardList {...routeProps} {...project} />}/>
          <Route exact path="/project/:id" render={(routeProps) => <ProjectCard {...routeProps} {...project} />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
