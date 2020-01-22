import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MenuBar from './components/MenuBar';
import SinglePost from './components/Posts/SinglePost';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Container>
          <Route exact path='/' component={Home} />
          <AuthRoute path='/login' component={Login} />
          <AuthRoute path='/Signup' component={Signup} />
          <Route exact path='/posts/:postId' component={SinglePost} />
          <Route render={() => <Redirect to={{pathname: "/"}} />} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
