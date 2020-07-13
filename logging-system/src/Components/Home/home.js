import React ,{Component } from "react";
import NavBar from '../Navbar/navbar'
import Switch from "react-bootstrap/esm/Switch";
import { Route,Redirect } from "react-router-dom";
import Catlog from "../Catlog/catlog";
import Request from '../Request/request';
import Send from "../Send/send";
import Received from '../Received/received';

export default class Home extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }


    render(){
        return (
            <div>
                <NavBar/>
                <Switch>
                    <Route exact path="/home" component={Catlog}/>
                    
                    <Route path='/home/requests' component={Request}/>
                    <Route path='/home/send' component={Send}/>
                    {/* <Route path='/home/received' component={Received} /> */}
                    <Redirect to="/home"/>
                </Switch>
            </div>
        );
    }



}