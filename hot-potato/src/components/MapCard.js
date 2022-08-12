import { useEffect, useState } from "react";

function MapCard(props){
    const { map } = props
    const [ selectedMap, setSelectedMap ] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3032/maps/${map.map_id}`)
        .then(res => res.json())
        .then((data) => {
            setSelectedMap(data)
        })
    }, [])


    return (
        <div className="map-container">
            <div>
                <img alt="oh no!" src={map.map_img} className="map-image"></img>
            </div>
            <div>
                <h3>{map.name}</h3>
            </div>
        </div>
    )
}

export default MapCard;
