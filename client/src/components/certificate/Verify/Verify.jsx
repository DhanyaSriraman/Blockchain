import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
import web3 from '../../../getWeb3';
// import CertificateContract from '../../../contracts/Certificate.json';
import FailedBlockchain from '../../other/error/failed/Failed';
import CertificateContract from '../../../contracts/Certificate.json';

class Verify extends Component{

    constructor(props) {
        
        super(props);

        this.state = {
            fname: '',
            lname: '',
            blockId: '',
            cgpa:'',
            courseName: '',
            issuingAuthority: '',
            issueDate: '',
            web3: null,
            account: '',
            receipt: null,
            isReceiptGenerated: false,
            isLoading: false,
        }
        this.loadBlockchain = this.loadBlockchain.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("Inside addCertificate")
        this.loadBlockchain();
    }
    async loadBlockchain() {

        console.log("Inside loadBlockcahin")
        const givenProvider = await web3.givenProvider;
        console.log('web3  ::::', web3);

        if(givenProvider !== null) {
            this.setState({
                isConnected: true,
            });
        }
        console.log("passed 1")

        if(this.state.isConnected) {
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
           
           // const accounts = await web3.eth.requestAccounts();

            if(accounts === undefined) {
                this.setState({
                    isFailed: true
                });
            }
            console.log(accounts);
            console.log('metamask account :-', accounts[0]);
            await web3.eth.accounts.wallet.add(accounts[0]);

            console.log("passed 2")
            // const networkId = await web3.eth.net.getId();
            // const deployedNetwork = CertificateContract.networks[networkId];
            // const instance = new web3.eth.Contract(
            //     CertificateContract.abi,
            //     deployedNetwork && deployedNetwork.address,
            // );

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = CertificateContract.networks[networkId];
            const instance = new web3.eth.Contract(
                CertificateContract.abi,
                deployedNetwork.address
            );

            this.setState({
                web3,
                account: accounts[0],
                contract: instance
            });
            console.log(this.state.contract.address+' passed 1')
        }
    }

    handleChange(event) {
        let change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    }
    async handleSubmit(event) {
        
        
        
         event.preventDefault();

        this.setState({
            isLoading: true,
        });

        console.log("In here");

        const InputDataDecoder = require('ethereum-input-data-decoder');
        const abi= CertificateContract.abi;
        const decoder= new InputDataDecoder(abi);
        // const provider = ethers.getDefaultProvider();
    //    const abicoder=ethers.utils.AbiCoder(abi);
        const block = await web3.eth.getBlock(this.state.blockId);
        if(block && block.transactions){
            console.log("Inside block")
            for(let tx of block.transactions){
                let trans=await web3.eth.getTransaction(tx);
                console.log(trans.from);
                // console.log(trans.value);
                // let stringFromHexString = ethers.utils.toUtf8String(trans.input);
                console.log(web3.utils.toAscii(trans.input));

           const result= decoder.decodeData(trans.input);
           console.log(result);
           result.inputs.forEach(ele => {
            console.log(ele);
           })
        //    console.log((new String(result.inputs[3]).valueOf())== (new String(this.state.courseName).valueOf()) );
        //    console.log(result[0]===this.state.fname+' '+ this.state.lname)
        //    console.log(result[3]===this.state.courseName)
        //    console.log(result[4]===this.state.issuingAuthority)
           if((new String(result.inputs[2]).valueOf())== (new String(this.state.cgpa).valueOf()) && (new String(result.inputs[0]).valueOf())==(new String((this.state.fname+' '+ this.state.lname)).valueOf())&& (new String(result.inputs[3]).valueOf())==(new String(this.state.courseName).valueOf()) && (new String(result.inputs[4]).valueOf())==(new String(this.state.issuingAuthority).valueOf())){
            swal({
                text: "Verified",
                icon: "success"
              });
           }
           else{
            swal({
                text: "Malpractice",
                icon: "error"
              });
          }

         //  console.log(result.inputs[2]);
                // console.log(data);
                // const decodedInput= ethers.utils.parseTransaction({data : trans.input, value: trans.value})
                // console.log(decodedInput.fname);
            }
        }
        else{
            console.log("Block empty")
        }
    }

    render () {
        if(!this.state.isConnected) {
            return <FailedBlockchain error="Please check your Metamask is working and you are logged in !" />
        }
        else {
            return (
                <div>
                    <div className="form-title">
                        <h1>Verify Certificate</h1>
                    </div>
                <form className="form">
                        <div className="form-group row">
                            <label htmlFor="fname" className="col-sm-4 col-form-label">Candidate First Name: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fname"
                                    value={this.state.fname}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="lname" className="col-sm-4 col-form-label">Candidate Last Name: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lname"
                                    value={this.state.lname}
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="blockId" className="col-sm-4 col-form-label">Block ID: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="blockId"
                                    value={this.state.blockId}
                                    onChange={this.handleChange}
                                    placeholder="e.g. 12ac-df4g-gh7t"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="courseName" className="col-sm-4 col-form-label">Course Name: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="courseName"
                                    value={this.state.courseName}
                                    onChange={this.handleChange}
                                    placeholder="e.g. Computer Science"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="issuingAuthority" className="col-sm-4 col-form-label">Institute name: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="issuingAuthority"
                                    value={this.state.issuingAuthority}
                                    onChange={this.handleChange}
                                    placeholder="e.g. MIT"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="cgpa" className="col-sm-4 col-form-label">Cgpa: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cgpa"
                                    value={this.state.cgpa}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div><br />
                       
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Verify Certificate</button>
                    </form>
                    </div>)
}
    }
}
export default Verify;
