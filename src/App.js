import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import MenuBar from './components/MenuBar';



function App() {
  return (
    <Router>
      <MenuBar />
      <Container>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/Signup' component={Signup} />
      </Container>
    </Router>
  );
}

export default App;
