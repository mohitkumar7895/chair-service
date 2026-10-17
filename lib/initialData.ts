import { ServiceItem, BookingRequest, InquiryMessage, CustomerReview, GalleryItem } from '@/models/types';

export const INITIAL_SERVICES: ServiceItem[] = [
  // -------------------------------------------------------------
  // OFFICE CHAIR REPAIR SERVICES (All types of Office Chairs)
  // -------------------------------------------------------------
  {
    id: 'office-hydraulic-cylinder-lift',
    title: 'Pneumatic Gas Lift & Hydraulic Cylinder Replacement',
    category: 'office_chair',
    shortDescription: 'Fix sinking office chairs instantly. Class-4 BIFMA heavy-duty gas cylinder with 200kg load capacity.',
    detailedDescription: 'Does your office chair slowly sink to the ground while working? We replace leaking and dead pneumatic hydraulic cylinders with heavy-duty Class-4 BIFMA-certified gas lifts on-site at your home or corporate office within 20 minutes.',
    startingPrice: 0,
    priceFormatted: 'On-Site 20-Min Fix & 1-Year Warranty',
    turnaroundTime: 'Same Day (20 - 30 mins)',
    features: ['Class-4 BIFMA nitrogen gas cylinder', '200kg heavy-duty load capacity', 'Instant doorstep replacement', '1-Year no-questions replacement warranty'],
    image: '/images/office-chair-hydraulic-repair.jpg',
    badge: 'Most Popular',
    isPopular: true,
    galleryImages: [
      '/images/office-chair-hydraulic-repair.jpg',
      '/images/office-chair-repair-tools.jpg',
      '/images/office-chair-broken-base.jpg',
      '/images/office-chair-executive-black.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Safe Extraction & Base Decompression',
        description: 'Safe hydraulic cylinder extraction using specialized pipe clamps without damaging the chair mechanism or five-star base.',
        image: '/images/office-chair-repair-tools.jpg'
      },
      {
        step: '02',
        title: 'Class-4 BIFMA Gas Lift Installation',
        description: 'Installation of brand new Class-4 nitrogen gas lift cylinder with precision taper lock for rock-solid stability.',
        image: '/images/office-chair-hydraulic-repair.jpg'
      },
      {
        step: '03',
        title: 'Load Testing & Height Lock Verification',
        description: 'Multi-height adjustment testing under full 200kg load with zero downward creeping or pressure leakage.',
        image: '/images/office-chair-executive-black.jpg'
      }
    ]
  },
  {
    id: 'office-executive-leather-overhaul',
    title: 'Executive Boss High-Back Chair Overhaul & Re-upholstery',
    category: 'office_chair',
    shortDescription: 'Restore peeling, cracked leather, flattened seat foam, and squeaky tilt mechanisms on boss chairs.',
    detailedDescription: 'Transform aging executive and boss chairs to showroom-level glory. Complete stripping of cracked leatherette, 40D high-density orthopedic molded foam padding, premium breathable PU leather reupholstery with double-needle contrast stitching.',
    startingPrice: 0,
    priceFormatted: 'Free Doorstep Assessment & 2-Year Warranty',
    turnaroundTime: '24 - 48 Hours',
    features: ['Automotive-grade anti-peel PU leatherette', '40D High-resilience orthopedic foam', 'Heavy-duty tilt tension recalibration', 'Ergonomic armrest re-padding'],
    image: '/images/office-chair-executive-black.jpg',
    badge: 'Executive Class',
    isPopular: true,
    galleryImages: [
      '/images/office-chair-executive-black.jpg',
      '/images/office-chair-executive-peeling.jpg',
      '/images/office-chair-repair-tools.jpg',
      '/images/office-chair-hydraulic-repair.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Stripping & Rust Removal',
        description: 'Old peeled vinyl stripped down to bare skeleton frame, bolts tightened, and armrest metal polished.',
        image: '/images/office-chair-executive-peeling.jpg'
      },
      {
        step: '02',
        title: '40D Molded Foam Padding',
        description: 'Layering premium 40D high-resilience foam to eliminate spine fatigue and restore original puffy curves.',
        image: '/images/office-chair-repair-tools.jpg'
      },
      {
        step: '03',
        title: 'Tailored Leatherette Reupholstery',
        description: 'Hand-tailored breathable leatherette with heavy nylon contrast stitch, tilt tension lubrication, and final shine.',
        image: '/images/office-chair-executive-black.jpg'
      }
    ]
  },
  {
    id: 'office-mesh-ergonomic-repair',
    title: 'Ergonomic Mesh Chair Repair & Lumbar Spine Restring',
    category: 'office_chair',
    shortDescription: 'Restore sagging mesh backs, broken lumbar spine supports, slipping tilt-locks, and loose armrests.',
    detailedDescription: 'Specialized repair for premium ergonomic task chairs (like Featherlite, Steelcase, Herman Miller style mesh chairs). We replace torn or sagging backrest mesh with heavy-duty breathable elastomer mesh, replace broken lumbar adjusters, and calibrate synchro-tilt multi-locking levers.',
    startingPrice: 0,
    priceFormatted: 'Genuine Mesh Spares & Same-Day Service',
    turnaroundTime: 'Same Day / 24 hrs',
    features: ['High-tensile breathable Korean mesh', 'Adjustable lumbar support track fix', '3D armrest pad & height adjuster fix', 'Synchro-tilt multi-position lock calibration'],
    image: '/images/office-chair-mesh-front.jpg',
    badge: 'Ergonomic Specialist',
    isPopular: true,
    galleryImages: [
      '/images/office-chair-mesh-front.jpg',
      '/images/office-chair-mesh-back.jpg',
      '/images/office-chair-repair-tools.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Mesh Tension & Frame Inspection',
        description: 'Disassembling perimeter spine spline, inspecting fractured lumbar sliders and multi-angle recline levers.',
        image: '/images/office-chair-mesh-back.jpg'
      },
      {
        step: '02',
        title: 'High-Tensile Elastomer Mesh Installation',
        description: 'Machine-stretched breathable Korean mesh fastened with industrial pressure splines for zero sagging.',
        image: '/images/office-chair-mesh-front.jpg'
      },
      {
        step: '03',
        title: 'Synchro-Tilt & Armrest Calibration',
        description: 'Lubricating tilt lock teeth, replacing cracked 3D armrest caps, and testing multi-angle lock firmness.',
        image: '/images/office-chair-repair-tools.jpg'
      }
    ]
  },
  {
    id: 'office-base-caster-wheels',
    title: 'Heavy-Duty 5-Star Metal Base & Rollerblade Caster Wheels',
    category: 'office_chair',
    shortDescription: 'Fix broken chrome legs, cracked plastic bases, and scratchy, jammed chair wheels.',
    detailedDescription: 'Upgrade or replace broken 5-star bases with industrial reinforced chrome steel or heavy nylon bases capable of holding up to 350kg. We also install silent soft-polyurethane rollerblade casters that glide effortlessly without scratching hardwood, tiles, or carpets.',
    startingPrice: 0,
    priceFormatted: 'Heavy-Duty Hardware & Doorstep Installation',
    turnaroundTime: 'Instant (15-20 mins)',
    features: ['Heavy-gauge chrome steel 5-star base', 'Smooth silent rollerblade polyurethane wheels', 'Anti-scratch floor safe guarantee', 'Precision universal stem fit'],
    image: '/images/office-chair-broken-base.jpg',
    badge: 'Heavy Duty',
    isPopular: false,
    galleryImages: [
      '/images/office-chair-broken-base.jpg',
      '/images/office-chair-repair-tools.jpg',
      '/images/office-chair-hydraulic-repair.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Damaged Base Disconnection',
        description: 'Removing shattered nylon legs or cracked metal welding without harming cylinder shaft.',
        image: '/images/office-chair-broken-base.jpg'
      },
      {
        step: '02',
        title: 'Chrome Base Socket Alignment',
        description: 'Fitting reinforced chrome five-star base engineered for up to 350kg static weight resistance.',
        image: '/images/office-chair-hydraulic-repair.jpg'
      },
      {
        step: '03',
        title: 'Silent Rollerblade Caster Pop-In',
        description: 'Snapping in dual ball-bearing polyurethane wheels for whisper-quiet glide on any floor surface.',
        image: '/images/office-chair-repair-tools.jpg'
      }
    ]
  },
  {
    id: 'office-workstation-chair-reupholstery',
    title: 'Workstation & Computer Chair Cushioning & Reupholstery',
    category: 'office_chair',
    shortDescription: 'Re-pad deflated seat cushions and replace worn cloth/fabric with vibrant, durable upholstery.',
    detailedDescription: 'Bulk and single chair renewal for computer staff chairs, conference chairs, and study chairs. Available in vibrant corporate colours (forest green, royal blue, maroon, charcoal black) with 40D virgin foam that banishes lower back ache.',
    startingPrice: 0,
    priceFormatted: 'Corporate Bulk Discounts & On-Site Service',
    turnaroundTime: 'Same Day / 24 hrs',
    features: ['Heavy-duty stain resistant breathable fabric', '40D virgin foam seat core injection', 'Corporate AMC & bulk fleet discounts', 'Swivel base tune-up included'],
    image: '/images/office-chair-green-upholstery.jpg',
    badge: 'Corporate Favorite',
    isPopular: false,
    galleryImages: [
      '/images/office-chair-green-upholstery.jpg',
      '/images/office-chair-maroon-upholstery.jpg',
      '/images/chair-cream-lounge.jpg',
      '/images/office-chair-repair-tools.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Foam Density Restoration',
        description: 'Removing flattened sponge, rebuilding core with 40D orthopedic virgin molded foam cushion.',
        image: '/images/office-chair-repair-tools.jpg'
      },
      {
        step: '02',
        title: 'Fabric / Leatherette Stretching',
        description: 'Precision pneumatic stapling with anti-fungal, water-repellent breathable fabric in chosen shade.',
        image: '/images/office-chair-maroon-upholstery.jpg'
      },
      {
        step: '03',
        title: 'Hardware Lubrication & Delivery',
        description: 'Deep greasing of swivel bearing and gas shock, delivered clean and ready for work.',
        image: '/images/office-chair-green-upholstery.jpg'
      }
    ]
  },

  // -------------------------------------------------------------
  // RECLINER CHAIR REPAIR SERVICES (Motorized, Manual & Salon Recliners)
  // -------------------------------------------------------------
  {
    id: 'recliner-motorized-electric-repair',
    title: 'Motorized & Electric Power Recliner Repair',
    category: 'recliner_chair',
    shortDescription: 'Fix stuck electric recliners, broken actuator motors, unresponsive remotes, and power failures.',
    detailedDescription: 'Complete diagnostic and repair service for electric motorized recliners, zero-gravity chairs, and lift chairs (La-Z-Boy, Royaloak, Stanley, etc.). We repair or replace linear actuators, control handset switches, 29V power adapters, and internal wiring harnesses on-site.',
    startingPrice: 0,
    priceFormatted: 'Certified Electrical Diagnostics & 1-Year Warranty',
    turnaroundTime: 'Same Day (1-2 hrs)',
    features: ['Heavy-duty linear actuator motor repair', 'Remote handset switch & wiring replacement', 'Quiet zero-friction motorized recline', 'Power surge protected adapter replacement'],
    image: '/images/recliner-motorized-repair.jpg',
    badge: 'Motorized Expert',
    isPopular: true,
    galleryImages: [
      '/images/recliner-motorized-repair.jpg',
      '/images/recliner-chair-black-tufted.jpg',
      '/images/sofa-sectional-l-shape.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Electrical Diagnostics & Motor Scan',
        description: 'Multimeter voltage check across power transformer, circuit PCB, remote switch, and actuator motor.',
        image: '/images/recliner-motorized-repair.jpg'
      },
      {
        step: '02',
        title: 'Actuator or Control Handset Replacement',
        description: 'Installation of high-torque, silent linear push-pull motor or genuine replacement touch control wand.',
        image: '/images/recliner-chair-black-tufted.jpg'
      },
      {
        step: '03',
        title: 'Full-Range Zero Gravity Calibration',
        description: 'Re-aligning mechanical linkage hinges with Teflon dry lubricant for silent opening and closing.',
        image: '/images/recliner-motorized-repair.jpg'
      }
    ]
  },
  {
    id: 'recliner-manual-mechanism-cable',
    title: 'Manual Recliner Mechanism & Snapped Cable Repair',
    category: 'recliner_chair',
    shortDescription: 'Fix broken pull handles, snapped steel cables, stuck footrests, and crooked reclining frames.',
    detailedDescription: 'Does your recliner footrest refuse to pop open or close back properly? We replace snapped parachute pull handles and high-tensile steel cables, straighten twisted steel scissor linkages, and calibrate heavy-duty return springs for effortless reclining.',
    startingPrice: 0,
    priceFormatted: 'Doorstep Quick Fix & Genuine Cable Spares',
    turnaroundTime: 'Same Day (45 mins)',
    features: ['Aviation-grade braided steel tension cables', 'Heavy-duty footrest scissor mechanism alignment', 'Tension spring recalibration & anti-squeak lubrication', 'Genuine metal pull handle upgrade'],
    image: '/images/recliner-chair-black-tufted.jpg',
    badge: 'Quick Fix',
    isPopular: true,
    galleryImages: [
      '/images/recliner-chair-black-tufted.jpg',
      '/images/recliner-motorized-repair.jpg',
      '/images/recliner-chair-salmon.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Mechanism Inspection & Tension Release',
        description: 'Inspecting snapped cable barrels, release handles, and bent scissor arms under the recliner seat.',
        image: '/images/recliner-chair-black-tufted.jpg'
      },
      {
        step: '02',
        title: 'Steel Braided Cable & Spring Replacement',
        description: 'Installation of high-tensile aviation steel replacement cable and balanced extension springs.',
        image: '/images/recliner-motorized-repair.jpg'
      },
      {
        step: '03',
        title: 'One-Touch Pop & Lock Verification',
        description: 'Testing smooth finger-touch footrest release and effortless kick-back locking with silent operation.',
        image: '/images/recliner-chair-black-tufted.jpg'
      }
    ]
  },
  {
    id: 'recliner-luxury-reupholstery',
    title: 'Luxury Recliner Leather Re-Upholstery & Cushion Refilling',
    category: 'recliner_chair',
    shortDescription: 'Torn, peeled, or sagging luxury recliners restored with premium Italian leather & 40D memory foam.',
    detailedDescription: 'Deep hand-tufted leather re-upholstery for cinema recliners, living room club recliners, and lounge chairs. Re-energize sagging lumbar cushions with 40D high-resilience foam and genuine Italian top-grain leather or durable leatherette.',
    startingPrice: 0,
    priceFormatted: 'Handcrafted Atelier Quality & 3-Year Sag Guarantee',
    turnaroundTime: '2 - 4 Days',
    features: ['Top-grain Italian leather & anti-scratch leatherette', '40D High-resilience virgin foam refilling', 'Deep button tufting & armrest piping', 'Waterproof and anti-stain protective sealant'],
    image: '/images/chair-tufted-emerald.jpg',
    badge: 'Luxury Atelier',
    isPopular: true,
    galleryImages: [
      '/images/chair-tufted-emerald.jpg',
      '/images/recliner-chair-black-tufted.jpg',
      '/images/chair-cream-lounge.jpg',
      '/images/sofa-fluted-grey.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Cushion Foam Core Overhaul',
        description: 'Opening seat and back envelopes to insert custom-contoured 40D orthopedic memory foam blocks.',
        image: '/images/chair-tufted-emerald.jpg'
      },
      {
        step: '02',
        title: 'Handcrafted Leather Tailoring',
        description: 'Precision hand-cutting and sewing of luxurious leather panels with reinforced nylon seam threads.',
        image: '/images/recliner-chair-black-tufted.jpg'
      },
      {
        step: '03',
        title: 'Deep Button Tufting & Final Finish',
        description: 'Securing deep hand-tufted brass buttons, applying protective leather balm, and mechanism alignment.',
        image: '/images/chair-cream-lounge.jpg'
      }
    ]
  },
  {
    id: 'recliner-barber-styling-chair',
    title: 'Barber & Salon Reclining Hydraulic Chair Overhaul',
    category: 'recliner_chair',
    shortDescription: 'Fix shaving backrest recline levers, gas springs, and heavy cast-iron footrests on salon chairs.',
    detailedDescription: 'Specialized servicing for barber shop shaving chairs, facial recliners, and tattoo artist chairs. We replace reclining gas springs, calibrate multi-position backrest locking levers, and refurbish chemical-proof leatherette upholstery.',
    startingPrice: 0,
    priceFormatted: 'Salon Doorstep Service & 1-Year Warranty',
    turnaroundTime: 'Same Day (1-2 hrs)',
    features: ['Barber gas spring shock absorber fix', 'Cast iron footrest & tilt linkage reinforcement', 'Chemical & shampoo-resistant leatherette', '360-degree smooth lock rotation'],
    image: '/images/recliner-chair-salmon.jpg',
    badge: 'Barber Favorite',
    isPopular: false,
    galleryImages: [
      '/images/recliner-chair-salmon.jpg',
      '/images/recliner-chair-green-barber.jpg',
      '/images/shampoo-station-black.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Recline Gas Shock Teardown',
        description: 'Removing failed nitrogen gas spring cylinder beneath seat and cleaning mechanical locking teeth.',
        image: '/images/recliner-chair-salmon.jpg'
      },
      {
        step: '02',
        title: 'Heavy Nitrogen Gas Damper Installation',
        description: 'Installing brand-new high-force reclining gas spring with feather-touch lever engagement.',
        image: '/images/recliner-chair-green-barber.jpg'
      },
      {
        step: '03',
        title: 'Footrest & Swivel Base Calibration',
        description: 'Reinforcing heavy cast-iron footrest hinge pins and greasing 360-degree bearing ball tracks.',
        image: '/images/recliner-chair-salmon.jpg'
      }
    ]
  },
  {
    id: 'recliner-shampoo-station-repair',
    title: 'Salon Shampoo Station Basin & Reclining Bed Repair',
    category: 'recliner_chair',
    shortDescription: 'Fix leaking ceramic wash basins, tilt mechanism bolts, drain traps, and wet damaged upholstery.',
    detailedDescription: 'Doorstep plumbing and upholstery care for hair wash shampoo stations. We repair neck-rest tilt mechanisms, seal drainage hoses against water leaks, and re-pad damaged seats with waterproof anti-microbial leatherette.',
    startingPrice: 0,
    priceFormatted: 'Doorstep Plumber & Upholstery Care',
    turnaroundTime: 'Same Day (2-3 hrs)',
    features: ['Ceramic basin tilt hinge rebuild', 'Anti-leak plumbing pipe joints & silicone seals', 'Waterproof & mold-resistant PU padding', 'Rust-proof stainless steel fittings'],
    image: '/images/shampoo-station-black.jpg',
    badge: 'Specialized',
    isPopular: false,
    galleryImages: [
      '/images/shampoo-station-black.jpg',
      '/images/shampoo-station-salmon.jpg',
      '/images/bright-salon-chairs.jpg'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Basin Tilt Hinge Servicing',
        description: 'Rebuilding dampening rubber buffers and tightening rust-proof stainless hinge pivot bolts.',
        image: '/images/shampoo-station-black.jpg'
      },
      {
        step: '02',
        title: 'Plumbing & Drain Leakproofing',
        description: 'Industrial silicone sealing of mixer taps, spray nozzles, and flexible braided corrugated drain hoses.',
        image: '/images/shampoo-station-salmon.jpg'
      },
      {
        step: '03',
        title: 'Waterproof Leather Cushion Fit',
        description: 'Refitting sanitized, bleach-resistant, moisture-impermeable PU cushions on reclining wash station.',
        image: '/images/bright-salon-chairs.jpg'
      }
    ]
  },

  // -------------------------------------------------------------
  // SALON CHAIR RESTORATION SERVICES
  // -------------------------------------------------------------
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
    id: 'commercial-salon-amc',
    title: 'Commercial Salon & Corporate Fleet Maintenance AMC',
    category: 'salon_chair',
    shortDescription: 'Preventive monthly maintenance contracts for salon chains and corporate offices with zero downtime.',
    detailedDescription: 'Dedicated technician support for unisex salons, barbershop chains, corporate co-working spaces, and hotels. Includes routine hydraulic servicing, re-tightening, and priority emergency dispatch.',
    startingPrice: 0,
    priceFormatted: 'Priority Fleet Contract & Bulk Discount',
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
        description: 'Systematic check of all salon chairs, office chairs, pumps, recliners, and shampoo stations.',
        image: '/images/vip-salon-atelier.jpg'
      },
      {
        step: '02',
        title: 'Overnight Doorstep Servicing',
        description: 'Hydraulic pressure balancing, fluid top-up, and bolt tightening done after business hours.',
        image: '/images/bright-salon-chairs.jpg'
      },
      {
        step: '03',
        title: 'Compliance Certification',
        description: 'Issuance of commercial 1-year equipment certification stickers and maintenance logbooks.',
        image: '/images/chair-before-after.jpg'
      }
    ]
  },

  // -------------------------------------------------------------
  // SOFA & COUCH RESTORATION SERVICES
  // -------------------------------------------------------------
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
      '/images/bright-luxury-sofa.jpg',
      '/images/sofa-sectional-l-shape.jpg'
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
      '/images/sofa-before-after.jpg',
      '/images/sofa-fluted-grey.jpg'
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
  }
];

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 'BK-1001',
    customerName: 'Aman Singhal (Tech Park Tower 3)',
    phone: '+91 98111 22334',
    email: 'aman.singhal@outlook.com',
    address: 'DLF Cyber City, Tower 8, 4th Floor',
    city: 'Gurugram',
    category: 'office_chair',
    serviceId: 'office-hydraulic-cylinder-lift',
    serviceName: 'Pneumatic Gas Lift & Hydraulic Cylinder Replacement',
    itemCount: 8,
    issueDescription: '8 Ergonomic office chairs sinking down when employees sit. Gas lift cylinders need immediate replacement.',
    preferredDate: '2026-10-18',
    urgency: 'same_day',
    status: 'in_progress',
    estimatedCost: 3996,
    createdAt: '2026-10-16 09:30:00'
  },
  {
    id: 'BK-1002',
    customerName: 'Pooja Verma',
    phone: '+91 98222 33445',
    email: 'pooja.verma@gmail.com',
    address: 'B-402, DLF Phase 5',
    city: 'Gurugram',
    category: 'recliner_chair',
    serviceId: 'recliner-motorized-electric-repair',
    serviceName: 'Motorized & Electric Power Recliner Repair',
    itemCount: 1,
    issueDescription: 'Motorized recliner footrest stuck in open position, remote button not responding.',
    preferredDate: '2026-10-19',
    urgency: 'emergency',
    status: 'assigned',
    estimatedCost: 1800,
    createdAt: '2026-10-16 11:15:00'
  },
  {
    id: 'BK-1003',
    customerName: 'Rajesh Sharma (Looks Salon & Spa)',
    phone: '+91 98111 55667',
    email: 'rajesh@lookssalon.com',
    address: 'Shop 14, Main Market, Greater Kailash 1',
    city: 'New Delhi',
    category: 'salon_chair',
    serviceId: 'salon-hydraulic-pump',
    serviceName: 'Hydraulic Pump & Base Repair',
    itemCount: 4,
    issueDescription: 'Two styling chairs sinking down when clients sit. Hydraulic oil leaking on marble floor.',
    preferredDate: '2026-10-20',
    urgency: 'normal',
    status: 'pending',
    estimatedCost: 3996,
    createdAt: '2026-10-16 14:00:00'
  }
];

