import React from 'react'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function PokeCard({ info }) {
  return (
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={info.sprite} />
      <Card.Body>
          <Card.Title aria-label='pokemon-name'>{info.name}</Card.Title>
          <Card.Text aria-label='pokemon-description'>
          {info.description}
          </Card.Text>
      </Card.Body>
      </Card>
  )
}
