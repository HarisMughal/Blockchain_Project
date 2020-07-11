import React from 'react';
import './App.css';
import Login from './Components/Login/login';
// import Request from './Components/Request/request';
// import NavBar from './Components/Navbar/navbar';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home/home';
// import Catlog from './Components/Catlog/catlog';

function App() {
  return (
    <BrowserRouter>
    {/* <NavBar/> */}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route  path="/home" component={Home} />
        
        {/* <Route path='/request' component={Request}/> */}
{/* Set this to login*/}
        <Redirect to="/login"/> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
