import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/other/Navbar';
import Home from './components/other/Home/Home';
import AddCertificate from './components/certificate/add/AddCertificate';
import ViewCertificate from './components/certificate/view/ViewCertificate';
import GetTransactionDetails from './components/certificate/transaction/GetTransactionDetails';
import Page404 from './components/other/error/page-not-found/Page404';
import HowItWorks from './components/certificate/how it works/HowItWorks';
import Login from './components/other/Login_Inst/Login'
import Register from './components/other/Register_inst/Register'
import LoginStudent from './components/other/Login_student/LoginStudent';
import RegisterStudent from './components/other/Register_student/RegisterStudent';
import Verify from './components/certificate/Verify/Verify';
import LoginVerify from './components/other/Login_verify/LoginVerify';
import RegisterVerify from './components/other/Register_verify/RegisterVerify';
class Routes extends Component {
  render () {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/add-certificate" component={ AddCertificate } />
          <Route path="/view-certificate" component={ ViewCertificate } />
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/register1" component={ RegisterStudent } />
          <Route path="/login1" component={ LoginStudent } />
          <Route path="/verify" component={Verify}></Route>
          <Route path="/login2" component={LoginVerify}></Route>
          <Route path="/register2" component={RegisterVerify}></Route>
          {/* <Route path="/get-transaction-details" component={ GetTransactionDetails } /> */}
          {/* <Route path="/how-it-works" component={ HowItWorks } /> */}
          <Route component={ Page404 } />
        </Switch>
      </BrowserRouter>
    );
  };
};

export default  Routes;
