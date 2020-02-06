import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import './App.scss';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MenuBar from './components/MenuBar';
import SinglePost from './components/Posts/SinglePost';


function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />

        <Route exact path='/' component={Home} />
        <AuthRoute path='/login' component={Login} />
        <AuthRoute path='/signup' component={Signup} />
        <Route exact path='/posts/:postId' component={SinglePost} />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />

      </Router>
    </AuthProvider>
  );
}

export default App;
