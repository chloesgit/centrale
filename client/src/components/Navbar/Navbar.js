import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import 'antd/dist/antd.css'
import  {Menu}  from 'antd'
import {HomeOutlined, SearchOutlined, StarOutlined, PlusOutlined, BgColorsOutlined } from '@ant-design/icons'



import Icon from '@ant-design/icons'
import Home from '../Home/Home'
import Movie from '../Movie/Movie'
import Showfilms from '../Showfilms/Showfilms'

import CreateFilm from '../Create/CreateFilm'


export default function Navibar () {
  return (
    <Router >
    <Menu style={{ backgroundColor: '#036f7b'}} mode='horizontal'>
      <Menu.Item >
        <Link to='/'style={{color:"white"}}>
          <HomeOutlined style={{ position: "relative", bottom: "3px"}} /> Home
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='popular' style={{color:"white"}}>
          <SearchOutlined style={{ position: "relative", bottom: "3px"}} /> Search
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='toprated'style={{color:"white"}}>
          <StarOutlined style={{ position: "relative", bottom: "3px"}}/> Top Rated
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/create'style={{color:"white"}}>
          <PlusOutlined style={{ position: "relative", bottom: "3px"}} /> Create
        </Link>
      </Menu.Item>
    </Menu>
    <Switch>
    <Route exact path='/popular' component={Home} />
    <Route exact path='/' render={
      props => (<Showfilms style={{backgroundColor:'bl'}} currentPage='Films populaires' category='popular'{...props} />)} />
    <Route exact path='/upcoming' render={
      props => (<Showfilms currentPage='Up Coming' category='upcoming' {...props} />)} />
    <Route exact path='/toprated' render={
      props => (<Showfilms currentPage='Recommandations' category='top_rated' {...props} />)} />
    <Route exact path='/search/:query' render={
      props => (<Showfilms currentPage='Search Results' {...props} />)} />
    <Route exact path='/movie/:id' component={Movie} />
    <Route exact path='/create' render={
      props => (<CreateFilm />)} />
  </Switch>
    </Router >
  )
}