export const INITIAL_INQUIRIES: InquiryMessage[] = [
  {
    id: 'INQ-501',
    name: 'Vikram Sethi (Co-Working Space)',
    phone: '+91 98333 44556',
    email: 'vikram@cowork.in',
    category: 'office_chair',
    serviceInterest: 'office-mesh-ergonomic-repair',
    message: 'We have 25 mesh office chairs that need lumbar support fixing and hydraulic gas cylinder replacements. Please share quote.',
    status: 'unread',
    createdAt: '2026-10-16 08:45:00'
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'REV-01',
    name: 'Siddharth Malhotra',
    customerName: 'Siddharth Malhotra',
    role: 'Managing Director, Fintech Hub',
    location: 'Cyber City, Gurugram',
    rating: 5,
    serviceType: 'Office Chair Gas Lift & Base Overhaul (12 Chairs)',
    comment: 'Technician visited on Sunday and replaced 12 Class-4 gas lift cylinders in just 2 hours. Saved us lakhs over buying new chairs. Unmatched speed!',
    date: '2026-10-15',
    verified: true
  },
  {
    id: 'REV-02',
    name: 'Meenakshi Sundaram',
    customerName: 'Meenakshi Sundaram',
    role: 'Homeowner',
    location: 'Golf Course Road, Gurugram',
    rating: 5,
    serviceType: 'Motorized Recliner Actuator Motor Repair',
    comment: 'Our imported motorized recliner was jammed. They diagnosed the actuator motor on the spot and fixed it in 45 minutes at home. Fantastic work!',
    date: '2026-10-14',
    verified: true
  },
  {
    id: 'REV-03',
    name: 'Kapil Dev',
    customerName: 'Kapil Dev (Scissors Sound Salon)',
    role: 'Salon Owner',
    location: 'South Extension, Delhi',
    rating: 5,
    serviceType: 'Hydraulic Pump & Re-Upholstery (6 Chairs)',
    comment: 'Saved ₹1.5 Lakhs by fixing our sinking chairs. Technician came at 8 PM after salon closing and completed all 6 chairs overnight. 10/10 craft!',
    date: '2026-10-12',
    verified: true
  },
  {
    id: 'REV-04',
    name: 'Ananya Deshmukh',
    customerName: 'Ananya Deshmukh',
    role: 'Architect',
    location: 'DLF Phase 5, Gurugram',
    rating: 5,
    serviceType: 'Executive Boss Chair Leather & 40D Foam',
    comment: 'Re-padded my peeling boss chair with 40D memory foam and breathable black leatherette. It feels more comfortable than brand new!',
    date: '2026-10-13',
    verified: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Master Technician Doorstep Chair Overhaul',
    category: 'office_chair',
    imageUrl: '/images/technician-repairing-chair.jpg',
    description: 'Live on-site precision calibration and Class-4 hydraulic cylinder replacement.',
    createdAt: '2026-10-15'
  },
  {
    id: 'gal-02',
    title: 'Executive Boss High-Back Restoration',
    category: 'office_chair',
    imageUrl: '/images/office-boss-chair-luxury.jpg',
    description: 'Class-4 heavy-duty nitrogen lift and premium leather upholstery finish.',
    createdAt: '2026-10-14'
  },
  {
    id: 'gal-03',
    title: 'Class-4 Hydraulic Gas Lift Replacement',
    category: 'office_chair',
    imageUrl: '/images/office-chair-hydraulic-repair.jpg',
    description: '200kg rated gas cylinder replacement with silent polyurethane casters.',
    createdAt: '2026-10-13'
  },
  {
    id: 'gal-04',
    title: 'Motorized Electric Recliner Actuator Repair',
    category: 'recliner_chair',
    imageUrl: '/images/recliner-motorized-repair.jpg',
    description: 'German linear actuator motor and remote controller calibration on-site.',
    createdAt: '2026-10-12'
  },
  {
    id: 'gal-05',
    title: 'Tufted Black Recliner Lounge Chair',
    category: 'recliner_chair',
    imageUrl: '/images/recliner-chair-black-tufted.jpg',
    description: 'Complete mechanical track servicing and deep leather rejuvenation.',
    createdAt: '2026-10-11'
  },
  {
    id: 'gal-06',
    title: 'Salon Hydraulic Pump Rebuild & Seals',
    category: 'salon_chair',
    imageUrl: '/images/salon-chair-repair.jpg',
    description: 'Heavy-duty 250kg hydraulic cylinder rebuild with leak-proof seals.',
    createdAt: '2026-10-10'
  },
  {
    id: 'gal-07',
    title: 'Salon Styling Chairs Doorstep Restoration',
    category: 'salon_chair',
    imageUrl: '/images/bright-salon-chairs.jpg',
    description: 'Fleet overhaul for busy franchise salon with zero downtime.',
    createdAt: '2026-10-09'
  },
  {
    id: 'gal-08',
    title: 'Luxury Curved Sofa 40D Foam Rebuilding',
    category: 'sofa_repair',
    imageUrl: '/images/luxury-curved-sofa.jpg',
    description: '40-density orthopedic memory foam injection and zero-sag reconstruction.',
    createdAt: '2026-10-08'
  },
  {
    id: 'gal-09',
    title: 'Chesterfield & Sectional Sofa Restoration',
    category: 'sofa_repair',
    imageUrl: '/images/sofa-repair-service.jpg',
    description: 'Broken spring replacement and premium fabric rejuvenation.',
    createdAt: '2026-10-07'
  },
  {
    id: 'gal-10',
    title: 'Salon Hydraulic Chair Before & After',
    category: 'salon_chair',
    imageUrl: '/images/chair-before-after.jpg',
    description: 'Full transformation of peeling, sinking hydraulic salon unit.',
    createdAt: '2026-10-06'
  },
  {
    id: 'gal-11',
    title: 'Sofa Deep Cushion Reconstruction',
    category: 'sofa_repair',
    imageUrl: '/images/sofa-before-after.jpg',
    description: 'Sagging sofa base re-webbing with virgin molded foam.',
    createdAt: '2026-10-05'
  },
  {
    id: 'gal-12',
    title: 'VIP Atelier Master Craftsmanship',
    category: 'salon_chair',
    imageUrl: '/images/vip-salon-atelier.jpg',
    description: 'Hand-stitched chemical-proof leather and chrome base polishing.',
    createdAt: '2026-10-04'
  }
];
