import { ServiceItem, BookingRequest, InquiryMessage, CustomerReview } from '@/models/types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'salon-hydraulic-pump',
    title: 'Hydraulic Pump & Cylinder Overhaul',
    category: 'salon_chair',
    shortDescription: 'Fix sinking chairs, hydraulic fluid leaks, foot pedal failure, and sluggish lifting.',
    detailedDescription: 'Complete surgical overhaul of salon chair hydraulic cylinders, high-pressure nitrile O-rings, pressure valves, and industrial oil flushing. Tested under 250kg weight load.',
    startingPrice: 0,
    priceFormatted: 'Free Inspection & Genuine Spares',
    turnaroundTime: 'Same Day (2-3 hrs)',
    features: ['Hydraulic oil pressure flushing', 'Heavy-duty nitrile seals & O-rings', 'Pedal lock & height fix', '12-Month written warranty'],
    image: '/images/salon-chair-repair.jpg',
    badge: 'Most Requested',
    isPopular: true,
    galleryImages: [
      '/images/salon-chair-repair.jpg',
      '/images/chair-before-after.jpg',
      '/images/vip-salon-atelier.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Disassembly & Fluid Flushing',
        description: 'We carefully dismantle the hydraulic cylinder, inspect inner piston scoring, and completely drain oxidized oil.',
        image: '/images/salon-chair-repair.jpg'
      },
      {
        step: '02',
        title: 'German Seal Replacement & Re-Machining',
        description: 'Installation of high-pressure dual-lip nitrile seals, piston ring replacement, and precision lock-valve calibration.',
        image: '/images/vip-salon-atelier.jpg'
      },
      {
        step: '03',
        title: '250kg Load Resistance Testing',
        description: 'Repressurizing with industrial hydraulic fluid, testing 250kg load holding with zero sinking, and mirror chrome buffing.',
        image: '/images/chair-before-after.jpg'
      }
    ]
  },
  {
    id: 'salon-chair-upholstery',
    title: 'Salon Chair Chemical-Proof Upholstery',
    category: 'salon_chair',
    shortDescription: 'Torn, cracked or faded salon chair leather restored with chemical-proof luxury leather.',
    detailedDescription: 'Special anti-hair, chemical and shampoo bleach-resistant luxury leather upholstery with precision diamond tufting and ergonomic 40D memory cushioning.',
    startingPrice: 0,
    priceFormatted: 'Doorstep Service & Custom Finish',
    turnaroundTime: '24 - 48 Hours',
    features: ['Chemical & bleach resistant PU leather', 'High-density 40D memory foam', 'Custom salon branding colors', 'Double needle stitching'],
    image: '/images/chair-before-after.jpg',
    badge: 'Premium Finish',
    isPopular: true,
    galleryImages: [
      '/images/chair-before-after.jpg',
      '/images/luxury-barber-chair.jpg',
      '/images/bright-salon-chairs.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Stripping & Foam Contouring',
        description: 'Old peeled vinyl is stripped to bare frame, inspected for rust, and padded with 40D high-density orthopedic memory foam.',
        image: '/images/chair-before-after.jpg'
      },
      {
        step: '02',
        title: 'Chemical-Proof Leather Tailoring',
        description: 'Precision cut patterns tailored using salon-grade rexine resistant to bleach, hydrogen peroxide, and sanitizers.',
        image: '/images/luxury-barber-chair.jpg'
      },
      {
        step: '03',
        title: 'Diamond Double-Stitch Assembly',
        description: 'Hand-stretched fit with reinforced double nylon stitching, armrest piping, and final sanitization before delivery.',
        image: '/images/bright-salon-chairs.jpg'
      }
    ]
  },
  {
    id: 'sofa-foam-cushion-refill',
    title: '40D High-Resilience Sofa Cushion Refilling',
    category: 'sofa_repair',
    shortDescription: 'Say goodbye to sagging sunken sofa seats! Replace deflated foam with 40D virgin foam.',
    detailedDescription: 'Cushion core replacement, polyester fiber batting, spring webbing tightening, and lumbar support enhancement for maximum ergonomic comfort.',
    startingPrice: 0,
    priceFormatted: 'Free Inspection & Zero-Sag Guarantee',
    turnaroundTime: 'Same Day / 24 hrs',
    features: ['40D High-Resilience virgin foam', 'Pocket coil & zigzag spring tuning', 'Anti-sag reinforced webbing', '3-Year foam sag warranty'],
    image: '/images/luxury-curved-sofa.jpg',
    badge: 'Comfort Upgrade',
    isPopular: true,
    galleryImages: [
      '/images/luxury-curved-sofa.jpg',
      '/images/sofa-before-after.jpg',
      '/images/bright-luxury-sofa.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Base Webbing & Spring Inspection',
        description: 'We open the dust cover, inspect snapped zigzag springs, and re-tension high-tensile cross webbing.',
        image: '/images/sofa-before-after.jpg'
      },
      {
        step: '02',
        title: '40D Orthopedic Foam Casting',
        description: 'Custom-cut virgin molded foam blocks wrapped with soft Dacron batting for cloud-like seating resilience.',
        image: '/images/luxury-curved-sofa.jpg'
      },
      {
        step: '03',
        title: 'Plump Fit & Zero-Sag Verification',
        description: 'Cushion envelopes re-fitted with heavy-duty hidden zippers and tested for full rebound memory.',
        image: '/images/bright-luxury-sofa.jpg'
      }
    ]
  },
  {
    id: 'salon-swivel-recliner',
    title: '360° Swivel Base & Recliner Gas Spring Fix',
    category: 'salon_chair',
    shortDescription: 'Fix stuck barber reclining levers, broken gas springs, and wobbling swivel bases.',
    detailedDescription: 'Restore 360-degree silent rotation, chrome base plate balance, and multi-angle locking for barber shaving and styling chairs.',
    startingPrice: 0,
    priceFormatted: 'On-Site Fix & 1-Year Warranty',
    turnaroundTime: 'Same Day (1-2 hrs)',
    features: ['360-degree silent bearing fix', 'Barber gas shock replacement', 'Armrest & footrest reinforcement', 'Anti-wobble balance testing'],
    image: '/images/luxury-barber-chair.jpg',
    badge: 'Quick Service',
    isPopular: false,
    galleryImages: [
      '/images/luxury-barber-chair.jpg',
      '/images/vip-salon-atelier.jpg',
      '/images/salon-chair-repair.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Mechanism Teardown & Bearing Cleaning',
        description: 'Dismantling seized ball bearings and multi-position locking gears on the rotating base plate.',
        image: '/images/luxury-barber-chair.jpg'
      },
      {
        step: '02',
        title: 'Gas Shock Cylinder Replacement',
        description: 'Installation of brand new nitrogen gas shock recliners for effortless one-touch backrest adjustment.',
        image: '/images/vip-salon-atelier.jpg'
      },
      {
        step: '03',
        title: 'Silent Spin & Angle Lock Test',
        description: 'Heavy lubrication with synthetic grease and anti-wobble calibration on the floor plate.',
        image: '/images/salon-chair-repair.jpg'
      }
    ]
  },
  {
    id: 'sofa-leather-restoration',
    title: 'Chesterfield & Leather Sofa Restoration',
    category: 'sofa_repair',
    shortDescription: 'Full leather conditioning, crack repair, color matching, and deep diamond tufting.',
    detailedDescription: 'Restore cracked luxury sofas to showroom condition with leather filler, botanical pigment rejuvenation, and hand-punched deep tufted buttons.',
    startingPrice: 0,
    priceFormatted: 'Handcrafted Atelier Restoration',
    turnaroundTime: '2 - 3 Days',
    features: ['Italian leather grade matching', 'Crack & scratch filler', 'Deep diamond button tufting', 'Waterproof protective seal'],
    image: '/images/bright-luxury-sofa.jpg',
    badge: 'Luxury Restoration',
    isPopular: true,
    galleryImages: [
      '/images/bright-luxury-sofa.jpg',
      '/images/luxury-curved-sofa.jpg',
      '/images/sofa-before-after.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Deep Cleaning & Crack Filling',
        description: 'Stripping dirt and wax buildup, micro-sanding cracked surface leather, and applying flexible resin filler.',
        image: '/images/bright-luxury-sofa.jpg'
      },
      {
        step: '02',
        title: 'Color Rejuvenation & Diamond Tufting',
        description: 'Bespoke pigment spraying to restore original leather tone and replacing missing tufted brass buttons.',
        image: '/images/luxury-curved-sofa.jpg'
      },
      {
        step: '03',
        title: 'Conditioning & Protective Sealant',
        description: 'Buffing with organic beeswax leather balm and applying a moisture-proof clear protection seal.',
        image: '/images/sofa-before-after.jpg'
      }
    ]
  },
  {
    id: 'sofa-frame-spring-repair',
    title: 'Structural Timber Frame & Spring Overhaul',
    category: 'sofa_repair',
    shortDescription: 'Fix broken wood joints, creaking sofa noises, snapped springs, and wobbly legs.',
    detailedDescription: 'Heavy seasoned Salwood/Teakwood timber reinforcement, high-tensile steel spring brackets, and anti-slip leg levelers.',
    startingPrice: 0,
    priceFormatted: 'Heavy Duty Structural Reinforcement',
    turnaroundTime: 'Same Day (2-4 hrs)',
    features: ['Heavy hardwood frame bracing', 'Tempered steel spring replacement', 'Zero-creak soundproofing', 'Heavy-duty brass/wood legs'],
    image: '/images/sofa-repair-service.jpg',
    badge: 'Heavy Duty',
    isPopular: false,
    galleryImages: [
      '/images/sofa-repair-service.jpg',
      '/images/sofa-before-after.jpg',
      '/images/luxury-curved-sofa.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Structural Inspection & Joint Alignment',
        description: 'Opening base dust lining, locating fractured timber joints, and clamping broken wood supports.',
        image: '/images/sofa-repair-service.jpg'
      },
      {
        step: '02',
        title: 'Hardwood Corner Block Bracing',
        description: 'Bolting seasoned hardwood gussets and replacing snapped high-tensile carbon springs.',
        image: '/images/sofa-before-after.jpg'
      },
      {
        step: '03',
        title: 'Zero-Creak Soundproofing',
        description: 'Felt insulation installed between metal springs and wood to eliminate 100% of creaking noises.',
        image: '/images/luxury-curved-sofa.jpg'
      }
    ]
  },
  {
    id: 'salon-shampoo-station',
    title: 'Shampoo Station Basin & Recliner Repair',
    category: 'salon_chair',
    shortDescription: 'Fix leaking wash basins, broken neck tilts, drainage traps, and reclining salon shampoo chairs.',
    detailedDescription: 'Complete on-site overhaul of ceramic wash basin tilting hinges, anti-leak water supply lines, silicon sealants, and shampoo chair upholstery.',
    startingPrice: 0,
    priceFormatted: 'Same-Day Plumber & Upholstery Care',
    turnaroundTime: 'Same Day (2-3 hrs)',
    features: ['Ceramic basin tilt mechanism fix', 'Anti-leak plumbing & pipe seal', 'Waterproof vinyl re-padding', 'Rustproof stainless fittings'],
    image: '/images/bright-salon-chairs.jpg',
    badge: 'Specialized',
    isPopular: false,
    galleryImages: [
      '/images/bright-salon-chairs.jpg',
      '/images/salon-chair-repair.jpg',
      '/images/vip-salon-atelier.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Hinges & Tilt Cylinder Calibration',
        description: 'Servicing the rubber shock buffer and tightening loose ceramic basin tilt bolts.',
        image: '/images/bright-salon-chairs.jpg'
      },
      {
        step: '02',
        title: 'Plumbing & Drainage Leakproofing',
        description: 'Replacing brittle drain hoses, sprayer valves, and sealing joints with industrial waterproof silicone.',
        image: '/images/salon-chair-repair.jpg'
      },
      {
        step: '03',
        title: 'Waterproof Leather Conditioning',
        description: 'Treating shampoo chair seats with mold-resistant, anti-bacterial PU coating.',
        image: '/images/vip-salon-atelier.jpg'
      }
    ]
  },
  {
    id: 'commercial-salon-amc',
    title: 'Commercial Salon Fleet Maintenance & AMC',
    category: 'salon_chair',
    shortDescription: 'Preventive monthly maintenance contracts for salon chains with zero downtime guarantee.',
    detailedDescription: 'Dedicated technician support for unisex salons, barbershop chains, and luxury hotels. Includes routine hydraulic servicing, re-tightening, and priority emergency dispatch.',
    startingPrice: 0,
    priceFormatted: 'Priority Salon Fleet Contract',
    turnaroundTime: 'Scheduled & Emergency',
    features: ['Scheduled preventive checkups', 'Emergency 2-hour dispatch', 'Free spare replacements', 'Dedicated account manager'],
    image: '/images/vip-salon-atelier.jpg',
    badge: 'Commercial Partner',
    isPopular: true,
    galleryImages: [
      '/images/vip-salon-atelier.jpg',
      '/images/bright-salon-chairs.jpg',
      '/images/chair-before-after.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Full Fleet Safety Audit',
        description: 'Systematic check of all salon chairs, pumps, recliners, and shampoo stations.',
        image: '/images/vip-salon-atelier.jpg'
      },
      {
        step: '02',
        title: 'Overnight Doorstep Servicing',
        description: 'Hydraulic pressure balancing, fluid top-up, and bolt tightening done after salon hours.',
        image: '/images/bright-salon-chairs.jpg'
      },
      {
        step: '03',
        title: 'Compliance Certification',
        description: 'Issuance of commercial 1-year equipment certification stickers and maintenance logbooks.',
        image: '/images/chair-before-after.jpg'
      }
    ]
  }
];

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 'BK-1001',
    customerName: 'Rajesh Sharma (Looks Salon & Spa)',
    phone: '+91 98111 22334',
    email: 'rajesh@lookssalon.com',
    address: 'Shop 14, Main Market, Greater Kailash 1',
    city: 'New Delhi',
    category: 'salon_chair',
    serviceId: 'salon-hydraulic-pump',
    serviceName: 'Hydraulic Pump & Base Repair',
    itemCount: 4,
    issueDescription: 'Two styling chairs sinking down when clients sit. Hydraulic oil leaking on marble floor.',
    preferredDate: '2026-10-18',
    urgency: 'emergency',
    status: 'in_progress',
    estimatedCost: 3996,
    createdAt: '2026-10-16 09:30:00'
  },
  {
    id: 'BK-1002',
    customerName: 'Priya Mehra',
    phone: '+91 98222 33445',
    email: 'priya.mehra@gmail.com',
    address: 'Flat 802, Orchid Heights, Sector 54',
    city: 'Gurugram',
    category: 'sofa_repair',
    serviceId: 'sofa-foam-cushion-refill',
    serviceName: 'High-Density Foam & Cushion Padding',
    itemCount: 1,
    issueDescription: '3-seater sofa middle seat has sunken down completely. Springs creaking loudly.',
    preferredDate: '2026-10-19',
    urgency: 'normal',
    status: 'pending',
    estimatedCost: 1299,
    createdAt: '2026-10-16 11:15:00'
  }
];

