import React ,{Component } from "react";
import {Card,Form,Button} from "react-bootstrap";

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        }
        this.handleChange = this.handleChange.bind(this);
       
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    formSubmit(event){
        event.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);

    }

    render(){
        return (
            <div className="bg-primary container-fluid " style={{height:"100vh"}}>
                <div className="row  justify-content-center ">
                    <div className="col-10 col-md-6 col-xl-4"> 
                        <Card style={{top:"20vh", borderRadius:"10px",
                            boxShadow:"0px 0px 10px 0px #000"}}>
                            <Card.Header className="display-4 ">Sign In</Card.Header>
                            <Card.Body>
                                <Form onSubmit={(e) => this.formSubmit(e)}>
                                    <Form.Group >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control name="email"  required type="email" 
                                        placeholder="Enter email" onChange={(e)=>this.handleChange(e)} />
                                        
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control name="password" id="password" required type="password" 
                                        placeholder="Password" onChange={(e)=>this.handleChange(e)} />
                                    </Form.Group>
                                    <Button className="w-100 mt-2" variant="warning" type="submit" style={{borderRadius:"18px"}}>
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div> 
                </div>
            </div>
        );
    }
}