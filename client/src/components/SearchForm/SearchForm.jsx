import React, { Component } from 'react'
import { Input, Col, Row } from 'antd'
import { Redirect } from 'react-router-dom'
import './SearchForm.css'
import Button from 'react-bootstrap/Button'
import Api from '../../Services/dataService'
import  {FileSearchOutlined } from   '@ant-design/icons'
export default class SearchForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      fireRedirect: false
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    Api.getFilmList()
    this.setState({ fireRedirect: true })
  }

  render () {
    const { fireRedirect, value: query } = this.state
    return (
      <Row>
        <Col span={14} offset={5}>
          <form onSubmit={this.handleSubmit}>
            <Input className='input' style={{borderColor: "#90b5bb" }}placeholder='Rechercher un film' onChange={this.handleChange} />
            <Button style={{backgroundColor:"#036f7b",color:"white"}}variant="Search">Search</Button>{' '}
          </form>
        </Col>
        {
        fireRedirect && query &&
        <Redirect to={`/search/${query}`} push />
        }
      </Row>
    )
  }
}