export const INITIAL_INQUIRIES: InquiryMessage[] = [
  {
    id: 'INQ-501',
    name: 'Vikram Sethi (Enrich Salon)',
    phone: '+91 98333 44556',
    email: 'vikram@enrichsalon.com',
    category: 'salon_chair',
    serviceInterest: 'commercial_contract',
    message: 'We have 15 styling chairs across 2 branches that need complete hydraulic pump servicing. Please call back.',
    status: 'unread',
    createdAt: '2026-10-16 08:45:00'
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'REV-01',
    name: 'Kapil Dev',
    customerName: 'Kapil Dev (Scissors Sound Salon)',
    role: 'Salon Owner',
    location: 'South Extension, Delhi',
    rating: 5,
    serviceType: 'Hydraulic Pump & Re-Upholstery (6 Chairs)',
    comment: 'Saved over ₹1.5 Lakhs by repairing our sinking chairs instead of buying new ones. The technician came directly to our salon at 8 PM after closing and finished all 6 chairs by midnight! 10/10 master craft.',
    date: '2026-10-12',
    verified: true
  },
  {
    id: 'REV-02',
    name: 'Ananya Deshmukh',
    customerName: 'Ananya Deshmukh',
    role: 'Homeowner',
    location: 'DLF Phase 5, Gurugram',
    rating: 5,
    serviceType: '5-Seater Italian Leather Sofa Cushion Refill',
    comment: 'Our expensive Chesterfield sofa was sinking in the middle. They put 40D virgin foam and retensioned the springs right at our doorstep. Feels firmer and more comfortable than when brand new.',
    date: '2026-10-14',
    verified: true
  },
  {
    id: 'REV-03',
    name: 'Rahul Khanna',
    customerName: 'Rahul Khanna',
    role: 'Studio Director',
    location: 'Noida Sector 18',
    rating: 5,
    serviceType: 'Reclining Mechanism & Gas Spring Fix',
    comment: 'Instant 2-hour doorstep response on a busy weekend. Hydraulic lift restored with full 250kg holding capacity. Highly recommended for any salon chain.',
    date: '2026-10-15',
    verified: true
  }
];

