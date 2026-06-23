/* ============================================================
   PROJECT DETAIL PAGE — Individual Project View
   Premium editorial layout with gallery and story
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ── All projects data (shared source of truth) ─────── */
const allProjects = [
  {
    id: 'maha-groups-residence',
    name: 'Maha groups - Residence',
    location: 'Thathaneri, Madurai',
    category: 'completed',
    status: 'Completed',
    img: '/assets/images/maha-hero-bg.jpg',
    description: 'A premium contemporary double-story residential design combining horizontal wood-look accents, concrete textures, and custom geometric facade elements.',
    area: '6,800 sq.ft',
    year: '2026',
    story: 'Maha groups Residence stands as a bold landmark of contemporary residential architecture in the Thathaneri area of Madurai. Designed as a luxury multi-family or grand single-family estate, the structure features a striking modern facade. The design merges natural wood grain panels with smooth concrete finishes and white architectural features. Highlighted by large glass windows, a structured front entrance, and custom metal work on the terrace, this home blends durability with an elite design aesthetic.',
    gallery: [
      '/assets/images/maha-hero-bg.jpg',
      '/assets/images/maha-after-0.jpg',
      '/assets/images/maha-after-1.jpg',
      '/assets/images/maha-after-2.jpg',
      '/assets/images/maha-after-3.jpg',
      '/assets/images/maha-after-4.jpg'
    ],
    beforeGallery: [
      '/assets/images/project-maha-1.jpg',
      '/assets/images/project-maha-2.jpg',
      '/assets/images/maha-before-new-1.jpg',
      '/assets/images/maha-before-new-2.jpg',
      '/assets/images/maha-before-new-3.jpg'
    ],
    afterGallery: [
      '/assets/images/maha-hero-bg.jpg',
      '/assets/images/maha-after-0.jpg',
      '/assets/images/maha-after-1.jpg',
      '/assets/images/maha-after-2.jpg',
      '/assets/images/maha-after-3.jpg',
      '/assets/images/maha-after-4.jpg'
    ],
    videos: [
      '/assets/images/maha-video-1.mp4',
      '/assets/images/maha-video-2.mp4',
      '/assets/images/maha-video-3.mp4'
    ],
    features: [
      'Contemporary Facade Design',
      'Premium Wood-Look Accents',
      'Spacious Balconies & Terraces',
      'Structural Steel Elements',
      'Bespoke Exterior Lighting',
      'Landscaped Front Entry'
    ],
    mapUrl: 'https://www.google.com/maps/@9.9415931,78.1019086,3a,75y,82.61h,95.91t/data=!3m7!1e1!3m5!1stOhnT9qfmch8gVNKH1dBrg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.90703917687037%26panoid%3DtOhnT9qfmch8gVNKH1dBrg%26yaw%3D82.60680081705755!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: 'sunrise-residences',
    name: 'Sunrise Residences',
    location: 'Nagudi, Aranthangi',
    category: 'completed',
    status: 'Completed',
    img: '/assets/images/project-nagudi-main.jpg',
    description: 'Modern 2 BHK residential home featuring a spacious veranda, dedicated vehicle parking, and landscaped gardening space.',
    area: '1,600 sq.ft',
    year: '2024',
    story: 'Sunrise Residences stands as a premium example of contemporary single-story home design. Featuring a spacious 2 BHK configuration (2 rooms, 1 kitchen, 1 hall), a welcoming veranda, dedicated vehicle parking, and landscaped gardening space, the home offers a perfect balance of comfort and modern aesthetics. The exterior combines textured stone cladding with warm horizontal wood-look panels and a sleek blue-grey canopy, creating a striking architectural statement in the Nagudi neighborhood.',
    gallery: [
      '/assets/images/project-nagudi-main.jpg',
      '/assets/images/project-nagudi-2.jpg',
      '/assets/images/project-nagudi-3.jpg'
    ],
    beforeGallery: [
      '/assets/images/project-nagudi-2.jpg',
      '/assets/images/project-nagudi-3.jpg'
    ],
    afterGallery: [
      '/assets/images/project-nagudi-main.jpg'
    ],
    features: ['2 Spacious Bedrooms', 'Modern Kitchen & Hall', 'Welcoming Front Veranda', 'Dedicated Vehicle Parking', 'Landscaped Gardening Area', 'Premium Stone Cladding'],
  },
  {
    id: 'swimming-pool-mannadimangalam',
    name: 'Swimming Pool at Mannadimangalam',
    location: 'Mannadimangalam, Madurai',
    category: 'completed',
    status: 'Completed',
    img: '/assets/images/pool-image-1.jpeg',
    description: 'A premium concrete swimming pool construction featuring custom filtration, blue mosaic tile finishing, and integrated lighting.',
    area: '1,200 sq.ft',
    year: '2024',
    story: 'Located in the scenic area of Mannadimangalam, this custom-built luxury swimming pool project is designed as a private backyard oasis. Constructed with high-durability structural concrete and finished with premium mosaic tiles, the pool features a state-of-the-art multi-stage filtration system, energy-efficient underwater LED illumination, and a modern perimeter drainage deck. The design prioritizes both safety and sophisticated styling, integrating seamlessly with the surrounding landscape to create a stunning leisure area.',
    gallery: [
      '/assets/images/pool-image-1.jpeg',
      '/assets/images/pool-image-2.jpeg',
      '/assets/images/pool-image-3.jpeg',
      '/assets/images/pool-image-4.jpeg',
      '/assets/images/pool-image-5.jpeg',
      '/assets/images/pool-image-6.jpeg'
    ],
    beforeGallery: [
      '/assets/images/pool-image-2.jpeg',
      '/assets/images/pool-image-3.jpeg',
      '/assets/images/pool-image-5.jpeg'
    ],
    afterGallery: [
      '/assets/images/pool-image-1.jpeg',
      '/assets/images/pool-image-4.jpeg',
      '/assets/images/pool-image-6.jpeg'
    ],
    videos: [
      '/assets/images/pool-video-1.mp4',
      '/assets/images/pool-video-2.mp4',
      '/assets/images/pool-video-3.mp4'
    ],
    features: [
      'Structural Concrete Build',
      'Multi-Stage Filtration System',
      'Premium Mosaic Tiling',
      'Underwater LED Illumination',
      'Anti-Slip Perimeter Deck',
      'Bespoke Water Feature'
    ],
  },
  {
    id: 'heritage-revival',
    name: 'Modern Duplex Residence',
    location: 'Thanjavur, Tamil Nadu',
    category: 'completed',
    status: 'Completed',
    img: '/assets/images/project-duplex-main.jpg',
    description: 'A premium 3 BHK modern duplex residence featuring textured stone wall cladding, a spacious glass balcony, and bespoke interiors.',
    area: '3,200 sq.ft',
    year: '2024',
    story: 'This premium modern duplex residence represents a perfect fusion of bold contemporary architecture and high-end interior styling. Spanning two levels, the home features a custom-designed facade with textured grey stone cladding and geometric plaster bands. Inside, the spaces are designed for luxury living, starting with a grand living room with polished marble flooring and a custom backlit TV unit. A stunning structural staircase with glass panel balustrades leads to the upper level under a custom pattern skylight that filters beautiful natural light. Complete with premium bathroom fixtures and modern modular storage throughout, the residence offers a refined urban sanctuary.',
    gallery: [
      '/assets/images/project-duplex-main.jpg',
      '/assets/images/project-duplex-1.jpg',
      '/assets/images/project-duplex-2.jpg',
      '/assets/images/project-duplex-3.jpg',
      '/assets/images/project-duplex-4.jpg'
    ],
    beforeGallery: [
      '/assets/images/project-duplex-2.jpg',
      '/assets/images/project-duplex-3.jpg'
    ],
    afterGallery: [
      '/assets/images/project-duplex-main.jpg',
      '/assets/images/project-duplex-1.jpg',
      '/assets/images/project-duplex-4.jpg'
    ],
    features: [
      '3 Spacious Bedrooms',
      'Textured Stone Facade',
      'Glass Balustrade Balcony',
      'Glass-Rail Structural Staircase',
      'Backlit TV Unit Fretwork',
      'Modern Bathroom Vanity'
    ],
  },
  {
    id: 'bonitaa-hair-skin-care',
    name: 'Bonitaa Hair & Skin Care - Madurai',
    location: 'Madurai Bypass Road, Tamil Nadu',
    category: 'completed',
    status: 'Completed',
    img: '/assets/images/bonita-image-1.jpeg',
    description: 'A premium salon and wellness space designed and executed with modern interiors, elegant finishes, and a customer-focused experience.',
    area: 'Multiple Outlets',
    year: '2026',
    story: 'Bonitaa Hair & Skin Care is one of our valued commercial clients in the beauty and wellness sector. We have successfully completed construction and interior works for several of their franchise locations, delivering premium-quality spaces that align with the brand\'s modern identity and customer experience standards.\n\nDue to the successful execution of previous outlets, we have also been entrusted with upcoming franchise projects, strengthening our long-term partnership with the Bonitaa brand. Each location is carefully designed to provide a welcoming, luxurious, and functional environment for clients while maintaining consistency across all franchise branches.',
    gallery: [
      '/assets/images/bonita-image-1.jpeg',
      '/assets/images/bonita-image-2.jpeg',
      '/assets/images/bonita-image-3.jpeg',
      '/assets/images/bonita-image-4.jpeg',
      '/assets/images/bonita-image-5.jpeg',
      '/assets/images/bonita-image-6.jpeg',
      '/assets/images/bonita-image-7.jpeg',
      '/assets/images/bonita-image-8.jpeg',
      '/assets/images/bonita-image-9.jpeg',
      '/assets/images/bonita-image-10.jpeg'
    ],
    beforeGallery: [
      '/assets/images/bonita-before-1.jpeg',
      '/assets/images/bonita-before-2.jpeg',
      '/assets/images/bonita-before-3.jpeg',
      '/assets/images/bonita-before-4.jpeg',
      '/assets/images/bonita-before-5.jpeg'
    ],
    afterGallery: [
      '/assets/images/bonita-image-1.jpeg',
      '/assets/images/bonita-image-4.jpeg',
      '/assets/images/bonita-image-6.jpeg',
      '/assets/images/bonita-image-9.jpeg'
    ],
    features: [
      'Premium Salon Interiors',
      'Modern Reception & Waiting Areas',
      'Customized Interior Finishes',
      'Brand-Focused Design Execution',
      'Multi-Branch Franchise Development',
      'Ongoing Expansion Projects'
    ],
    mapUrl: 'https://www.google.com/maps/place/BONITAA+SKIN+AND+HAIR+CARE/@9.9238552,78.0175391,13z/data=!4m10!1m2!2m1!1smap+bonitaa+bypass+madurai!3m6!1s0x3b00cfd1cca47ce9:0x12c89ce66c58650a!8m2!3d9.9238552!4d78.0937568!15sChptYXAgYm9uaXRhYSBieXBhc3MgbWFkdXJhaVoaIhxib25pdGFhIGJ5cGFzcyBtYWR1cmFpWhciFWJvbml0YSBieXBhc3MgbWFkdXJhaZIBEHNraW5fY2FyZV9jbGluaWOaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMjVDY0UweFRUTldhMnN4VVd4Q2RsVnFiSE5SVlVwcVRucEdRbFp1WXhBQuABAPoBBQjkARBC!16s%2Fg%2F11m_44z751?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: 'bonitaa-tiruvallur',
    name: 'Bonitaa Hair & Skin Care - Tiruvallur',
    location: 'Tiruvallur District, Tamil Nadu',
    category: 'ongoing',
    status: 'Ongoing',
    img: '/assets/images/bonitaa-tiruvallur-1.jpeg',
    description: 'Ongoing interior project for a new franchise branch of Bonitaa featuring premium clinical layout, consulting areas, and advanced design execution.',
    area: 'Premium Franchise Outlet',
    progress: 35,
    phase: 'Layout Partitioning & Electrical Routing',
    expectedCompletion: 'November 2026',
    story: 'We are proud to execute the interior architecture for the new Bonitaa franchise branch in Tiruvallur District. This premium hair and skin care facility is structured with specialized treatment rooms, consulting offices, discussion halls, and a spacious reception lounge. The design features sophisticated ceiling grids, warm hardwood flooring, glass elevations, and custom spatial zoning to ensure high client comfort and optimal clinical workflow. Works are currently under execution, focusing on layout partition framing and mechanical-electrical routing.',
    gallery: [
      '/assets/images/bonitaa-tiruvallur-1.jpeg',
      '/assets/images/bonitaa-tiruvallur-2.jpeg'
    ],
    beforeGallery: [
      '/assets/images/bonitaa-tiruvallur-2.jpeg'
    ],
    afterGallery: [
      '/assets/images/bonitaa-tiruvallur-1.jpeg'
    ],
    videos: [
      '/assets/images/bonitaa-tiruvallur-video-1.mp4',
      '/assets/images/bonitaa-tiruvallur-video-2.mp4'
    ],
    features: [
      'Modern Reception Lounge',
      'Specialised Treatment Rooms',
      'Consulting & Discussion Areas',
      'Brand-Consistent Franchise Design',
      'Premium Glass Elevations',
      'Integrated Spatial Zoning'
    ]
  },
  {
    id: 'thirupaalai-residence',
    name: 'Thirupaalai Residence',
    location: 'Thirupaalai, Madurai',
    category: 'ongoing',
    status: 'Ongoing',
    img: '/assets/images/thirupaalai-image-1.jpeg',
    description: 'A modern contemporary premium residential project under construction in Madurai featuring latest finishes and high-end architecture.',
    area: '3,800 sq.ft',
    progress: 45,
    phase: 'Interior Finishing',
    expectedCompletion: 'March 2027',
    story: 'Located in the rapidly developing area of Thirupaalai in Madurai, this premium residential project represents the absolute pinnacle of modern family living. The home is designed with a strong emphasis on open-plan layout, natural light ventilation, and contemporary architectural aesthetics. Featuring high-end concrete works, customized structural glass balustrades, premium woodwork, and a curated color palette, the residence is built to deliver unparalleled luxury. The project is currently in its interior finishing and custom installations phase, with completion planned for early 2027.',
    gallery: [
      '/assets/images/thirupaalai-image-1.jpeg',
      '/assets/images/thirupaalai-image-2.jpeg',
      '/assets/images/thirupaalai-image-3.jpeg'
    ],
    beforeGallery: [
      '/assets/images/thirupaalai-image-2.jpeg',
      '/assets/images/thirupaalai-image-3.jpeg'
    ],
    afterGallery: [
      '/assets/images/thirupaalai-image-1.jpeg'
    ],
    videos: [
      '/assets/images/thirupaalai-video-1.mp4',
      '/assets/images/thirupaalai-video-2.mp4'
    ],
    features: [
      'Modern Open-Plan Design',
      'Premium Interior Woodwork',
      'Custom Glazing & Ventilation',
      'Eco-Friendly Rainwater Systems',
      'High-End Sanitary Fittings',
      'Landscaped Outdoor Entry'
    ],
    mapUrl: 'https://www.google.com/maps/place/Thiruppalai,+Madurai,+Tamil+Nadu/data=!4m2!3m1!1s0x3b00c5ee91807d9f:0xc6822262d1838cf1?entry=tts',
  },
  {
    id: 'mahatma-global-gateway',
    name: 'Mahatma Global Gateway',
    location: 'Madurai, Tamil Nadu',
    category: 'completed',
    status: 'Completed',
    img: '/assets/images/school-image-1.jpeg',
    description: 'Engineering consultancy and comprehensive interior work execution for Mahatma Global Gateway in Madurai.',
    area: 'School Campus',
    year: '2025',
    story: 'Mahatma Global Gateway represents our hallmark project in educational institution interiors and engineering consultancy in Madurai. We designed and executed state-of-the-art classroom designs, administrative offices, corridors, and campus common areas that prioritize a stimulating learning environment. The design features colorful, durable finishes, high-quality safety-first lighting, ergonomic furniture configurations, and premium acoustics. Every element was carefully engineered to balance visual appeal, institutional functionality, and strict safety guidelines.',
    gallery: [
      '/assets/images/school-image-1.jpeg',
      '/assets/images/school-image-2.jpeg',
      '/assets/images/school-image-3.jpeg',
      '/assets/images/school-image-4.jpeg',
      '/assets/images/school-image-5.jpeg',
      '/assets/images/school-image-6.jpeg',
      '/assets/images/school-image-7.jpeg',
      '/assets/images/school-image-8.jpeg',
      '/assets/images/school-image-9.jpeg',
      '/assets/images/school-image-10.jpeg',
      '/assets/images/school-image-11.jpeg',
      '/assets/images/school-image-12.jpeg',
      '/assets/images/school-image-13.jpeg',
      '/assets/images/school-image-14.jpeg',
      '/assets/images/school-image-15.jpeg',
      '/assets/images/school-image-16.jpeg',
      '/assets/images/school-image-17.jpeg',
      '/assets/images/school-image-18.jpeg',
      '/assets/images/school-image-19.jpeg'
    ],
    beforeGallery: [
      '/assets/images/school-image-2.jpeg',
      '/assets/images/school-image-3.jpeg',
      '/assets/images/school-image-5.jpeg',
      '/assets/images/school-image-6.jpeg'
    ],
    afterGallery: [
      '/assets/images/school-image-1.jpeg',
      '/assets/images/school-image-4.jpeg',
      '/assets/images/school-image-7.jpeg',
      '/assets/images/school-image-8.jpeg'
    ],
    features: [
      'Engineering Consultancy',
      'Premium School Interiors',
      'Safety-Focused Lighting',
      'Acoustic Ceiling Panels',
      'Ergonomic Learning Spaces',
      'High-Durability Finishes'
    ],
    mapUrl: 'https://www.google.com/maps/place/Mahatma+Global+Gateway/@9.964722,78.156111,15z/data=!4m2!3m1!1s0x0:0xbf2c8f0000000000?entry=tts',
  },
  {
    id: 'sandhaipettai-residence',
    name: 'Sandhaipettai Residence',
    location: 'Sandhaipettai, Madurai',
    category: 'completed',
    status: 'Completed',
    img: '/assets/images/sandhaipettai-image-1.jpeg',
    description: 'A premium residential project under construction in Madurai featuring modern architectural planning and engineering.',
    area: '4,200 sq.ft',
    year: '2026',
    story: 'Located in the historic area of Sandhaipettai in Madurai, this residential build represents Squaare Ten\'s commitment to premium quality structural engineering. The building features an optimized load-bearing design, high-strength concrete reinforcement, and robust foundation systems. Our team is working closely with top consultants to ensure every aspect of the project meets highest safety and efficiency standards. Custom planning allows for a layout that blends traditional spatial values with high-end modern amenities, perfectly suited for the urban landscape of Madurai.',
    gallery: [
      '/assets/images/sandhaipettai-image-1.jpeg',
      '/assets/images/sandhaipettai-image-2.jpeg',
      '/assets/images/sandhaipettai-image-3.jpeg',
      '/assets/images/sandhaipettai-image-4.jpeg',
      '/assets/images/sandhaipettai-image-5.jpeg'
    ],
    beforeGallery: [
      '/assets/images/sandhaipettai-image-2.jpeg',
      '/assets/images/sandhaipettai-image-3.jpeg'
    ],
    afterGallery: [
      '/assets/images/sandhaipettai-image-1.jpeg',
      '/assets/images/sandhaipettai-image-4.jpeg',
      '/assets/images/sandhaipettai-image-5.jpeg'
    ],
    videos: [
      '/assets/images/sandhaipettai-video-1.mp4',
      '/assets/images/sandhaipettai-video-2.mp4',
      '/assets/images/sandhaipettai-video-3.mp4',
      '/assets/images/sandhaipettai-video-4.mp4',
      '/assets/images/sandhaipettai-video-5.mp4'
    ],
    features: [
      'High-Strength Reinforced Concrete',
      'Optimized Foundation Design',
      'Modern Structural Engineering',
      'Ventilated Spatial Layout',
      'Premium Building Material Sourcing',
      'Integrated Safety Compliance'
    ],
    mapUrl: 'https://www.google.com/maps/place/Sandhaipettai,+Madurai,+Tamil+Nadu/data=!4m2!3m1!1s0x3b00c5df600b3967:0xfa7c0678d5940c3c?entry=tts',
  },
  {
    id: 'emerald-villa-01',
    name: 'Emerald Villa — Type A',
    location: 'Madurai, Tamil Nadu',
    category: 'houses',
    status: 'Ready To Move',
    img: '/assets/images/project-villa.png',
    description: 'Ready-to-move 3BHK villa with premium finishes, private garden, and covered parking.',
    price: '₹1.85 Cr',
    bedrooms: '3 BHK',
    area: '2,800 sq.ft',
    story: 'The Emerald Villa Type A offers the perfect blend of luxury and comfort. With 3 spacious bedrooms, premium Italian marble flooring, and a private garden, this ready-to-move villa is designed for families who value quality living.',
    gallery: ['/assets/images/project-villa.png', '/assets/images/project-interior.png', '/assets/images/project-residential.png'],
    features: ['3 Bedrooms', 'Private Garden', 'Covered Parking', 'Italian Marble', 'Modular Kitchen', 'Rainwater Harvesting'],
  },
  {
    id: 'emerald-villa-02',
    name: 'Emerald Villa — Type B',
    location: 'Coimbatore, Tamil Nadu',
    category: 'houses',
    status: 'Available',
    img: '/assets/images/project-residential.png',
    description: 'Spacious 4BHK independent house with modular kitchen, home theatre, and terrace garden.',
    price: '₹2.45 Cr',
    bedrooms: '4 BHK',
    area: '3,600 sq.ft',
    story: 'The Emerald Villa Type B is our flagship offering — a spacious 4BHK independent house designed for discerning buyers. With a dedicated home theatre, terrace garden, and top-of-the-line modular kitchen, this is luxury redefined.',
    gallery: ['/assets/images/project-residential.png', '/assets/images/project-villa.png', '/assets/images/project-commercial.png'],
    features: ['4 Bedrooms', 'Home Theatre', 'Terrace Garden', 'Modular Kitchen', 'Study Room', 'Double Car Parking'],
  },
  {
    id: 'karuppiah-nagar',
    name: 'Karuppiah Nagar',
    location: 'Kovilpapakudi, Madurai',
    category: 'plots',
    status: 'Available',
    img: '/assets/images/karuppiah-nagar-poster.jpg',
    description: 'DTCP-Approved premium residential plots in Kovilpapakudi, Madurai. Features 30 & 40 ft wide roads, underground drainage, street lights, water connection, and 100% clear titles.',
    plotArea: '1,200 – 2,400 sq.ft',
    approval: 'DTCP Approved',
    price: 'Starting ₹15 Lakhs',
    story: 'Karuppiah Nagar is a premium residential plot development by Squareten Constructions Pvt Ltd, located in the rapidly growing Kovilpapakudi area of Madurai. The DTCP-approved layout features well-planned plots ranging from 1,200 to 2,400 sq.ft with 30 ft and 40 ft wide internal roads, underground drainage, street lighting, and landscaped common areas. With clear title deeds and excellent connectivity to Madurai city center, Karuppiah Nagar offers the perfect canvas for your dream home.',
    gallery: ['/assets/images/karuppiah-nagar-poster.jpg'],
    features: ['DTCP Approved Layout', '30 & 40 ft Wide Roads', 'Underground Drainage', 'Street Lighting', 'Clear Title Deeds', 'Excellent Connectivity'],
    isCustomPage: true,
  },
];
const getGalleryItemClass = (index, total) => {
  if (total === 2) {
    return 'pd-gallery__item--half';
  }
  if (total === 5) {
    return index < 2 ? 'pd-gallery__item--half' : 'pd-gallery__item--third';
  }
  if (total === 10) {
    if (index === 9) return 'pd-gallery__item--full';
    return index === 0 ? 'pd-gallery__item--large' : 'pd-gallery__item--standard';
  }
  if (total === 19) {
    if (index === 18) return 'pd-gallery__item--full';
    return (index === 0 || index === 12) ? 'pd-gallery__item--large' : 'pd-gallery__item--standard';
  }
  if (total % 3 === 0) {
    return index === 0 ? 'pd-gallery__item--large' : 'pd-gallery__item--standard';
  }
  return 'pd-gallery__item--standard';
};

