import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { MapPinOff } from "lucide-react";
import { LoadingState } from "../ui/LoadingState";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

let loaderPromise = null;
function loadGoogleMaps() {
  if (!loaderPromise) {
    loaderPromise = new Loader({ apiKey: API_KEY, version: "weekly" }).load();
  }
  return loaderPromise;
}

// Renders a Google Map with deck.gl data layers drawn on top via
// GoogleMapsOverlay. Used by the FF Contact Location Report and
// FF Live Location Report pages.
export function GoogleDeckMap({ layers, center, zoom = 11, className = "h-[420px]" }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const overlayRef = useRef(null);
  const [status, setStatus] = useState(API_KEY ? "loading" : "missing-key");

  useEffect(() => {
    if (!API_KEY) return;
    let cancelled = false;

    loadGoogleMaps()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        mapRef.current = new window.google.maps.Map(containerRef.current, {
          center,
          zoom,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        });
        overlayRef.current = new GoogleMapsOverlay({ layers });
        overlayRef.current.setMap(mapRef.current);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));

    return () => {
      cancelled = true;
      overlayRef.current?.finalize?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    overlayRef.current?.setProps({ layers });
  }, [layers]);

  useEffect(() => {
    if (mapRef.current && center) mapRef.current.panTo(center);
  }, [center]);

  if (status === "missing-key") {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-warning/40 bg-warning/5 text-warning text-sm text-center px-6 ${className}`}
      >
        <MapPinOff className="h-6 w-6" />
        <span>Set VITE_GOOGLE_MAPS_API_KEY in .env to display the map.</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-error/40 bg-error/5 text-error text-sm text-center px-6 ${className}`}
      >
        <MapPinOff className="h-6 w-6" />
        <span>Google Maps failed to load. Check the API key and network access.</span>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-base-200 shadow-sm ${className}`}>
      {status === "loading" && (
        <div className="absolute inset-0 z-10 bg-base-100">
          <LoadingState label="Loading map..." />
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
