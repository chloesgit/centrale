import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import 'antd/dist/antd.css'
import  {Menu}  from 'antd'
import Icon from '@ant-design/icons';



import Home from '../Home/Home'
import Movie from '../Movie/Movie'
import Showfilms from '../Showfilms/Showfilms'




export default function Navibar () {
  return (
    <Router >
    <Menu mode='horizontal'>
      <Menu.Item >
        <Link to='/'>
          <Icon type='home' /> Home
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='popular'>
          <Icon type='heart-o' /> Popular
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='upcoming'>
          <Icon type='like-o' /> Up Coming
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='nowplaying'>
          <Icon type='rocket' /> Now Playing
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='toprated'>
          <Icon type='star-o' /> Top Rated
        </Link>
      </Menu.Item>
    </Menu>
    <Switch>

    <Route  exact path='/' component={Home}/>

    <Route  exact path='/popular' render={
      props => (<Showfilms currentPage='Popular' category='popular'{...props} />)}/>
    
    <Route  exact path='/upcoming' render={
      props => (<Showfilms currentPage='Up Coming' category='upcoming' {...props} />
    )} />

    <Route  exact path='/nowplaying' render={
      props => (<Showfilms currentPage='Now Playing' category='now_playing' {...props} />
    )} />
    <Route  exact path='/toprated' render={
      props => (<Showfilms currentPage='Top Rated' category='top_rated' {...props} />
    )} />
    <Route  exact path='/search/:query' render={
      props => (<Showfilms currentPage='Search Results' {...props} />
    )} />
    <Route  exact path='/movie/:id' component={Movie} ></Route >
  </Switch>
    </Router >
  )
}
