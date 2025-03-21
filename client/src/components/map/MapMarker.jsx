// src/components/map/MapMarker.jsx
import React, { useEffect, useRef } from "react";

const MapMarker = ({ map, destination, isSelected, onClick }) => {
    const markerRef = useRef(null);

    useEffect(() => {
        if (!map || !destination || !window.google || !window.google.maps) return;

        // Fetch location data from RapidAPI
        const fetchLocationData = async () => {
            try {
                const response = await fetch("https://google-api31.p.rapidapi.com/map", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-rapidapi-host": "google-api31.p.rapidapi.com",
                        "x-rapidapi-key": "YOUR_RAPIDAPI_KEY"
                    },
                    body: JSON.stringify({
                        text: destination.name,
                        place: destination.place || "",
                        street: "",
                        city: "",
                        country: "",
                        state: "",
                        postalcode: "",
                        latitude: destination.lat || "",
                        longitude: destination.lng || "",
                        radius: ""
                    })
                });
                const data = await response.json();
                console.log("Fetched location data:", data);
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        };

        fetchLocationData();

        // Create marker only if it doesn't exist
        if (!markerRef.current) {
            markerRef.current = new window.google.maps.Marker({
                position: { lat: destination.lat, lng: destination.lng },
                map,
                title: destination.name,
                icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" // Default icon
            });

            markerRef.current.addListener("click", () => onClick(destination));
        }

        // Update marker icon when selection changes
        markerRef.current.setIcon(
            isSelected
                ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"  // Selected marker
                : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"   // Default marker
        );

        return () => {
            if (markerRef.current) {
                markerRef.current.setMap(null);
                markerRef.current = null;
            }
        };
    }, [map, destination, isSelected, onClick]);

    return null; // The marker is added to the map directly
};

export default MapMarker;
