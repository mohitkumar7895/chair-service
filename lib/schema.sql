-- ==============================================================
-- DATABASE SCHEMA: Salon Chair Repair and Sofa Repair Service
-- ==============================================================

CREATE DATABASE IF NOT EXISTS salon_sofa_repair;
USE salon_sofa_repair;

-- 1. Services Table
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category ENUM('office_chair', 'recliner_chair', 'salon_chair', 'sofa_repair') NOT NULL,
  short_description TEXT NOT NULL,
  detailed_description TEXT,
  starting_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  price_formatted VARCHAR(64) NOT NULL,
  turnaround_time VARCHAR(100) NOT NULL,
  features JSON,
  image VARCHAR(255) NOT NULL,
  badge VARCHAR(64),
  is_popular BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bookings / Repair Requests Table
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(64) PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  category ENUM('office_chair', 'recliner_chair', 'salon_chair', 'sofa_repair') NOT NULL,
  service_id VARCHAR(64),
  service_name VARCHAR(255) NOT NULL,
  item_count INT DEFAULT 1,
  issue_description TEXT,
  preferred_date VARCHAR(50),
  urgency ENUM('normal', 'same_day', 'emergency') DEFAULT 'normal',
  status ENUM('pending', 'assigned', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
  estimated_cost DECIMAL(10, 2) DEFAULT 0.00,
  photo_url VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  category VARCHAR(50) DEFAULT 'general',
  message TEXT NOT NULL,
  status ENUM('unread', 'read', 'contacted') DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Customer Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(150),
  location VARCHAR(150),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  service_type VARCHAR(150) NOT NULL,
  comment TEXT NOT NULL,
  verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Admin Users Table
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'superadmin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Admin User (admin / admin123)
INSERT IGNORE INTO admins (username, password_hash, role)
VALUES ('admin', 'admin123', 'superadmin');

-- Sample Initial Services Seed Data
INSERT IGNORE INTO services (id, title, category, short_description, detailed_description, starting_price, price_formatted, turnaround_time, features, image, badge, is_popular)
VALUES 
('salon-hydraulic-pump', 'Hydraulic Pump & Base Repair', 'salon_chair', 
 'Fix sinking chairs, hydraulic fluid leaks, foot pedal failure, and sluggish lifting with authentic heavy-duty hydraulic replacement parts.',
 'Complete overhaul of salon chair hydraulic cylinders, O-rings, pressure seals, and oil flushing. We test up to 250kg weight resistance.',
 999.00, 'Starting at ₹999 / $45', 'Same Day (2-3 hrs)',
 '["Hydraulic oil pressure flushing", "Heavy duty oil seals & O-rings", "Pedal lock & height fix", "6-Month hydraulic warranty"]',
 '/images/salon-chair-repair.jpg', 'Most Requested', TRUE),

('salon-chair-upholstery', 'Salon Chair Leather Upholstery', 'salon_chair',
 'Torn, cracked or faded salon chair leather restored with high-density foam and chemical-resistant salon grade Rexine or Italian leather.',
 'Special anti-hair, chemical and shampoo bleach-resistant luxury leather upholstery with precision diamond tufting.',
 1499.00, 'Starting at ₹1,499 / $65', '24 - 48 Hours',
 '["Chemical & dye resistant leather", "High-density 40D memory foam", "Custom salon branding colors", "Double needle stitching"]',
 '/images/chair-before-after.jpg', 'Premium', TRUE),

('salon-swivel-recliner', 'Reclining Mechanism & 360 Swivel Fix', 'salon_chair',
 'Fix stuck barber reclining levers, broken gas springs, wobbling swivel bases, and loose armrests for smooth salon operation.',
 'Restore 360-degree silent rotation, chrome base plate balance, and multi-angle locking for barber shaving and styling chairs.',
 799.00, 'Starting at ₹799 / $35', 'Same Day (1-2 hrs)',
 '["360-degree silent bearing fix", "Barber gas shock replacement", "Armrest & footrest reinforcement", "Anti-wobble balance testing"]',
 '/images/hero-restoration.jpg', 'Quick Fix', FALSE),

('sofa-leather-restoration', 'Chesterfield & Leather Sofa Restoration', 'sofa_repair',
 'Full leather conditioning, crack repair, color matching, and deep diamond tufting for genuine leather and leatherette sofas.',
 'Restore cracked luxury sofas to showroom condition with leather filler, pigment rejuvenation, and hand-punched deep tufted buttons.',
 2499.00, 'Starting at ₹2,499 / $99', '2 - 3 Days',
 '["Italian leather grade matching", "Crack & scratch filler", "Deep diamond button tufting", "Waterproof protective seal"]',
 '/images/sofa-repair-service.jpg', 'Bestseller', TRUE),

('sofa-foam-cushion-refill', 'High-Density Foam & Cushion Padding', 'sofa_repair',
 'Say goodbye to sagging sunken sofa seats! Replace deflated foam with 32D/40D ultra high-resilience foam and orthopedic springs.',
 'Cushion core replacement, polyester fiber batting, spring webbing tightening, and lumbar support enhancement for maximum comfort.',
 1299.00, 'Starting at ₹1,299 / $55', 'Same Day / 24 hrs',
 '["40D High-Resilience virgin foam", "Pocket coil & zigzag spring tuning", "Anti-sag reinforced webbing", "3-Year foam sag warranty"]',
 '/images/sofa-before-after.jpg', 'Comfort Upgrade', TRUE),

('sofa-frame-spring-repair', 'Structural Wooden Frame & Spring Overhaul', 'sofa_repair',
 'Fix broken wood joints, creaking sofa noises, snapped zigzag tension springs, and wobbly sofa legs directly at your home or office.',
 'Heavy seasoned Salwood/Teakwood timber reinforcement, high-tensile steel spring brackets, and anti-slip leg levelers.',
 899.00, 'Starting at ₹899 / $39', 'Same Day (2-4 hrs)',
 '["Heavy hardwood frame bracing", "Tempered steel spring replacement", "Zero-creak soundproofing", "Heavy-duty brass/wood legs"]',
 '/images/sofa-repair-service.jpg', 'Essential', FALSE);

-- Sample Bookings
INSERT IGNORE INTO bookings (id, customer_name, phone, email, address, city, category, service_name, item_count, issue_description, preferred_date, urgency, status, estimated_cost)
VALUES
('BK-1001', 'Rajesh Sharma (Looks Salon)', '+91 98111 22334', 'rajesh@lookssalon.com', 'Shop 14, Main Market, Sector 18', 'Delhi NCR', 'salon_chair', 'Hydraulic Pump & Base Repair', 4, '4 Barber styling chairs sinking down when client sits. Urgent fix required before weekend rush.', 'Tomorrow 10:00 AM', 'same_day', 'in_progress', 3996.00),
('BK-1002', 'Priya Kapoor', '+91 98222 33445', 'priya.k@gmail.com', 'Flat 804, Palm Heights, Bandra West', 'Mumbai', 'sofa_repair', 'High-Density Foam & Cushion Padding', 1, '3-seater L-shape sectional sofa seat is sagging deeply in the middle.', 'Saturday 2:00 PM', 'normal', 'pending', 3897.00),
('BK-1003', 'Vikram Singh (Gentlemens Lounge)', '+91 98333 44556', 'vikram@glounge.in', 'Indiranagar 100ft Road', 'Bangalore', 'salon_chair', 'Salon Chair Leather Upholstery', 2, 'Vintage Belmont barber chairs need black diamond leather upholstery.', 'Next Monday', 'normal', 'completed', 4500.00);
