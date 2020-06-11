import React, { Component } from 'react'
import { Input, Col, Row, Button } from 'antd'
import options from "./exemple"
import Api from '../../Services/dataService'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import MultiSelect from "react-multi-select-component";

 
var Genre = '';

const ProperMulti: React.FC = (onChanges) => {
  const [value, setSelected] = React.useState([]);
  Genre = JSON.stringify(value)
    return (
    <div>
      <h1 className="genres">Genres</h1>
      
      <MultiSelect
      controlId = "stuff"
        options={options}
        value={value}
        onChange={setSelected}
        labelledBy={"Select"}>
        </MultiSelect>
    </div>
  );
};

function convertJson(entry)
{
  var listG = []
  for (var key in entry)
  {
    listG.push((entry[key]["value"]))
  }
  return listG
}



export default class CreateFilm extends Component {
  constructor (props) {
    super(props)
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);

    this.ref = React.createRef();
    
    this.state = {
      value: '',
      valueDes : '',
      valueDate : '',
      valueGenre : [],
      fireRedirect: false
    }
  };
  handleSend  = (e)=>  {
    console.log( this.state.value)
    console.log(this.state.valueDes)
    console.log(this.state.valueDate)
    console.log(convertJson(JSON.parse(Genre)))
   Api.addFilm(this.state.value, this.state.valueDes, this.state.valueDate, convertJson(JSON.parse(Genre)))
  }
  handleChange(event) {
    this.state.value = event.target.value;
  }
  handleChange2(event) {
    this.state.valueDes = event.target.value;
  }
  handleChange3(event) {
    this.state.valueDate = event.target.value;
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ fireRedirect: true })
  }
 
  render () {
    
    return (
      <Form>
        <Form.Row>
  <Form.Group as={Col} controlId="Namefilm" value={this.state.value} onChange={this.handleChange}>
    <Form.Label>Name  </Form.Label>
    <Form.Control   as="textarea" rows="1" width="5%"/>
  </Form.Group>

  <Form.Group as={Col} controlId="date" value={this.state.value} onChange={this.handleChange3}>
    <Form.Label>release_date  </Form.Label>
    <Form.Control as="textarea" rows="1" />
  </Form.Group>

  <Form.Group as={Col} controlId="Genre"   >
    <ProperMulti />  
    </Form.Group  >
  </Form.Row>


  <Form.Group controlId="Description" value ={this.state.valueDes} onChange={this.handleChange2} >
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="4" col="200"/>
  </Form.Group>

  <Form.Group>
    <Form.File id="picture" label="Image" />
  </Form.Group>

 <Button variant="primary" type="submit" onClick={ this.handleSend}>>
    Submit
  </Button>
  <Form.Group>
    <Form.File id="picture" label="upload a picture" />
  </Form.Group>
</Form>
    )
  }
}
