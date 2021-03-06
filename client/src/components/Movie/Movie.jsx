/* @flow */
import React from 'react'
import { Row, Col, Rate, Tag } from 'antd'
import YouTube from 'react-youtube'

import Utils from '../../Services/utilsService'
import Api from '../../Services/dataService'

import './Movie.css'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default class Movie extends React.Component{
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: '',
      description: '',
      urlImage: '',
      stars: 0,
      genres: [],
      release_date: '',
      videoId: 0,
      uuid : "",
       
    }
    
  }
  
  componentDidMount () {
    const idFilm = this.props.match.params.id
    Api.getMovieById2(idFilm)
        .then(data => {
          console.log('dataApi', data)
          this.setState({
            urlImage: data.poster_path,
            name: data.title,
            stars: data.vote_average / 2,
            description: data.overview,
            genres: data.genres,
            release_date: data.release_date,
            //videoId: data.videos.results['0'].key,
            uuid: String(data.uuid) 
          })
        })
  }
  handleChange(event) {

    console.log(JSON.stringify(event));
    console.log(cookies.get("LoggedIn"))
    Api.sendNote(cookies.get("username"),event*2, this.state.uuid)
    setTimeout(() => {
      var result = cookies.get('ResultRequete');
      console.log(result)
      if(result == "vote success")
      {
        console.log("successfuly voted")
      }
      else
      {
        console.log("already voted on this movie")
      }
    }, 1000);
  }

  render () {
    
    return (
      <Row>
        <Col span={12} offset={1}>
          <h1>{this.state.name}</h1>
          <hr />
          <strong> Description: </strong>
          <p>{this.state.description}</p>
          <hr />
          <div className='Genre'>
            <span className='genereTitle'>
              <strong>Genres: </strong>
            </span>
            

            {this.state.genres.map(genere => <Tag  color={Utils.randomColor()} key={1}>{genere}</Tag>)}
          </div>
          <Rate className='rate' disabled= {cookies.get("username") == "-"} value={this.state.stars} onChange= {this.handleChange} />

          <hr />
          <div className='trailer'>
            <strong> Trailer: </strong>
          </div>
          <YouTube videoId={this.state.videoId} />
        </Col>        
        <Col span={10} offset={1}>
          <img alt={this.state.name} width='85%' src={`https://image.tmdb.org/t/p/w500${this.state.urlImage}`} />
        </Col>

      </Row>
    )
  }
}
