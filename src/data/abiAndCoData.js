/* ============================================================
   ABI & CO — Showroom Layout Database (Shared)
   Contains coordinate definitions for the interactive plans
   ============================================================ */

export const showroomZones = {
  // Exterior Facade Layout Map
  facade: [
    {
      id: 'glazing',
      name: 'Double-Height Structural Glazing',
      area: 'Upper Floor Facade',
      dimensions: '45 × 18 ft',
      facing: 'East-Facing Frontage',
      status: 'completed',
      statusLabel: 'Implemented',
      desc: 'Heavy-duty structural glass facade panels designed to provide thermal insulation, sound dampening, and maximum light ingress for showroom product visibility.',
      img: '/assets/images/abi-exterior-2.jpg',
      points: '10,10 100,10 100,120 10,120',
      labelX: 55,
      labelY: 65
    },
    {
      id: 'canopy',
      name: 'Commercial Steel Canopy',
      area: 'Ground Floor Entry',
      dimensions: '35 × 15 ft',
      facing: 'Parking Frontage',
      status: 'completed',
      statusLabel: 'Implemented',
      desc: 'Premium structural steel cantilever parking canopy, integrating high-strength tension rods, water drainage channels, and architectural composite wooden paneling.',
      img: '/assets/images/abi-exterior-1.jpg',
      points: '10,140 100,140 85,210 25,210',
      labelX: 55,
      labelY: 175
    }
  ],

  // Showroom Ground Floor Interior Layout Map
  interior: [
    {
      id: 'entrance',
      name: 'Showroom Glass Lobby & Cashier',
      area: 'Front Entry Corridor',
      dimensions: '40 × 12 ft',
      facing: 'Main Entrance',
      status: 'completed',
      statusLabel: 'Completed',
      desc: 'Seamless glass entrance lobby utilizing premium commercial hardware, sliding glass systems, and custom modular reception counter design.',
      img: '/assets/images/abi-night.jpg',
      points: '10,10 100,10 100,45 10,45',
      labelX: 55,
      labelY: 28
    },
    {
      id: 'cupboards',
      name: 'Custom Wardrobes & Cabinetry Zone',
      area: 'Left Wing Showcase',
      dimensions: '12 × 50 ft',
      facing: 'Left Display Wall',
      status: 'completed',
      statusLabel: 'Completed',
      desc: 'Bespoke built-in wardrobe display frames constructed with moisture-resistant engineering woods, custom sliding mechanisms, and integrated warm spotlighting.',
      img: '/assets/images/abi-interior.jpg',
      points: '10,50 35,50 35,210 10,210',
      labelX: 22.5,
      labelY: 130
    },
    {
      id: 'fans',
      name: 'Ceiling Fan Grid & Accent Lighting',
      area: 'Main Ceiling Vault',
      dimensions: '30 × 40 ft',
      facing: 'Ceiling Infrastructure',
      status: 'completed',
      statusLabel: 'Completed',
      desc: 'Fuseless electrical demonstration grid displaying multi-speed high-end ceiling fans, track-light setups, and floating drywall gypsum details.',
      img: '/assets/images/abi-interior.jpg',
      points: '40,50 70,50 70,140 40,140',
      labelX: 55,
      labelY: 95
    },
    {
      id: 'appliances',
      name: 'Home Appliances & Display Racks',
      area: 'Right Wing Showcase',
      dimensions: '12 × 50 ft',
      facing: 'Right Display Wall',
      status: 'completed',
      statusLabel: 'Completed',
      desc: 'High-durability metal display shelving systems designed for heavy consumer electronics, pre-wired for instant product testing and live demos.',
      img: '/assets/images/abi-interior.jpg',
      points: '75,50 100,50 100,210 75,210',
      labelX: 87.5,
      labelY: 130
    },
    {
      id: 'reception',
      name: 'Customer Consultation & Lounge',
      area: 'Center Rear Lounge',
      dimensions: '30 × 20 ft',
      facing: 'Rear Central Zone',
      status: 'completed',
      statusLabel: 'Completed',
      desc: 'A premium client discussion area featuring comfortable seating, catalogs library, modular display tables, and custom acoustical divider paneling.',
      img: '/assets/images/abi-interior.jpg',
      points: '40,150 70,150 70,210 40,210',
      labelX: 55,
      labelY: 180
    },
    {
      id: 'staircase',
      name: 'Upper Showroom Stairway',
      area: 'Rear Right Access',
      dimensions: '10 × 12 ft',
      facing: 'Vertical Circulation',
      status: 'completed',
      statusLabel: 'Completed',
      desc: 'Structural steel stairs clad with premium polished granite tiles and brushed stainless steel safety balustrades leading to the furniture level.',
      img: '/assets/images/abi-exterior-1.jpg',
      points: '75,215 100,215 100,235 75,235',
      labelX: 87.5,
      labelY: 225
    }
  ]
};
