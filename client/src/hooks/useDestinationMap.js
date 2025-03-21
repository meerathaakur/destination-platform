import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for managing the interactive destination map
 * @param {Array} destinations - Array of destination objects with coordinates
 * @returns {Object} Map state and management functions
 */
const useDestinationMap = (destinations = []) => {
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 0 }); // Default center
    const [mapZoom, setMapZoom] = useState(2); // Default global view
    const [visibleDestinations, setVisibleDestinations] = useState(destinations);
    const [clusteredMarkers, setClusteredMarkers] = useState([]);

    // Update visible destinations when destinations prop changes
    useEffect(() => {
        setVisibleDestinations(destinations);

        // Set appropriate map center based on destinations
        if (destinations.length === 1) {
            setMapCenter({
                lat: destinations[0].coordinates.lat,
                lng: destinations[0].coordinates.lng
            });
            setMapZoom(8);
        } else if (destinations.length > 1) {
            // Find center of all destinations
            const bounds = calculateBounds(destinations);
            const center = {
                lat: (bounds.north + bounds.south) / 2,
                lng: (bounds.east + bounds.west) / 2
            };
            setMapCenter(center);

            // Calculate appropriate zoom level
            const zoom = calculateZoomLevel(bounds);
            setMapZoom(zoom);
        }

        // Create marker clusters for dense areas
        createMarkerClusters(destinations);
    }, [destinations]);

    /**
     * Calculate bounds of all destinations
     * @param {Array} locations - Array of locations with coordinates
     * @returns {Object} Bounds object with north, south, east, west
     */
    const calculateBounds = (locations) => {
        if (!locations || locations.length === 0) {
            return { north: 85, south: -85, east: 180, west: -180 };
        }

        const bounds = {
            north: -90,
            south: 90,
            east: -180,
            west: 180
        };

        locations.forEach(location => {
            const { lat, lng } = location.coordinates;
            bounds.north = Math.max(bounds.north, lat);
            bounds.south = Math.min(bounds.south, lat);
            bounds.east = Math.max(bounds.east, lng);
            bounds.west = Math.min(bounds.west, lng);
        });

        return bounds;
    };

    /**
     * Calculate appropriate zoom level based on bounds
     * @param {Object} bounds - Bounds object
     * @returns {number} Appropriate zoom level
     */
    const calculateZoomLevel = (bounds) => {
        const WORLD_DIM = { height: 256, width: 256 };
        const ZOOM_MAX = 16;

        const latRad = (lat) => {
            const sin = Math.sin(lat * Math.PI / 180);
            const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
            return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
        };

        const latDiff = latRad(bounds.north) - latRad(bounds.south);
        const lngDiff = (bounds.east - bounds.west) / 360;

        const latZoom = Math.floor(Math.log(800 / 256 / latDiff) / Math.LN2);
        const lngZoom = Math.floor(Math.log(1200 / 256 / lngDiff) / Math.LN2);

        return Math.min(latZoom, lngZoom, ZOOM_MAX);
    };

    /**
     * Create clusters for markers that are close together
     * @param {Array} locations - Array of locations with coordinates
     */
    const createMarkerClusters = (locations) => {
        if (!locations || locations.length === 0) {
            setClusteredMarkers([]);
            return;
        }

        // Simple clustering implementation
        const clusters = [];
        const processed = new Set();

        locations.forEach((location, index) => {
            if (processed.has(index)) return;

            const cluster = {
                center: location.coordinates,
                items: [location]
            };

            // Find nearby points
            locations.forEach((otherLocation, otherIndex) => {
                if (index === otherIndex || processed.has(otherIndex)) return;

                const distance = calculateDistance(
                    location.coordinates.lat,
                    location.coordinates.lng,
                    otherLocation.coordinates.lat,
                    otherLocation.coordinates.lng
                );

                // If less than 50km, add to cluster
                if (distance < 50) {
                    cluster.items.push(otherLocation);
                    processed.add(otherIndex);
                }
            });

            clusters.push(cluster);
            processed.add(index);
        });

        setClusteredMarkers(clusters);
    };

    /**
     * Calculate distance between two coordinates (Haversine formula)
     * @param {number} lat1 - Latitude of point 1
     * @param {number} lng1 - Longitude of point 1
     * @param {number} lat2 - Latitude of point 2
     * @param {number} lng2 - Longitude of point 2
     * @returns {number} Distance in kilometers
     */
    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    /**
     * Handle destination marker click
     * @param {Object} destination - The clicked destination
     */
    const handleMarkerClick = useCallback((destination) => {
        setSelectedDestination(destination);
        setMapCenter({
            lat: destination.coordinates.lat,
            lng: destination.coordinates.lng
        });
        setMapZoom(Math.max(mapZoom, 8)); // Zoom in if currently zoomed out
    }, [mapZoom]);

    /**
     * Close the info window and reset selection
     */
    const closeInfoWindow = useCallback(() => {
        setSelectedDestination(null);
    }, []);

    /**
     * Filter visible destinations on the map
     * @param {Function} filterFn - Filter function
     */
    const filterMapDestinations = useCallback((filterFn) => {
        const filtered = destinations.filter(filterFn);
        setVisibleDestinations(filtered);
        createMarkerClusters(filtered);

        // Reset center and zoom if filtering changes the set significantly
        if (filtered.length > 0 && Math.abs(filtered.length - destinations.length) > 3) {
            const bounds = calculateBounds(filtered);
            setMapCenter({
                lat: (bounds.north + bounds.south) / 2,
                lng: (bounds.east + bounds.west) / 2
            });
            setMapZoom(calculateZoomLevel(bounds));
        }
    }, [destinations]);

    /**
     * Reset map to show all destinations
     */
    const resetMap = useCallback(() => {
        setVisibleDestinations(destinations);
        createMarkerClusters(destinations);
        const bounds = calculateBounds(destinations);
        setMapCenter({
            lat: (bounds.north + bounds.south) / 2,
            lng: (bounds.east + bounds.west) / 2
        });
        setMapZoom(calculateZoomLevel(bounds));
        setSelectedDestination(null);
    }, [destinations]);

    return {
        selectedDestination,
        mapCenter,
        mapZoom,
        visibleDestinations,
        clusteredMarkers,
        handleMarkerClick,
        closeInfoWindow,
        filterMapDestinations,
        resetMap,
        setMapZoom,
        setMapCenter
    };
};

export default useDestinationMap;