import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { useState } from "react";

const MapSelector = ({ selectedCoordinates, handlePickLocation, setSelectedCoordinates }) => {
    const [mapCenter, setMapCenter] = useState({ lat: -25.478554, lng: 134.113335 });
    const [zoom, setZoom] = useState(4.7);

    const handleApiLoaded = (map, maps) => {
        map.addListener('click', (e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setSelectedCoordinates({ lat, lng });
            setMapCenter({ lat, lng });
        });

        map.addListener('dragend', () => {
            const newCenter = map.getCenter();
            setMapCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
            setSelectedCoordinates({ lat: newCenter.lat(), lng: newCenter.lng() });
        });

        map.addListener('zoom_changed', () => {
            setZoom(map.getZoom());
        });
    };

    return (
        <>
            <div style={ { height: '83%', width: '100%' } }>
                <GoogleMapReact
                    bootstrapURLKeys={ { key: "" } }
                    center={ mapCenter }
                    zoom={ zoom }
                    yesIWantToUseGoogleMapApiInternals={ true }
                    onGoogleApiLoaded={ ({ map, maps }) => handleApiLoaded(map, maps) }
                >
                    <Marker
                        lat={ selectedCoordinates.lat }
                        lng={ selectedCoordinates.lng }
                        text=""
                    />
                </GoogleMapReact>
            </div>

            <div className="w-full flex justify-center mt-5 mb-2">
                <button onClick={ handlePickLocation } className="bg-primary px-4 py-3 rounded-lg text-white">
                    Pick Location
                </button>
            </div>
        </>
    );
}

export default MapSelector;