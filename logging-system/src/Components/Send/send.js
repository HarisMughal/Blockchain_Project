import React, { Component } from 'react';
import { Table, Button,Modal,ModalHeader,ModalBody,Input,Form,FormGroup, Label } from 'reactstrap';

import sha256 from 'crypto-js/sha256';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'

const temp = [
    {
        id:1,
        name:"Somra bhopal",
        fileType: "xls",
        fileName: "mark",
        hash: "fd4be5bf889525735963f108779f95d2d7ff361c6b77df2db383f7dec7fab57d",
        description: "kasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    },
    {
        id:2,
        name:"Teja INC",
        fileType: "xls",
        fileName: "mark",
        hash: "aslkmdkmi1oje21",
        description: "kasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    },
    {
        id:3,
        name:"Bajaj Farms",
        fileType: "xls",
        fileName: "mark",
        hash: "aslkmdkmi1oje21",
        description: "kasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    },
    {
        id:4,
        name:"Gogo Crimes",
        fileType: "xls",
        fileName: "mark",
        hash: "aslkmdkmi1oje21",
        description: "kasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    },
]

export default class Send extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModlaOpen: false,
            data: [],
            file: null,
            request_id: '',
            respondent_id: '',
            fileHash: '',
        }
        this.onToggleModal = this.onToggleModal.bind(this) ;
        this.formChange = this.formChange.bind(this);
    }

    componentDidMount()
    {
        let user_id = localStorage.getItem('id');
        axios.get(`http://localhost:3000/api/getSendData/${user_id}`)
        .then( (response)  => {
            console.log(response.data)
            this.setState({
                data: response.data
            })
        })
        .catch(function (error) {
            
            console.log(error);
        });
    }

    onToggleModal(request_id){
        this.setState(
            {
                request_id: request_id,
                isModlaOpen: !this.state.isModlaOpen
                
            }
            
        );

    }

    handleSubmit()
    {
            let respondent_id = localStorage.getItem('id');
            this.setState({ respondent_id: respondent_id }, () =>{
                const data = new FormData() 
                data.append('file', this.state.file);
                
    
                axios.post(`http://localhost:3000/api/sendFile`, data)
                .then( (response)  => {
                    if(response.status == 200)
                    {
                        axios.post(`http://localhost:3000/api/sendFileData`, {request_id: this.state.request_id, respondent_id: this.state.respondent_id, hash: this.state.fileHash })
                        .then( (response)  => {
                           
                           
                            
                        })
                        .catch((error) =>  {
                            this.setState({
    
                                    isModlaOpen: !this.state.isModlaOpen
                                    
                                }
                                
                            );
                            
                            toast("Hash Mismatched")
                            
                            }); 
                    }
                    
                })
                .catch(function (error) {
                    
                    console.log(error);
                }); 
            }
            
        );
           
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
                // let fileHash = sha256(reader.result);
                let fileHash = sha256(reader.result);
                this.setState({
                    
                    "fileName": fileName,
                    "fileType": fileType,
                    "fileHash": fileHash.toString()
                });
            }
            this.setState({
                    
                file: e.target.files[0],
            });
            reader.readAsDataURL(e.target.files[0]);
            
        }else{
            this.setState({
                [e.target.id] : e.target.value
            })  
        }
       
        // console.log(this.state);
    }

    render(){
        let RowsSend = this.state.data.map((row) =>{
            return (
                
                <tr key={row.user_data[0].id}>
                   <td >{row.user_data[0].name}</td> 
                   <td >{row.data[0].fileName}</td>
                   <td >{row.data[0].fileType}</td>
                   {/* <td style={{maxWidth:"250px",wordBreak:"break-all"}}>{row.hash}</td> */}
                   <td style={{maxWidth:"250px",wordBreak:"break-all"}}>{row.data[0].description == 'null' ? '-' :  row.data[0].description}</td>
                    
                    <td>
                        <Button color="success"  onClick={() => this.onToggleModal(row.user_data[0].id)}>
                            <i className="fa fa-paper-plane mr-2" aria-hidden="true"></i>
                            Send
                        </Button>


                    </td>
                </tr>
            );
        }) 
        

        return(
            <div className="mt-5 container ">
                <ToastContainer />
                <Table className="mt-3 table-striped table-hover table-fit " >
                    <thead className="thead-dark">
                        <tr>
                            <th data-field="id" data-sortable="true" scope="col">Requester Company Name</th>
                            <th data-field="name" data-sortable="true" scope="col">Requested File</th>
                            <th data-field="type" data-sortable="true" scope="col">File Type</th>
                            {/* <th data-field="hash" data-sortable="true" scope="col">File Hash</th> */}
                            <th  scope="col">Description</th>
                            <th scope="col">Options    </th>
                        </tr>
                    </thead>
                    <tbody>
                        {RowsSend}
                    </tbody>
                    <Modal isOpen={this.state.isModlaOpen} toggle={this.onToggleModal}>
                        <ModalHeader toggle={this.onToggleModal}>Login</ModalHeader>
                        <ModalBody className="mt-3">
                            <Form >
                                <FormGroup>
                                    <Label htmlFor="file" > Select a file</Label>
                                    <Input required type="file"  id="file" className="btn" 
                                        onChange={(e)=>this.formChange(e)} ></Input>
                                </FormGroup>
                                <Button type="button" color="success" value="submit" onClick={()=> this.handleSubmit()}>Upload</Button>
                            </Form>
                        </ModalBody>
                    </Modal>

                </Table>
                        



                    
            </div>
        )
    }
}