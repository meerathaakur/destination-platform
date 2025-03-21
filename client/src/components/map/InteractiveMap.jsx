// src/components/map/InteractiveMap.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const InteractiveMap = ({ searchQuery }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (!mapRef.current || !window.google) return;

        if (!mapInstance.current) {
            mapInstance.current = new window.google.maps.Map(mapRef.current, {
                center: { lat: 37.7749, lng: -122.4194 }, // Default center (San Francisco)
                zoom: 5,
            });
        }
    }, []);

    useEffect(() => {
        if (!searchQuery) return;

        const fetchLocationData = async () => {
            try {
                const response = await axios.post("https://google-api31.p.rapidapi.com/map", {
                    text: searchQuery,
                    place: "",
                    street: "",
                    city: "",
                    country: "",
                    state: "",
                    postalcode: "",
                    latitude: "",
                    longitude: "",
                    radius: ""
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "x-rapidapi-host": "google-api31.p.rapidapi.com",
                        "x-rapidapi-key": "YOUR_RAPIDAPI_KEY"
                    }
                });
                setLocations(response.data.locations || []);
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        };

        fetchLocationData();
    }, [searchQuery]);

    useEffect(() => {
        if (!mapInstance.current || locations.length === 0) return;

        const map = mapInstance.current;
        const markers = [];

        locations.forEach((location, index) => {
            const marker = new window.google.maps.Marker({
                position: { lat: location.latitude, lng: location.longitude },
                map,
                title: location.name,
                label: `${index + 1}`
            });

            markers.push(marker);

            marker.addListener("click", () => {
                alert(`You clicked on ${location.name}`);
            });
        });

        return () => {
            markers.forEach(marker => marker.setMap(null));
        };
    }, [locations]);

    return (
        <div ref={mapRef} className="w-full h-full rounded-md" style={{ minHeight: "400px" }}>
            Loading map...
        </div>
    );
};

export default InteractiveMap;
