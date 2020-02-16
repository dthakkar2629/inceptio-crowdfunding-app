import React from 'react';
import './App.css';
import { UserProvider } from './Contexts/userContext';
import Layout from './Layout';
import { AlertProvider } from './Contexts/alertContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <AlertProvider>
          <Layout/>
        </AlertProvider>
      </UserProvider>
    </div>
  );
}

export default App;
