import { useEffect, useState } from 'react';
import './Map.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { LatLngExpression } from 'leaflet';



type MapProps = {
    popUpMessage: string,
    pos : number[]
    }

const access_token = import.meta.env.VITE_JAWG_KEY

const Map = ({popUpMessage, pos}:MapProps) => {


    const [ positionInitial, setPositionInitial ] = useState([47.46, 2.67]);


      
          
    useEffect(() => {
        if (pos && pos.length === 2 && pos[0] !== null && pos[1] !== null) {
            setPositionInitial(pos);
        } else {
            console.warn("Pas de position valide.");
        }
    }, [pos]);



  return (
    <div
    className="map-container"
    >
        <MapContainer 
            center={pos as LatLngExpression} 
            zoom={5} 
            scrollWheelZoom={false}
            style={{height: "100%", width: "100%"}}
        >
            <TileLayer
                attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>'
                url={`https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}.png?access-token=${access_token}`}
                />
            <Marker position={pos as LatLngExpression}>
                <Popup>{popUpMessage}</Popup>
            </Marker>
        </MapContainer>
    </div>
  )
}

export default Map;