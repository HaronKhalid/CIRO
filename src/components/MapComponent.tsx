"use client";
import React, { useEffect, useState } from 'react';

// For production, the API key shouldn't be exposed directly in frontend code,
// but for the sake of this prototype we're using it to initialize the map.
// Alternatively, use Next.js env variables e.g. process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const API_KEY = "AIzaSyBFJkbjX4heVyVU_7YvhwiPa4Ln0UNmJtM";

interface MapComponentProps {
  lat: number;
  lng: number;
}

export default function MapComponent({ lat, lng }: MapComponentProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load Google Maps Script to avoid SSR issues
    if (window.google) {
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
    if (isLoaded && window.google) {
      const map = new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat, lng },
        zoom: 12,
        styles: [
          // Dark mode map styles for premium aesthetic
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
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

      new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: "Incident Location",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#ef4444",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff"
        }
      });
    }
  }, [isLoaded, lat, lng]);

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
