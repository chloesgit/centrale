import React, { Component } from 'react'
import { Input, Col, Row, Button } from 'antd'
import { useAlert } from 'react-alert'
import Api from '../../Services/dataService'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import MultiSelect from "react-multi-select-component";
import answer from '../../Services/dataService'
import { instanceOf } from 'prop-types';
import Cookies from 'universal-cookie';
import SweetAlert from 'react-bootstrap-sweetalert';
import sleeps from "../../Services/utilsService"
import { Redirect } from "react-router-dom";

export default class SignUp extends Component  {
    
    constructor (props) {
      super(props)
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSend = this.handleSend.bind(this);
      this.loginAttempt = "undefined";
      this.handleChangeReponse =  this.handleChangeReponse.bind(this)
      this.updateContent = this.updateContent.bind(this)
      this.state = {
        value: '',
        valueDes : '',
        valueDate : '',
        valueGenre : [],
        reponse : "",
        redirect : null,
        message: "Default Content",
        fireRedirect: false
      }

    };
    updateContent = (e) => {
        this.setState({ message: e});
    }
    handleSend  = (e)=>  {

        //if(api.loginUser() == True):
        
        const cookies = new Cookies();
 
    cookies.set('myCat', 'Pacman', { path: '/' });

    let result =  Api.addUser(this.state.value)
    setTimeout(() => {
        const cookies = new Cookies();
        result = cookies.get('loginRes');
        console.log(result)
        if(result == "Username already exists")
        {
            
            this.updateContent("Username already exists")
            
        }
        else if (result == "Account created successfully")
        {
            this.updateContent("Success. Redirecting")
    
            result = cookies.set('username', this.state.value);
            window.location.replace("/");
            setTimeout(() => {
                this.setState({ redirect: "/" });
            },1000);
        }

      }, 1500);

    //console.log(answer)
    }
    handleLoginClick() {
        this.setState({value: "true"});
      }
    handleChangeReponse(e){
        this.setState( { value: "false"})
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
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
      return (
<Form>
            
    <Form.Row>
        <Form.Group as={Col} controlId="Username" value={this.state.value} onChange={this.handleChange}>
            <Form.Label> --User Name  </Form.Label>
            <div> -</div>
            <Form.Control   as="textarea" rows="1" Columns="1" width="15%"/>
            <div>- </div>
        <Button variant="primary" type="submit" onClick={ this.handleSend}>>
            Sign Up
            </Button> 
            <div> { this.state.message }</div>

            <Form.Control onChange={this.handleChangeReponse}  disabled = "true" value={this.state.reponse} as="textarea" rows="1" Columns="1" width="15%"/>
        </Form.Group>
    </Form.Row>
</Form>
  
   
      )
    }
  }
  