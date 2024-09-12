import React, { useEffect, useState } from 'react'
import './Autocomplete.css'
type AutocompleteValueProps = {
    value: string;
    id: string;
}

type AutocompleteProps = {
    input: string;
    setInput : (input:string) => void;
}

// on entre la valeur de l'input initial et la function pour changer cette valeur quand on en choisi une
// lorsque la valeur initial à plus de 3 lettres alors on lance la recherche a l'api en await 
// on affiche les résultats dans une liste déroulante en bulle
// on peut sélectionner une valeur et la mettre dans l'input


const Autocomplete = ({input, setInput} : AutocompleteProps) => {
    
    console.log('autocomplete');
    
    const jaws_token = import.meta.env.VITE_JAWS_KEY

    const [ responses, setResponses] = useState();

    const fetchResponses = async () => {
        const response = await fetch(`https://api.jawg.io/places/v1/search?access-token=${jaws_token}&text=${input}&boundary.country=FRA`);
        const data = await response.json();
        console.log(data.features);
        return setResponses(data.features)
    }

    const SearchLine = ({value, id}: AutocompleteValueProps)=> {
        
        const handleClick = () => {
            console.log("selected");
            setInput(value);
        }

        return(
            <div
                onClick={handleClick}
                className='search-line'
            >
                {value}
            </div>
        )
    }

    useEffect(() => {
            fetchResponses();
    }, [input])

  return (
    <div
        className='autocomplete-bull-container'
    >
        {responses && 
            (
                responses.map((value) => <SearchLine key={value.properties.id} id={value.properties.id} value={value.properties.label}/>
                )
            )   
        }
    </div>
  )
}

export default Autocomplete;