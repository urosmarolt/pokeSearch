import React, { useRef, useState } from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import fetchAPIData from '../../ api/api';
import PokeCard from '../PokeCard/PokeCard';


export default function SearchField() {
    
    const inputField = useRef(null)
    const [ resultData, setResultData ] = useState()

    const handleSubmit = () => {
        const input = inputField.current
        fetchAPIData(input.pokemonQuery.value)
            .then(data => {
                console.log(data)
                setResultData(data)
        })
    }

    return (
        <>
            <div>
                <InputGroup className="mb-3">
                    <form ref={inputField}>
                        <FormControl
                        placeholder="Search for pokemon"
                        aria-label="search-for-pokemon"
                        aria-describedby="search"
                        name='pokemonQuery'
                        />
                    </form>
                    <Button 
                        variant="outline-secondary" 
                        id="submit"
                        onClick={() => {
                            handleSubmit()
                        }}
                    >
                        Search
                    </Button>
                </InputGroup>
            </div>
            <div>
                {resultData &&<PokeCard info={resultData} />}
            </div>
        </>
        
    )
}
