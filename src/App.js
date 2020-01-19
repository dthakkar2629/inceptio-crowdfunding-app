import React from 'react';
import './App.css';
import DrawerLeft from './DrawerLeft';
import { Route, Switch } from 'react-router-dom';
import { project } from './dummyProjectData';
import ProjectCardList from './ProjectCardList';
import ProjectDetails from './ProjectDetails';

function App() {
  return (
    <div className="App">
      <DrawerLeft/>
      <div style={{minHeight: "80vh", paddingTop: "2rem"}}>
        <Switch>
          <Route exact path="/" render={(routeProps) => <ProjectCardList {...routeProps} {...project} />}/>
          <Route exact path="/project/:id" render={(routeProps) => <ProjectDetails {...routeProps} />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
