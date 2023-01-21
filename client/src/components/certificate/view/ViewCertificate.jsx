import React, { Component } from 'react';

import web3 from '../../../getWeb3';
// import CertificateContract from '../../../contracts/Certificate.json';
import FailedBlockchain from '../../other/error/failed/Failed';

import CertificateContract from '../../../contracts/Certificate.json';

import './ViewCertificate.css';

class ViewCertificate extends Component {
    constructor(props) {
        super(props);
        // deployedNetwork.address
        this.state = {
            certificateId: '',
            blockId:' ',
            web3: null,
            contract: null,
            account: null,
            fname: '',
            lname: '',
            cgpa:'',
            courseName: '',
            issuingAuthority: '',
            issueDate: '',
            fullName: '',
            isFetched: false,
            isConnected: false,
        }

        this.loadBlockchain = this.loadBlockchain.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    componentDidMount() {
        this.loadBlockchain();
    }

    async loadBlockchain() {
        console.log('web3 provider ::::', await web3.givenProvider);
        const givenProvider = await web3.givenProvider;

        if(givenProvider !== null) {
            this.setState({
                isConnected: true,
            });
        }

        if(this.state.isConnected) {
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            console.log('accounts :-', accounts);

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

        const getCertificateParams = {
            account: this.state.account,
            id: this.state.certificateId,
        };
        console.log(getCertificateParams.id + ' '+ getCertificateParams.account+' pass 1 '+ this.state.contract)
        const contract = this.state.contract;

        const certificateDetailsResponse = await contract.methods.getCertificate(
            getCertificateParams.account,
            getCertificateParams.id).call(function(err,res){
                if(err)
                {
                console.log("Error occured "+err);
                }
                else
                console.log(res.fullName+" hey")
            }
                ).then((certificates)=>{
                return certificates
            })
    //    ).call().then({
    //          return : CertificateContract
    // }
    //     )
        console.log('passed wrong')

        console.log(new String(certificateDetailsResponse[0])+" pass");

        if(certificateDetailsResponse !== undefined) {
            this.setState({
                isFetched: true,  
            });
        }
        console.log('passed 3')
        this.setCertificateDetails(certificateDetailsResponse);
    }

    setCertificateDetails(certificateDetails) {

        const date = new Date(Number(certificateDetails[4])).toDateString()

        this.setState({
            fullName: certificateDetails[0],
            cgpa:certificateDetails[1],
            issuingAuthority: certificateDetails[2],
            courseName: certificateDetails[3],
            // blockId: certificateDetails[4],
            issueDate:date,
        });
        console.log('passed 4')
    }

    render () {
        if(!this.state.isConnected) {
            return (
                <FailedBlockchain error="Please check your Metamask is working and you are logged in !" />
            );
        } else {
            return (
                <div className="view-certificate">
                    {/* <div className="account-address">
                        <dl className="dl-horizontal row">
                            <dt className="col-5">Ethereum Account Address: </dt>
                            <dd className="col-7">{this.state.account}</dd>
                        </dl>
                    </div> */}
                      <div className="form-title">
                        <h1>View Certificate</h1>
                    </div>
                    <form className="form">
                    {/* <div className="form-group row">
                            <label htmlFor="account" className="col-sm-4 col-form-label">Enter Student account :</label>
                            <div className="col-sm-6">
                                <input
                                    type="address"
                                    className="form-control"
                                    name="account"
                                    value={this.state.account}
                                    onChange={this.handleChange} />
                            </div>
                    </div> */}
                        <div className="form-group row">
                            <label htmlFor="certificateId" className="col-sm-4 col-form-label">Enter Certificate ID: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="certificateId"
                                    value={this.state.certificateId}
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                    </form>
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.handleSubmit}>
                                Get Certificate
                        </button>
                    </div>
                    <div className="certificate-details">
                        {this.state.isFetched ?
                            <div className="details">
                                <h2 className="title">Certificate Details</h2>
                                <dl className="dl-horizontal row">
                                    <dt className="col-4">Full Name: </dt>
                                    <dd className="col-8">{this.state.fullName}</dd>
                                    <dt className="col-4">Certificate ID: </dt>
                                    <dd className="col-8">{this.state.certificateId}</dd>
                                    <dt className="col-4">Course Name: </dt>
                                    <dd className="col-8">{this.state.courseName}</dd>
                                    <dt className="col-4">Cgpa: </dt>
                                    <dd className="col-8">{this.state.cgpa}</dd>
                                    <dt className="col-4">Issuing Authority: </dt>
                                    <dd className="col-8">{this.state.issuingAuthority}</dd>
                                    <dt className="col-4">Issue Date: </dt>
                                    <dd className="col-8">{this.state.issueDate}</dd>
                                </dl>
                                <div className="extra-spacing-div"></div>
                            </div>
                             : null}
                    </div>
                </div>
            );
        }
    };
};

export default ViewCertificate;
