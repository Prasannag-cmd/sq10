import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Simplified geographical boundaries of Tamil Nadu for drawing the gold border outline
const TAMIL_NADU_BORDER = [
  [13.5, 80.2],    // Pulicat / North Coast
  [13.08, 80.27],  // Chennai
  [12.6, 80.2],    // Mahabalipuram
  [11.75, 79.8],   // Cuddalore / Pondicherry
  [10.3, 79.8],    // Point Calimere
  [9.2, 79.2],     // Rameswaram / Pamban
  [8.8, 78.2],     // Tuticorin
  [8.08, 77.55],   // Kanyakumari (Southern tip)
  [8.2, 77.2],     // Nagercoil West
  [8.8, 77.15],    // Shenkottai / Western Ghats
  [9.5, 77.25],    // Cumbum Valley
  [10.0, 77.1],    // Munnar Border
  [10.8, 76.6],    // Coimbatore West / Palakkad Gap
  [11.5, 76.25],   // Nilgiris / Gudalur
  [12.1, 77.0],    // Chamrajnagar Border
  [12.5, 77.1],    // Hosur Border
  [12.8, 78.2],    // Kuppam Border
  [13.14, 79.9],   // Thiruvallur
  [13.5, 80.0]     // North Border
];

export default function TamilNaduMap({ districts, activeDistrict, onSelectDistrict }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const navigate = useNavigate();

  // 1. Initialize Satellite Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create Leaflet map instance
    const map = L.map(mapContainerRef.current, {
      center: [10.9, 78.6], // Shift center slightly south/east to center Tamil Nadu
      zoom: 7,
      minZoom: 6,
      maxZoom: 11,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false,
    });

    // Standard Google Maps Roadmap tile layer
    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google Maps',
      maxZoom: 19
    }).addTo(map);

    // Style and position zoom control
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Draw Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean up markers from previous renders
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    // Remove any existing vector layers before redraw (if any)
    map.eachLayer((layer) => {
      if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Render interactive markers for each filtered location
    districts.forEach(d => {
      const isActive = activeDistrict === d.id;

      // Custom HTML layout for Leaflet markers with pin structure
      const customHtml = `
        <div class="tn-leaflet-marker ${isActive ? 'is-active' : ''} marker-${d.id} status-${d.status}">
          <div class="tn-leaflet-marker-shadow"></div>
          <div class="tn-leaflet-marker-ripple"></div>
          <div class="tn-leaflet-marker-pin">
            <div class="tn-leaflet-marker-pin-inner"></div>
          </div>
          <span class="tn-leaflet-marker-label">${d.name}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: customHtml,
        className: 'custom-leaflet-icon-wrapper',
        iconSize: [24, 24],
        iconAnchor: [12, 22]
      });

      // Distinct popup card layout based on Corporate HQ vs Project Locations
      let popupContent = '';
      if (d.status === 'hq') {
        popupContent = `
          <div class="tn-leaflet-popup-card status-hq">
            <div class="tn-popup-card-header">
              <span class="tn-popup-card-badge hq">Corporate HQ</span>
              <span class="tn-popup-card-location">📍 Arapalayam, Madurai</span>
            </div>
            <div class="tn-popup-card-title">${d.projectName}</div>
            <div class="tn-popup-card-address">
              116/294 J Vijayasekaran Street,<br/>
              Kanmaikara Road, Arapalayam,<br/>
              Madurai &ndash; 625016
            </div>
            <div class="tn-popup-card-cta">Get In Touch &rarr;</div>
          </div>
        `;
      } else {
        const statusLabel = d.status.charAt(0).toUpperCase() + d.status.slice(1);
        popupContent = `
          <div class="tn-leaflet-popup-card status-${d.status}">
            <div class="tn-popup-card-header">
              <span class="tn-popup-card-badge ${d.status}">${statusLabel} Project</span>
              <span class="tn-popup-card-location">📍 ${d.name}</span>
            </div>
            <div class="tn-popup-card-title">${d.projectName}</div>
            <div class="tn-popup-card-type">${d.projectType}</div>
            <div class="tn-popup-card-cta">View Details &rarr;</div>
          </div>
        `;
      }

      const marker = L.marker([d.lat, d.lng], { icon: customIcon })
        .addTo(map)
        .on('click', () => {
          onSelectDistrict(d.id);
          // Navigate to projects detail or contact page
          if (d.status === 'hq') {
            navigate('/contact');
          } else {
            navigate(`/projects/${d.id}`);
          }
        })
        .on('mouseover', () => {
          L.popup({
            closeButton: false,
            offset: [0, -10],
            className: 'tn-leaflet-custom-popup'
          })
          .setLatLng([d.lat, d.lng])
          .setContent(popupContent)
          .openOn(map);
        })
        .on('mouseout', () => {
          map.closePopup();
        });

      markersRef.current[d.id] = marker;
    });
  }, [districts, activeDistrict, onSelectDistrict, navigate]);

  // 3. Pan smoothly to active district coordinates on changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeDistrict) return;

    const activeData = districts.find(d => d.id === activeDistrict);
    if (activeData) {
      map.panTo([activeData.lat, activeData.lng], { animate: true, duration: 0.8 });
    }
  }, [activeDistrict, districts]);

  return (
    <div className="tn-map-wrapper">
      <div className="tn-map-leaflet-container" ref={mapContainerRef} />
    </div>
  );
}



