'use client';
import maplibregl from 'maplibre-gl';
import { useEffect, useRef } from 'react';
import { MapResponse } from '../../models/types/response-map';

export function MapLibreGl({ data }: MapResponse) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Inicializa o mapa
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json', // estilo dark gratuito
      center: data.center,
      zoom: data.zoom,
    });

    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

    // Cria os marcadores a partir do JSON
    data.locations.forEach((loc) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = loc.color;
      el.style.width = '22px';
      el.style.height = '22px';
      el.style.borderRadius = '50%';
      el.style.boxShadow = `0 0 12px ${loc.color}88`;
      el.style.cursor = 'pointer';

      new maplibregl.Marker(el)
        .setLngLat(loc.coordinates)
        .setPopup(
          new maplibregl.Popup({ offset: 15 }).setHTML(`
            <div style="color:#111827;">
              <strong style="color:#0B1120;">${loc.name}</strong><br/>
              <small style="color:#334155;">${loc.description}</small><br/>
              <span style="color:#475569;">${loc.address}</span>
            </div>
          `),
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [data]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[400px] rounded-3xl overflow-hidden border border-[#1E293B]"
    />
  );
}
