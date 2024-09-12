import React, { useEffect, useRef, useState } from 'react'
import './Autocomplete.css'
type AutocompleteValueProps = {
    value: string;
    id: string;
}

type AutocompleteProps = {
    input: string;
    setInput : (input:string) => void;
    setIsOpen : (close:boolean) => void;
}

// on entre la valeur de l'input initial et la function pour changer cette valeur quand on en choisi une
// lorsque la valeur initial à plus de 3 lettres alors on lance la recherche a l'api en await 
// on affiche les résultats dans une liste déroulante en bulle
// on peut sélectionner une valeur et la mettre dans l'input


const Autocomplete = ({input, setInput, setIsOpen} : AutocompleteProps) => {
    
    const [ currentInput, setCurrentInput ] = useState();
    
    const bulleRef = useRef(null);
    
    const jaws_token = import.meta.env.VITE_JAWS_KEY

    const [ responses, setResponses] = useState();

    const fetchResponses = async () => {
        const response = await fetch(`https://api.jawg.io/places/v1/search?access-token=${jaws_token}&text=${input}&boundary.country=FRA`);
        const data = await response.json();
        console.log(data.features);
        return setResponses(data.features)
    }

    const SearchLine = ({value}: AutocompleteValueProps)=> {
        
        const handleClick = () => {
            setCurrentInput(value);
            setInput(value);
            setIsOpen(false);
            if(bulleRef.current){
              setIsOpen(false);
            }
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
    
    useEffect(() => {
        if(currentInput === input){
            setIsOpen(false);
        }
    }, [currentInput,input])

  return (
    <div
        className='autocomplete-bull-container'
        ref={bulleRef}
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