'use client';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const createPropertyIcon = () => {
    return L.divIcon({
        className: 'custom-property-marker-wrap',
        html: `
            <div class="relative flex flex-col items-center group" style="z-index: 1000;">
                <div class="w-12 h-12 rounded-full flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:scale-110" style="background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); border: 1.5px solid rgba(255,255,255,1);">
                    <div class="w-4 h-4 rounded-full" style="background: var(--color-brand-600); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2)"></div>
                </div>
                <div class="absolute -bottom-2 w-4 h-4 rotate-45 border-r-[1.5px] border-b-[1.5px] border-white z-0" style="background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px);"></div>
            </div>
        `,
        iconSize: [48, 56],
        iconAnchor: [24, 52]
    });
};

const createLandmarkIcon = (place: any) => {
    return L.divIcon({
        className: 'custom-landmark-marker-wrap',
        html: `
            <div class="relative flex flex-col items-center group cc-beacon" style="z-index: 500;">
                <div class="w-10 h-10 md:w-11 md:h-11 rounded-full p-[2px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]" style="background: rgba(255,255,255,0.7); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,1);">
                    <div class="w-full h-full rounded-full bg-cover bg-center border border-white/50" style="background-image: url('${place.img}')"></div>
                </div>
                
                <div class="absolute top-[110%] mt-1.5 px-3 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex flex-col items-center opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 min-w-[110px]" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border: 1px solid var(--color-surface-200); z-index: 1000;">
                    <span class="text-[9px] font-bold uppercase tracking-wider mb-0.5" style="color: var(--color-brand-600)">${place.cat}</span>
                    <span class="text-[11px] font-bold whitespace-nowrap text-center" style="color: var(--color-surface-900)">${place.name}</span>
                    <div class="w-full h-[1px] my-1" style="background: var(--color-surface-100)"></div>
                    <span class="text-[9px] font-semibold flex items-center gap-1" style="color: var(--color-surface-500)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                        ${place.time}
                    </span>
                    <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l border-surface-200" style="background: rgba(255, 255, 255, 0.95)"></div>
                </div>
            </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22]
    });
};

function MapViewRecenter({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

export default function PropertyMap({ center, listingInfo, landmarks }: { center: [number, number], listingInfo: any, landmarks: any[] }) {
    return (
        <MapContainer
            center={center}
            zoom={14}
            scrollWheelZoom={false}
            className="w-full h-full z-10 carto-map"
            zoomControl={false}
            attributionControl={false}
        >
            {/* Minimalist Apple Maps-style CartoDB Voyager Theme */}
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                maxZoom={19}
            />
            <MapViewRecenter center={center} />

            {/* Center Property Pin */}
            <Marker position={center} icon={createPropertyIcon()} zIndexOffset={1000} />

            {/* Surrounding Landmark Orbs */}
            {landmarks.map(lm => (
                <Marker key={lm.id} position={[lm.lat, lm.lng]} icon={createLandmarkIcon(lm)} zIndexOffset={500} />
            ))}
        </MapContainer>
    );
}
