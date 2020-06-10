import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import 'antd/dist/antd.css'
import  {Menu}  from 'antd'
import {HomeOutlined, SearchOutlined, StarOutlined, PlusOutlined } from '@ant-design/icons'




import Icon from '@ant-design/icons'
import Home from '../Home/Home'
import Movie from '../Movie/Movie'
import Showfilms from '../Showfilms/Showfilms'

import CreateFilm from '../Create/CreateFilm'


export default function Navibar () {
  return (
    <Router >
    <Menu mode='horizontal'>
      <Menu.Item >
        <Link to='/'>
          <HomeOutlined style={{ position: "relative", bottom: "3px"}} /> Home
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='popular'>
          <SearchOutlined style={{ position: "relative", bottom: "3px"}} /> Search
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='toprated'>
          <StarOutlined style={{ position: "relative", bottom: "3px"}}/> Top Rated
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/create'>
          <PlusOutlined style={{ position: "relative", bottom: "3px"}} /> Create
        </Link>
      </Menu.Item>
    </Menu>
    <Switch>
    <Route exact path='/popular' component={Home} />
    <Route exact path='/' render={
      props => (<Showfilms currentPage='Popular' category='popular'{...props} />)} />
    <Route exact path='/upcoming' render={
      props => (<Showfilms currentPage='Up Coming' category='upcoming' {...props} />)} />
    <Route exact path='/toprated' render={
      props => (<Showfilms currentPage='Top Rated' category='top_rated' {...props} />)} />
    <Route exact path='/search/:query' render={
      props => (<Showfilms currentPage='Search Results' {...props} />)} />
    <Route exact path='/movie/:id' component={Movie} />
    <Route exact path='/create' render={
      props => (<CreateFilm />)} />
  </Switch>
    </Router >
  )
}
