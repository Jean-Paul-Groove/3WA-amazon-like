import React, { useEffect, useRef, useState } from 'react'
import './Autocomplete.css'
type AutocompleteValueProps = {
    value: string;
    longitude: number;
    latitude: number;
}

type AutocompleteProps = {
    input: string;
    setInput : ({input, latitude, longitude}:{input:string, latitude:number, longitude:number}) => void;
    setIsOpen : (close:boolean) => void;
}

// on entre la valeur de l'input initial et la function pour changer cette valeur quand on en choisi une
// lorsque la valeur initial à plus de 3 lettres alors on lance la recherche a l'api en await 
// on affiche les résultats dans une liste déroulante en bulle
// on peut sélectionner une valeur et la mettre dans l'input


const Autocomplete = ({ input, setInput, setIsOpen }: AutocompleteProps) => {
    const [currentInput, setCurrentInput] = useState('');
    const [responses, setResponses] = useState<AutocompleteValueProps[]>([]);
    const bulleRef = useRef<HTMLDivElement | null>(null);
  
    const jawg_token = import.meta.env.VITE_JAWG_KEY;
  
    const fetchResponses = async () => {
      try {
        const response = await fetch(
          `https://api.jawg.io/places/v1/search?access-token=${jawg_token}&text=${input}&boundary.country=FRA`
        );
        const data = await response.json();
        console.log(data.features);
        setResponses(data.features);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const SearchLine = ({ value, latitude, longitude }: AutocompleteValueProps) => {


      const handleClick = () => {
        setCurrentInput(value);
        setInput( value, latitude, longitude );
        if(bulleRef.current){
            setIsOpen(false);
          }
      };
  
      return (
        <div onClick={handleClick} className="search-line">
          {value}
        </div>
      );
    };
  
    useEffect(() => {
      if (input.length > 3) {
        fetchResponses();
      }
    }, [input]);
  
    useEffect(() => {
        if(currentInput === input){
            setIsOpen(false);
        }
    }, [currentInput,input])
  
    return (
      <div className="autocomplete-bull-container" ref={bulleRef}>
        {responses &&
          responses.map((address) => {
            const { properties, geometry } = address;
            const coordinates = geometry?.coordinates;
            const [longitude, latitude] = coordinates;
  
            if (!latitude || !longitude) return null;
  
            return (
              <SearchLine
                key={properties.id}
                value={properties.label}
                longitude={longitude}
                latitude={latitude}
              />
            );
          })}
      </div>
    );
  };
  
  export default Autocomplete;
  