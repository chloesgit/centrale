import React, { Component } from 'react'
import { Input, Col, Row, Button } from 'antd'
import { Redirect } from 'react-router-dom'
import './SearchForm.css'
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
            <Input className='input' placeholder='Search a film...' onChange={this.handleChange} />
            <Button type="primary" onClick={this.handleSubmit}>
              <FileSearchOutlined/>
              Search</Button>
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
