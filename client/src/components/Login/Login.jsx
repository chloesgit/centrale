import React, { Component } from 'react'
import { Input, Col, Row, Button } from 'antd'

import Api from '../../Services/dataService'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import MultiSelect from "react-multi-select-component";

import { instanceOf } from 'prop-types';
import Cookies from 'universal-cookie';

export default class Login extends Component {
    constructor (props) {
      super(props)
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSend = this.handleSend.bind(this);
      this.loginAttempt = "undefined";
      this.state = {
        value: '',
        valueDes : '',
        valueDate : '',
        valueGenre : [],
        fireRedirect: false
      }

    };

    handleSend  = (e)=>  {

        //if(api.loginUser() == True):

        const cookies = new Cookies();
 
    cookies.set('myCat', 'Pacman', { path: '/' });



    // Api.addFilm(this.state.value, this.state.valueDes, this.state.valueDate, convertJson(JSON.parse(Genre)))
    }
    handleChange(event) {
      this.state.value = event.target.value;
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.setState({ fireRedirect: true })
    }
   ShowResult =(e) =>
   {
       if (this.loginAttempt == "undefined")
        return ""
       if (this.loginAttempt == "Success")
       return "logged in successfully"
       if (this.loginAttempt == "fail")
       return "Failed to login"
        
   }
    render () {
      
      return (
<Form>
            
    <Form.Row>
        <Form.Group as={Col} controlId="Login" value={this.state.value} onChange={this.handleChange}>
            <Form.Label> --Login  </Form.Label>
            <div> -</div>
            <Form.Control   as="textarea" rows="1" Columns="1" width="15%"/>
            <div>- </div>
        <Button variant="primary" type="submit" onClick={ this.handleSend}>>
            Login
            </Button>
        <Form.Label >  </Form.Label>
        </Form.Group>
    </Form.Row>
</Form>
  
   
      )
    }
  }
  