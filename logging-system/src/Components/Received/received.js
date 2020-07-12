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


export default class Received extends Component{



    render(){
        let RowsSend = temp.map((row) =>{
            return (
                <tr key={row.id}>
                   <td >{row.name}</td> 
                   <td >{row.fileName}</td>
                   <td >{row.fileType}</td>
                   {/* <td style={{maxWidth:"250px",wordBreak:"break-all"}}>{row.hash}</td> */}
                   <td style={{maxWidth:"250px",wordBreak:"break-all"}}>{row.description}</td>
                    
                    <td>
                        <Button color="danger"  onClick={this.onToggleModal}>
                            <i className="  fa fa-folder-open-o mr-2" aria-hidden="true"></i>
                            View in folder
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
                                <th data-field="id" data-sortable="true" scope="col">Respondant Name</th>
                                <th data-field="name" data-sortable="true" scope="col">Response File</th>
                                <th data-field="type" data-sortable="true" scope="col">File Type</th>
                                {/* <th data-field="hash" data-sortable="true" scope="col">File Hash</th> */}
                                <th  scope="col">Description</th>
                                <th scope="col">Options    </th>
                            </tr>
                        </thead>
                        <tbody>
                            {RowsSend}
                        </tbody>
    
                    </Table>
                </div>

        );
    }
}