import React, { Component } from 'react'
import CardTemplate from '../CardTemplate/CardTemplate'
import Api from '../../Services/dataService.js'
import { Row, Col } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import './Showfilms.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export default class Showfilms extends Component {
  constructor (props) {
    super(props)
    this.state = {
      results: []
    }
  }

  handleApiCall (props) {
    if (props.match.params.query) {
      Api.getSearch(props.match.params.query)
          .then(data => {
            this.setState({
              results: data.results
            })
          })
    } else {
      if(props.category == "Recommended")
      {
        Api.getRec(cookies.get("username")).then(data => {this.setState({results: data.results})})
      }
      else{
      //Api.getMovies(props.category) .then(data => { console.log(data)})
      Api.getFilmList(props.category).then(data => { console.log(data)})
      Api.getFilmList(props.category).then(data => {this.setState({results: data.results})})
     
    // Api.getRec(cookies.get("username")).then(data => { console.log(data)})
    }
  }
  }

  componentWillReceiveProps (nextProps) {
    this.handleApiCall(nextProps)
  }

  componentDidMount () {
    this.handleApiCall(this.props)
  }

  render () {
    return (
      <div>
        <header>
          <Row>
            <Col span={12} offset={6}>
              <h1 style={{color:"white",fontSize:80}} className='title'> <br/>{ this.props.currentPage } <br/><br/></h1>
            </Col>
          </Row>
          </header>
        <Row gutter={24}>
          {
            this.state.results.map(film => {
              return (
                <Col className='gutter-row' span={5} offset={1} key={uuidv4()}>
                  <CardTemplate
                    name={film.title}
                    date={film.release_date}
                    vote={film.vote_average}
                    image={film.poster_path}
                    uuid={film.uuid}
                  />
                </Col>
              )
            })
          }
        </Row>
      </div>
    )
  }
}
