import React, { Component } from 'react';
import { Table, Button,Modal,ModalHeader,ModalBody,Input,Form,FormGroup, Label } from 'reactstrap';

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
        }
        this.onToggleModal = this.onToggleModal.bind(this) ;
        this.formChange = this.formChange.bind(this);
    }

    onToggleModal(){
        this.setState(
            {
                isModlaOpen: !this.state.isModlaOpen
                
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
                let fileHash = "";
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
        let RowsSend = temp.map((row) =>{
            return (
                <tr key={row.id}>
                   <td >{row.name}</td> 
                   <td >{row.fileName}</td>
                   <td >{row.fileType}</td>
                   <td style={{maxWidth:"250px",wordBreak:"break-all"}}>{row.hash}</td>
                   <td style={{maxWidth:"250px",wordBreak:"break-all"}}>{row.description}</td>
                    
                    <td>
                        <Button color="success"  onClick={this.onToggleModal}>
                            <i class="fa fa-paper-plane mr-2" aria-hidden="true"></i>
                            Send
                        </Button>


                    </td>
                </tr>
            );
        }) 
        

        return(
            <div className="mt-5 container ">
                

                <Table className="mt-3 table-striped table-hover table-fit " >
                    <thead className="thead-dark">
                        <tr>
                            <th data-field="id" data-sortable="true" scope="col">Requester Name</th>
                            <th data-field="name" data-sortable="true" scope="col">Requeted File</th>
                            <th data-field="type" data-sortable="true" scope="col">File Type</th>
                            <th data-field="hash" data-sortable="true" scope="col">File Hash</th>
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
                                    <Input required type="file"  id="file" className="btn"  value={this.state.file} 
                                        onChange={(e)=>this.formChange(e)} ></Input>
                                </FormGroup>
                                <Button type="submit" color="success" value="submit" onSubmit={(e)=> this.handleSubmit(e)}>Upload</Button>
                            </Form>
                        </ModalBody>
                    </Modal>

                </Table>
                        



                    
            </div>
        )
    }
}