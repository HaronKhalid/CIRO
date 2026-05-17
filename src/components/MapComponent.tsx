"use client";
import React, { useEffect, useState } from 'react';
import { Alert } from '@/lib/api/alerts';

// For production, the API key shouldn't be exposed directly in frontend code,
// but for the sake of this prototype we're using it to initialize the map.
// Alternatively, use Next.js env variables e.g. process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const API_KEY = "AIzaSyBFJkbjX4heVyVU_7YvhwiPa4Ln0UNmJtM";

interface MapComponentProps {
  lat: number;
  lng: number;
  directionsResponse?: google.maps.DirectionsResult | null;
  alerts?: Alert[];
}

export default function MapComponent({ lat, lng, directionsResponse, alerts = [] }: MapComponentProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    // Dynamically load Google Maps Script to avoid SSR issues
    if (window.google && window.google.maps) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (script) {
      // If script is already there but not loaded yet
      script.addEventListener('load', () => setIsLoaded(true));
      return;
    }

    script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      // document.body.removeChild(script); // Optional cleanup
    };
  }, []);

  useEffect(() => {
    if (isLoaded && window.google && !map) {
      const mapInstance = new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat, lng },
        zoom: 13,
        disableDefaultUI: true, // Hide default controls for a clean mobile look
        styles: [
          // Dark mode map styles for premium aesthetic
          { elementType: "geometry", stylers: [{ color: "#1e2733" }] }, // Darker base to match UI
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
          { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
          { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
          { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
          { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
          { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
          { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
          { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
          { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
          { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
          { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
          { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
          { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] }
        ]
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMap(mapInstance);

      // Create dynamic markers from the alerts prop
      alerts.forEach(alert => {
        let fillColor = "#f59e0b"; // Medium/Warning (Orange)
        if (alert.severity === 'High') fillColor = "#ef4444"; // High/Danger (Red)
        if (alert.severity === 'Low') fillColor = "#3b82f6"; // Low (Blue)

        new window.google.maps.Marker({
          position: { lat: alert.lat, lng: alert.lng },
          map: mapInstance,
          title: alert.title,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: fillColor,
            fillOpacity: 1,
            strokeWeight: 3,
            strokeColor: "#1A222C"
          }
        });
      });

      // Initialize Directions Renderer
      const renderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#3b82f6', // Bright Blue for recommended route
          strokeWeight: 6,
          strokeOpacity: 0.8
        }
      });
      renderer.setMap(mapInstance);
      setDirectionsRenderer(renderer);
    }
  }, [isLoaded, lat, lng, map]);

  useEffect(() => {
    if (directionsRenderer) {
      directionsRenderer.setDirections(directionsResponse || null);
    }
  }, [directionsResponse, directionsRenderer, alerts]);

  return (
    <div className="w-full h-full relative">
      <div id="map" className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}
