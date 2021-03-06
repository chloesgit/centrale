/* @flow */
import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import "./CardTemplate.css";
type Props = {
  name: number,
  date: string, 
  vote: number,
  image: number, 
  id: number
}


const CardTamplate = ({ name, date, vote, image, uuid }: Props) => (
  <Link to={'/movie/'+String(uuid)}>
    <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
      <div className='custom-image'>
        <img alt={name} width='100%' src={`https://image.tmdb.org/t/p/w500${image}`} />
      </div>
      <div className='custom-card'>
        <h2>{name}</h2>
        <p>{`Date: ${date}`}<br/>{` Note: ${vote}`}</p>
      </div>
    </Card>
  </Link>
)

export default CardTamplate
