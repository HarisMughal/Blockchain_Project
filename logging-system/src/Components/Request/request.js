import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { Crypt, RSA } from 'hybrid-crypto-js';
import axios from 'axios';

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

export default class Request extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }

        var crypt = new Crypt();
        var rsa = new RSA();
        var message = 'Hello world!';
 
        // Encryption with one public RSA key
        var encrypted = crypt.encrypt('-----BEGIN PUBLIC KEY-----\
        MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgG7p3Up/DyWhbj/c/vGTHzOJ8k1e\
2HM90Svm9oP8M8QaRPZIIhznoXtbOIEOWmh3eEX4UsOxzuE5FyMDtcLxNt6mUN24\
DtMIueS0FY1vgXl+PzSElgwnrFbtyiqOcCYGRMO0W8zimDeqnUxvOX5sKM0kFKDV\
fI9mWwGwuAkuA5WVAgMBAAE=\
        -----END PUBLIC KEY-----' ,message);
        try{
        var decrypted = crypt.decrypt("-----BEGIN RSA PRIVATE KEY-----\
        MIICWgIBAAKBgG7p3Up/DyWhbj/c/vGTHzOJ8k1e2HM90Svm9oP8M8QaRPZIIhzn\
        oXtbOIEOWmh3eEX4UsOxzuE5FyMDtcLxNt6mUN24DtMIueS0FY1vgXl+PzSElgwn\
        rFbtyiqOcCYGRMO0W8zimDeqnUxvOX5sKM0kFKDVfI9mWwGwuAkuA5WVAgMBAAEC\
        gYAEfWkc4+ncDx3kbfDQHLGNp47sfONsPtth2JawHxyFWr7h7WecHfBWiwnNh6Q3\
        SGbRBk1raJ5EVchO/Y51FsiuypKVIEHI3Tok5B1pSMEmML1fv6mZa6qvoqG9mL7E\
        enTugcJs4X6CVsD06pEbembeAeTOtD2twj+Bw4OhliwPIQJBANu2IMO5UKj9qzwC\
        m0z2A+UIKKFKjJDvxdyHiPJm9amv7mDFFp6sd3fs207NEaf0D3X2Enyz9ldXoGsD\
        jC+TpJ0CQQCBO4bu16swpSagq0Wu5wm6c4Babp1IkNNUGD+GMWfTCX+rTw0eQBpl\
        IJmzSTM04NkC3AN8i85tW/X35G+yVldZAkAf8Gbs7OiL2GxnCd33nx/L0JbPc53h\
        h+mUeGNxEYSOyVN238+8+0dWuKjc2LTDXJhOxpnDZQnfgo6AYACl/emFAkBXW3LZ\
        zwXUiz7ySvR+x4SG+f6gordFT0jbRsziHFGPkZMwrO40LabqB0B+thOcQgXP7gOZ\
        VDRFLm21lUB/7+d5AkASAVJxC0BHD788nT3Jy/oiC3dzGHDV/PMUwmCQMmsLz0BR\
        dY9LE2OWWYwSNUm1CPPOki4qDb1IfcwY3OLmqPAC\
        -----END RSA PRIVATE KEY-----", encrypted);
 
        // Get decrypted message
        var message = decrypted.message;

        console.log(message);
        }
        catch{
            console.log("error");
        }
 
          
          
    }

    componentDidMount()
    {
        let user_id = localStorage.getItem('id');
        axios.get(`http://localhost:3000/api/getOtherData/${user_id}`)
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

    render(){
        let RowsMake = this.state.data.map((row) =>{
            return (
                <tr key={row.id}>
                    <td >{row.company_name}</td> 
                   <td >{row.name}</td> 
                   <td >{row.fileName}</td>
                   <td >{row.fileType}</td>
                   {/* <td style={{maxWidth:"250px",wordBreak:"break-all"}}>{row.hash}</td> */}
                   <td style={{maxWidth:"250px",wordBreak:"break-all"}}>{row.description}</td>
                    
                    <td>
                        <Button>
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
                            <th data-field="id" data-sortable="true" scope="col">Company Name</th>
                            <th data-field="name" data-sortable="true" scope="col">File Name</th>
                            <th data-field="type" data-sortable="true" scope="col">File Type</th>
                            {/* <th data-field="hash" data-sortable="true" scope="col">File Hash</th> */}
                            <th  scope="col">Description</th>
                            <th scope="col">Options    </th>
                        </tr>
                    </thead>
                    <tbody>
                        {RowsMake}
                    </tbody>

                </Table>
            </div>
        );
    }
}
