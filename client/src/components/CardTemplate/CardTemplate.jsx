/* @flow */
import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'

type Props = {
  name: number,
  date: string, 
  vote: number,
  image: number, 
  uuid: number
}

const CardTamplate = ({ name, date, vote, image, uuid }: Props) => (
  <Link to={`/movie/${uuid}`}>
    <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
      <div className='custom-image'>
        <img alt={name} width='100%' src={`https://image.tmdb.org/t/p/w500${image}`} />
      </div>
      <div className='custom-card'>
        <h3>{name}</h3>
        <p>{`Name: ${name} || Votes: ${vote}`}</p>
      </div>
    </Card>
  </Link>
)

export default CardTamplate
