import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TamilNaduMap from './TamilNaduMap';
import DistrictInfoPanel from './DistrictInfoPanel';

// Register ScrollTrigger if not already done globally
gsap.registerPlugin(ScrollTrigger);

const DISTRICTS_DATA = [
  {
    id: 'madurai-hq',
    name: 'Madurai HQ',
    lat: 9.9252,
    lng: 78.1198,
    completed: 'N/A',
    ongoing: 'N/A',
    categories: ['Corporate Office', 'Design Studio', 'Consulting'],
    projectName: 'Squaareten Corporate Office',
    projectType: 'Corporate Headquarters',
    status: 'hq'
  },
  {
    id: 'madurai',
    name: 'Madurai Project',
    lat: 9.9380,
    lng: 78.1390, // Offset north-east to prevent overlap with HQ marker
    completed: 120,
    ongoing: 15,
    categories: ['Residential', 'Commercial', 'Interiors', 'Consulting', 'Plots'],
    projectName: 'Madurai Premium Villas',
    projectType: 'Residential Project',
    status: 'completed'
  },
  {
    id: 'virudhunagar',
    name: 'Virudhunagar',
    lat: 9.5872,
    lng: 77.9515,
    completed: 16,
    ongoing: 2,
    categories: ['Residential', 'Turnkey'],
    projectName: 'Virudhunagar Elite Heights',
    projectType: 'Residential Estate',
    status: 'completed'
  },
  {
    id: 'sivakasi',
    name: 'Sivakasi',
    lat: 9.4533,
    lng: 77.8024,
    completed: 22,
    ongoing: 4,
    categories: ['Commercial', 'Residential', 'Turnkey'],
    projectName: 'Sivakasi Industrial Park',
    projectType: 'Commercial Complex',
    status: 'completed'
  },
  {
    id: 'dindigul',
    name: 'Dindigul',
    lat: 10.3673,
    lng: 77.9803,
    completed: 14,
    ongoing: 3,
    categories: ['Residential', 'Plots'],
    projectName: 'Dindigul Vista Residency',
    projectType: 'Residential Villas',
    status: 'completed'
  },
  {
    id: 'chennai',
    name: 'Chennai',
    lat: 13.0827,
    lng: 80.2707,
    completed: 45,
    ongoing: 8,
    categories: ['Residential', 'Commercial', 'Interiors', 'Consulting'],
    projectName: 'Chennai Corporate Plaza',
    projectType: 'Commercial Hub',
    status: 'ongoing'
  },
  {
    id: 'trichy',
    name: 'Trichy',
    lat: 10.7905,
    lng: 78.7047,
    completed: 24,
    ongoing: 3,
    categories: ['Commercial', 'Residential'],
    projectName: 'Trichy Prime Business Park',
    projectType: 'Commercial Project',
    status: 'ongoing'
  },
  {
    id: 'karur',
    name: 'Karur',
    lat: 10.9601,
    lng: 78.0766,
    completed: 7,
    ongoing: 2,
    categories: ['Commercial', 'Residential'],
    projectName: 'Karur Textile Zone',
    projectType: 'Industrial Turnkey',
    status: 'ongoing'
  },
  {
    id: 'thiruvallur',
    name: 'Thiruvallur',
    lat: 13.1438,
    lng: 79.9077,
    completed: 18,
    ongoing: 2,
    categories: ['Residential', 'Plots'],
    projectName: 'Thiruvallur Green Meadows',
    projectType: 'Land Layouts',
    status: 'ongoing'
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    lat: 11.0168,
    lng: 76.9558,
    completed: 32,
    ongoing: 5,
    categories: ['Commercial', 'Residential', 'Turnkey'],
    projectName: 'Coimbatore Smart Heights',
    projectType: 'Residential Project',
    status: 'upcoming'
  },
  {
    id: 'tirunelveli',
    name: 'Tirunelveli',
    lat: 8.7139,
    lng: 77.7567,
    completed: 15,
    ongoing: 4,
    categories: ['Residential', 'Interiors'],
    projectName: 'Tirunelveli Royal Palace',
    projectType: 'Turnkey Project',
    status: 'upcoming'
  },
  {
    id: 'aranthangi',
    name: 'Aranthangi',
    lat: 10.1633,
    lng: 78.9959,
    completed: 13,
    ongoing: 1,
    categories: ['Residential', 'Plots'],
    projectName: 'Aranthangi Town Square',
    projectType: 'Residential Layout',
    status: 'upcoming'
  }
];

export default function TamilNaduExplorer() {
  const [activeDistrictId, setActiveDistrictId] = useState('madurai-hq'); // HQ is default
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const sectionRef = useRef(null);

  // Filter locations based on search query and active tab filter
  const filteredLocations = DISTRICTS_DATA.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  // Auto-correct active selection if it is filtered out of view
  useEffect(() => {
    if (filteredLocations.length > 0 && !filteredLocations.some(d => d.id === activeDistrictId)) {
      setActiveDistrictId(filteredLocations[0].id);
    }
  }, [filteredLocations, activeDistrictId]);

  // Scroll Entrance Animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Fade/Scale in the whole section content wrapper
      gsap.fromTo('.tn-explorer__inner', 
        { opacity: 0, scale: 0.98 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Fade/scale in map container
      gsap.fromTo('.tn-map-leaflet-container', 
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeDistrictData = DISTRICTS_DATA.find(d => d.id === activeDistrictId);

  return (
    <section className="tn-explorer" ref={sectionRef}>
      <div className="tn-explorer__bg" />
      
      <div className="tn-explorer__header">
        <span className="section__label">Presence Map</span>
        <h2 className="tn-explorer__title">Our Presence Across Tamil Nadu</h2>
        <p className="tn-explorer__subtitle">
          Explore Squaareten Construction Pvt Ltd Corporate Office and completed, ongoing, or upcoming projects across major cities.
        </p>
      </div>


      {/* Search and Filters Bar */}
      <div className="tn-presence-controls">
        <div className="tn-presence-search-wrapper">
          <span className="tn-presence-search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search city or project name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tn-presence-search-input"
          />
        </div>
        <div className="tn-presence-filters">
          {[
            { id: 'all', label: 'All Locations' },
            { id: 'hq', label: 'Madurai Office' },
            { id: 'completed', label: 'Completed' },
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'upcoming', label: 'Upcoming' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`tn-filter-btn ${statusFilter === tab.id ? 'is-active' : ''} filter-${tab.id}`}
              onClick={() => setStatusFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tn-explorer__inner">
        {/* Left Side: Leaflet Locator Map */}
        <div className="tn-map-layout-wrapper">
          <TamilNaduMap 
            districts={filteredLocations} 
            activeDistrict={activeDistrictId}
            onSelectDistrict={setActiveDistrictId}
          />
          
          {/* Custom Colored Pins Legend */}
          <div className="tn-presence-legend">
            <div className="tn-legend-item"><span className="tn-legend-dot hq" /> 🏢 Madurai HQ</div>
            <div className="tn-legend-item"><span className="tn-legend-dot completed" /> ✅ Completed</div>
            <div className="tn-legend-item"><span className="tn-legend-dot ongoing" /> 🚧 Ongoing</div>
            <div className="tn-legend-item"><span className="tn-legend-dot upcoming" /> 🔵 Upcoming</div>
          </div>
        </div>

        {/* Right Side: Dynamic Location Info Panel */}
        {activeDistrictData && (
          <DistrictInfoPanel district={activeDistrictData} />
        )}
      </div>
    </section>
  );
}
