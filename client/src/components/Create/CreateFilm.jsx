import React, { Component } from 'react'
import { Input, Col, Row, Button } from 'antd'


import Api from '../../Services/dataService'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';



export default class CreateFilm extends Component {
  constructor (props) {
    super(props)
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.state = {
      value: '',
      fireRedirect: false
    }
  };
  handleSend  = (e)=>  {
    console.log( this.state.value)
    Api.addFilm(this.state.value)
  }
  handleChange(event) {
    this.state.value = event.target.value;
 
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ fireRedirect: true })
  }
 
  render () {
    
    return (
      <Form>
  <Form.Group controlId="Namefilm" value={this.state.value} onChange={this.handleChange}>
    <Form.Label>Name  </Form.Label>
    <Form.Control as="textarea" rows="1" />
    
    
  </Form.Group>

  <Form.Group controlId="Description">
    <Form.Label>Description</Form.Label>
    
    <Form.Control as="textarea" rows="4" col="200"/>
   
  </Form.Group>
  
 
  <Button variant="primary" type="submit" onClick={ this.handleSend}>>
    Submit
  </Button>
</Form>
    )
  }
}