/* ── Auto Carousel for Before / After ────────────────── */
const AutoCarousel = ({ images, title }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="pd-comparison__carousel">
      {images.map((img, i) => (
        <div
          key={img}
          className={`pd-comparison__slide ${i === index ? 'is-active' : ''}`}
        >
          <img src={img} alt={`${title} — Photo ${i + 1}`} loading="lazy" />
        </div>
      ))}
      
      {images.length > 1 && (
        <div className="pd-comparison__dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`pd-comparison__dot ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Location Pin SVG ────────────────────────────────── */
const LocationPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const project = allProjects.find(p => p.id === slug);

  // Redirect to custom page if project has its own dedicated page
  useEffect(() => {
    if (project?.isCustomPage) {
      navigate(`/projects/${project.id}`, { replace: true });
    }
  }, [project, navigate]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-loading');
  }, [slug]);

  // Animations
  useEffect(() => {
    if (!pageRef.current || !project) return;

    const ctx = gsap.context(() => {
      // Hero image cinematic zoom
      gsap.fromTo('.pd-hero__image',
        { scale: 1.05 },
        { scale: 1, duration: 8, ease: 'none' }
      );

      // Content reveal
      gsap.fromTo('.pd-hero__content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      );

      // Story section reveal
      gsap.fromTo('.pd-story',
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pd-story',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Comparison section reveal
      gsap.fromTo('.pd-comparison',
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pd-comparison',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Gallery reveal
      const galleryItems = pageRef.current.querySelectorAll('.pd-gallery__item');
      if (galleryItems.length) {
        gsap.fromTo(galleryItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: '.pd-gallery',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Features reveal
      gsap.fromTo('.pd-features',
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pd-features',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // CTA reveal
      gsap.fromTo('.pd-cta__content',
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pd-cta',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, pageRef.current);

    return () => ctx.revert();
  }, [project]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev - 1 + project.gallery.length) % project.gallery.length);
      if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev + 1) % project.gallery.length);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, project]);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  // 404 fallback
  if (!project) {
    return (
      <div className="app-layout is-ready" ref={pageRef}>
        <Navbar alwaysScrolled />
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 'var(--fs-h1)', marginBottom: 'var(--space-lg)' }}>Project Not Found</h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2xl)' }}>The project you're looking for doesn't exist.</p>
            <Link to="/projects" className="btn btn--primary">Back to Projects</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusClass = {
    'Completed': 'completed',
    'Ongoing': 'ongoing',
    'Available': 'available',
    'Ready To Move': 'ready',
  }[project.status] || 'available';

  return (
    <div className="project-detail-page app-layout is-ready" ref={pageRef}>
      <Navbar alwaysScrolled />

      <main>
        {/* ── Hero ────────────────────────────────────── */}
        <section className="pd-hero">
          <div className="pd-hero__image-wrap">
            <img className="pd-hero__image" src={project.img} alt={project.name} loading="eager" />
            <div className="pd-hero__overlay" />
          </div>
          <div className="pd-hero__content">
            <button className="pd-hero__back" onClick={() => navigate('/projects')}>
              ← Back to Projects
            </button>
            <span className={`pd-hero__status pd-hero__status--${statusClass}`}>
              {project.status}
            </span>
            <h1 className="pd-hero__title">{project.name}</h1>
            {project.mapUrl ? (
              <a href={project.mapUrl} target="_blank" rel="noopener noreferrer" className="pd-hero__location pd-hero__location--link">
                <LocationPin />
                {project.location}
              </a>
            ) : (
              <div className="pd-hero__location">
                <LocationPin />
                {project.location}
              </div>
            )}
            <p className="pd-hero__desc">{project.description}</p>

            {/* Quick info */}
            <div className="pd-hero__meta">
              {project.area && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Area</span>
                  <span className="pd-hero__meta-value">{project.area || project.plotArea}</span>
                </div>
              )}
              {project.year && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Year</span>
                  <span className="pd-hero__meta-value">{project.year}</span>
                </div>
              )}
              {project.price && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Price</span>
                  <span className="pd-hero__meta-value">{project.price}</span>
                </div>
              )}
              {project.bedrooms && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Config</span>
                  <span className="pd-hero__meta-value">{project.bedrooms}</span>
                </div>
              )}
              {project.progress !== undefined && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Progress</span>
                  <span className="pd-hero__meta-value">{project.progress}%</span>
                </div>
              )}
              {project.approval && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Approval</span>
                  <span className="pd-hero__meta-value">{project.approval}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Story ───────────────────────────────────── */}
        {project.story && (
          <section className="pd-story">
            <div className="container">
              <span className="section__label">The Story</span>
              <div className="pd-story__content">
                <h2 className="pd-story__heading">About This Project</h2>
                <p className="pd-story__text">{project.story}</p>
              </div>
            </div>
          </section>
        )}

        {/* ── Before & After Comparison ───────────────── */}
        {project.category !== 'plots' && (project.beforeGallery || (project.gallery && project.gallery.length > 1)) && (
          <section className="pd-comparison">
            <div className="container">
              <span className="section__label">The Transformation</span>
              <h2 className="pd-comparison__heading">Before &amp; After Comparison</h2>
              
              <div className="pd-comparison__grid">
                {/* Before Column */}
                <div className="pd-comparison__column">
                  <div className="pd-comparison__badge pd-comparison__badge--before">Before</div>
                  <AutoCarousel 
                    images={project.beforeGallery || (project.gallery && project.gallery.length > 1 ? [project.gallery[1]] : [project.img])} 
                    title={`${project.name} - Before`} 
                  />
                </div>

                {/* After Column */}
                <div className="pd-comparison__column">
                  <div className="pd-comparison__badge pd-comparison__badge--after">After</div>
                  <AutoCarousel 
                    images={project.afterGallery || (project.gallery && project.gallery.length > 0 ? [project.gallery[0]] : [project.img])} 
                    title={`${project.name} - After`} 
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Progress (Ongoing) ──────────────────────── */}
        {project.progress !== undefined && (
          <section className="pd-progress">
            <div className="container">
              <div className="pd-progress__card">
                <div className="pd-progress__header">
                  <h3 className="pd-progress__title">Construction Progress</h3>
                  <span className="pd-progress__pct">{project.progress}%</span>
                </div>
                <div className="pd-progress__track">
                  <div className="pd-progress__fill" style={{ width: `${project.progress}%` }} />
                </div>
                <div className="pd-progress__info">
                  <div>
                    <span className="pd-progress__label">Current Phase</span>
                    <span className="pd-progress__value">{project.phase}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="pd-progress__label">Expected Completion</span>
                    <span className="pd-progress__value">{project.expectedCompletion}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Gallery ─────────────────────────────────── */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="pd-gallery">
            <div className="container">
              <span className="section__label">Gallery</span>
              <div className="pd-gallery__grid">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    className={`pd-gallery__item ${getGalleryItemClass(i, project.gallery.length)}`}
                    onClick={() => openLightbox(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
                  >
                    <img src={img} alt={`${project.name} — Photo ${i + 1}`} loading="lazy" />
                    <div className="pd-gallery__item-overlay">
                      <span>View</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {/* ── Videos ──────────────────────────────────── */}
        {project.videos && project.videos.length > 0 && (
          <section className="pd-videos">
            <div className="container">
              <span className="section__label">Project Videos</span>
              <div className="pd-videos__grid">
                {project.videos.map((vid, i) => (
                  <div key={i} className="pd-videos__item">
                    <video src={vid} controls preload="metadata" playsInline />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Features ────────────────────────────────── */}
        {project.features && project.features.length > 0 && (
          <section className="pd-features">
            <div className="container">
              <span className="section__label">Key Features</span>
              <div className="pd-features__grid">
                {project.features.map((feature, i) => (
                  <div className="pd-features__item" key={i}>
                    <div className="pd-features__check">✓</div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Contact CTA ─────────────────────────────── */}
        <section className="pd-cta">
          <div className="container">
            <div className="pd-cta__content">
              <h2 className="pd-cta__heading">Interested in This Project?</h2>
              <p className="pd-cta__text">
                Get in touch with our team to learn more, schedule a site visit, or discuss your requirements.
              </p>
              <div className="pd-cta__actions">
                <Link to="/#contact" className="btn btn--primary">Get In Touch</Link>
                <Link to="/projects" className="btn btn--outline">View All Projects</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── Lightbox ──────────────────────────────────── */}
      {lightboxOpen && (
        <div className="pd-lightbox" onClick={(e) => e.target === e.currentTarget && setLightboxOpen(false)}>
          <button className="pd-lightbox__close" onClick={() => setLightboxOpen(false)}>✕</button>
          {project.gallery.length > 1 && (
            <>
              <button
                className="pd-lightbox__nav pd-lightbox__nav--prev"
                onClick={() => setLightboxIndex(prev => (prev - 1 + project.gallery.length) % project.gallery.length)}
              >
                ←
              </button>
              <button
                className="pd-lightbox__nav pd-lightbox__nav--next"
                onClick={() => setLightboxIndex(prev => (prev + 1) % project.gallery.length)}
              >
                →
              </button>
            </>
          )}
          <img
            className="pd-lightbox__image"
            src={project.gallery[lightboxIndex]}
            alt={`${project.name} — Photo ${lightboxIndex + 1}`}
          />
          <div className="pd-lightbox__counter">
            {lightboxIndex + 1} / {project.gallery.length}
          </div>
        </div>
      )}
    </div>
  );
}
