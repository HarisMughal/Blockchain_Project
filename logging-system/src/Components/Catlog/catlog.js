import React, { Component } from 'react';
import { Table, Button,Modal,ModalHeader,ModalBody,Input,Form,FormGroup, Label } from 'reactstrap';
import "./catlog.css";
import sha256 from 'crypto-js/sha256';


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
            isModlaOpen: false,

            description : "",
            
        };


        this.onToggleModal = this.onToggleModal.bind(this) 
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formChange = this.formChange.bind(this);
        
;    };

    onToggleModal(){
        this.setState(
            {
                isModlaOpen: !this.state.isModlaOpen
                
            }
            
        );

    }

    handleSubmit(event){
        event.preventDefault();
        // console.log(this.state.file);
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
        const Rows = temp.map((row) =>{
            return (
                <tr key={row.id}>
                   <td >{row.id}</td> 
                   <td >{row.fileName}</td>
                   <td >{row.fileType}</td>
                   <td style={{maxWidth:"250px",wordBreak:"break-all"}}>{row.hash}</td>
                   <td style={{maxWidth:"250px",wordBreak:"break-all"}}>{row.description}</td>
                    
                    <td>
                        <i className="fa fa-trash" aria-hidden="true" style={{fontSize:"20px", color:"red"}}
                          onClick={this.onRowDel}  ></i>
                        <i className="fa fa-upload ml-3" aria-hidden="true" onClick={this.onToggleModal}></i> 

                    </td>
                </tr>
            );
        }) 
        return(
            <div className="container mt-5">
                <div className="d-flex p-2 " >
                    <Button outline color="primary" className="ml-auto" onClick={this.onToggleModal}>
                        <i className="fa fa-upload" aria-hidden="true"></i> Upload
                    </Button>
                    <Modal isOpen={this.state.isModlaOpen} toggle={this.onToggleModal}>
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
                                <Button type="submit" color="success" value="submit" onSubmit={(e)=> this.handleSubmit(e)}>Upload</Button>
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
                            <th data-field="id" data-sortable="true" scope="col">id</th>
                            <th data-field="name" data-sortable="true" scope="col">File Name</th>
                            <th data-field="type" data-sortable="true" scope="col">File Type</th>
                            <th data-field="hash" data-sortable="true" scope="col">File Hash</th>
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