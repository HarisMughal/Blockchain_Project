import React, { Component } from 'react';
import { Table, Button,Modal,ModalHeader,ModalBody,Input,Form,FormGroup, Label } from 'reactstrap';
import "./catlog.css";
import sha256 from 'crypto-js/sha256';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';


const temp = [
    {
        id:1,
        fileType: "xls",
        fileName: "mark",
        hash: "fd4be5bf889525735963f108779f95d2d7ff361c6b77df2db383f7dec7fab57d",
        description: "kasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    },
    {
        id:2,
        fileType: "xls",
        fileName: "mark",
        hash: "aslkmdkmi1oje21",
        description: "kasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    },
    {
        id:3,
        fileType: "xls",
        fileName: "mark",
        hash: "aslkmdkmi1oje21",
        description: "kasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    },
    {
        id:4,
        fileType: "xls",
        fileName: "mark",
        hash: "aslkmdkmi1oje21",
        description: "kasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    },
]

export default class Catlog extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            data_id:0,
            user_id:0,
            description : "",
            data: [],
            companyName: ''
            
        };

        this.onToggleModal = this.onToggleModal.bind(this)         
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formChange = this.formChange.bind(this);
        
    };

    componentDidMount()
    {
        let user_id = localStorage.getItem('id');
        axios.get(`http://localhost:3000/api/getData/${user_id}`)
        .then( (response)  => {
            this.setState({
                data: response.data
            })
        })
        .catch(function (error) {
            
            console.log(error);
        });

        let company_name = localStorage.getItem('company_name')
            
            this.setState({
                companyName: company_name
            })
    }

    onToggleModal(id){
        this.setState(
            {
                data_id:id,
                isModalOpen: !this.state.isModalOpen
                
            }
            
        );

    }

    handleSubmit(event){
        // console.log("Insert");
        event.preventDefault();
        if(this.state.data_id == -1)
        {
            let user_id = localStorage.getItem('id');
            
            axios.post(`http://localhost:3000/api/uploadData/${user_id}`, this.state)
            .then( (response)  => {
                if(response.data.message == "Success") {
                    this.setState(
                    {
                        
                        isModalOpen: !this.state.isModalOpen
                        
                    })

                    toast("Uploaded!")

                    setTimeout(() => {
                        window.location.reload()
                    }, 500);
                    
                    
                }
            })
            .catch(function (error) {
                
                console.log(error);
            });    
        }
        
        
        else
        {
            axios.put(`http://localhost:3000/api/updateData/${this.state.data_id}`, this.state)
            .then((response) => {
                if(response.data.message == "Success") {
                    this.setState(
                    {                      
                        isModalOpen: !this.state.isModalOpen                       
                    })

                    toast("Updated!")

                    setTimeout(() => {
                        window.location.reload()
                    }, 500);
                    
                }
            })
            .catch(function (error) {
                
                console.log(error);
            });    
        }
        
    }

     onRowDel(id)
    {
        axios.delete(`http://localhost:3000/api/delete/${id}`)
        .then((response) => {
            if(response.data.message == "Success") {

                toast("Deleted!")

                setTimeout(() => {
                    window.location.reload()
                }, 500);
                
            }
        })
        .catch(function (error) {
            
            console.log(error);
        });   
    }

    formChange(e){
        if(e.target.id === "file"){
            // console.log(e.target.files[0]);
            let fileName = e.target.files[0].name
            let fileType = fileName.substr(fileName.lastIndexOf('.') + 1);
            fileName = fileName.substr(0,fileName.lastIndexOf('.')) ;
            let reader = new FileReader();
            // console.log("asdas")
            reader.onloadend = () => {
                // console.log(reader.result)
                let fileHash = sha256(reader.result);
                this.setState({
                    "fileName": fileName,
                    "fileType": fileType,
                    "fileHash":fileHash.toString()
                });
            }
            reader.readAsDataURL(e.target.files[0]);
            
        }else{
            this.setState({
                [e.target.id] : e.target.value
            })  
        }
       
        // console.log(this.state);
    }


    

    render(){
        
        const Rows = this.state.data.map((row) =>{
            return (
                <>
                    <ToastContainer />
                    <tr key={row.id}>
                    <td >{row.fileName}</td>
                    <td >{row.fileType}</td>
                    {/* <td style={{maxWidth:"250px",wordBreak:"break-all"}}>{row.hash}</td> */}
                    <td style={{maxWidth:"250px",wordBreak:"break-all"}}>{row.description == 'null' ? '-' : row.description }</td>
                        
                        <td>
                            <i className="fa fa-trash" aria-hidden="true" style={{fontSize:"20px", color:"red",cursor:"pointer"}}
                            onClick={()=>this.onRowDel(row.id)}  ></i>
                            <i className="fa fa-upload ml-3" aria-hidden="true"  style={{cursor:"pointer"}} onClick={()=>this.onToggleModal(row.id)}></i> 

                        </td>
                    </tr>
                </>
            );
        }) 
        return(
            <div className="container mt-5">
                <div className="d-flex p-2 " >
                    
                    <Button outline color="primary" className="ml-auto" onClick={()=>this.onToggleModal(-1)}>
                        <i className="fa fa-upload" aria-hidden="true"></i> Upload
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.onToggleModal}>
                        <ModalHeader toggle={this.onToggleModal}>Login</ModalHeader>
                        <ModalBody className="mt-3">
                            <Form >
                                <FormGroup>
                                    <Label htmlFor="file" > Select a file</Label>
                                    <Input required type="file"  id="file" className="btn"  value={this.state.file} 
                                        onChange={(e)=>this.formChange(e)} ></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="description" > Add Description</Label>
                                    <textarea  type="text"  id="description" value={this.state.description }
                                        onChange={(e)=>this.formChange(e)} className="form-control"></textarea>
                                </FormGroup>
                                <Button type="button" color="success" value="submit" onClick={(e)=> this.handleSubmit(e)}>Upload</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
                {/* <Table className="mt-3 table-striped table-hover table-fit "  
                 data-search="true"
                 data-show-toggle="true" data-resizable="true"> */}
                <Table className="mt-3 table-striped table-hover table-fit " >
                    <thead className="thead-dark">
                        <tr>
                            <th data-field="name" data-sortable="true" scope="col">File Name</th>
                            <th data-field="type" data-sortable="true" scope="col">File Type</th>
                            {/* <th data-field="hash" data-sortable="true" scope="col">File Hash</th> */}
                            <th  scope="col">Description</th>
                            <th scope="col">Options    </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Rows}
                    </tbody>

                </Table>
                
            </div>
        );
    }


}