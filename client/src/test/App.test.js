import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import nock from 'nock'

import App from '../App'
import PokeCard from '../components/PokeCard/PokeCard'
import fetchAPIData from '../ api/api';

  nock('http://localhost:3001/pokemon/')
    .persist()
    .get('/pikachu')
    .reply(200, {
        name: 'pikachu', 
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', 
        description: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
      }, 
      { 
        'Access-Control-Allow-Origin': '*', 
        'Content-type': 'application/json' 
    });
  

  test('Loads and displays input field and submit button', async () => {
    render(<App />)
    const inputField = screen.getByLabelText('search-for-pokemon')
    expect(inputField).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  })

  test('Loads and displays pokemon card', async () => {
    await fetchAPIData('pikachu')
       .then(data => {
            render(<PokeCard info={data} />)
            const name = screen.getByLabelText('pokemon-name')
            const description = screen.getByLabelText('pokemon-description')
        
            expect(name).toHaveTextContent(data.name)
            expect(description).toHaveTextContent(data.description) 
    })
  })

  test('API call', async () => {
       await fetchAPIData('pikachu')
       .then(({ name, sprite, description }) => {
            expect(name).toBe('pikachu')  
            expect(sprite).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png')  
            expect(description).toBe('When several of these POKéMON gather, their electricity could build and cause lightning storms.')  
        })
  })

