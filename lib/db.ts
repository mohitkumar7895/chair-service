import mysql from 'mysql2/promise';
import { ServiceItem, BookingRequest, InquiryMessage, CustomerReview, AdminStats, GalleryItem } from '@/models/types';
import { INITIAL_SERVICES, INITIAL_BOOKINGS, INITIAL_INQUIRIES, INITIAL_REVIEWS, INITIAL_GALLERY } from '@/lib/initialData';


// Fallback in-memory database store
let memoryServices = [...INITIAL_SERVICES];
let memoryBookings = [...INITIAL_BOOKINGS];
let memoryInquiries = [...INITIAL_INQUIRIES];
let memoryReviews = [...INITIAL_REVIEWS];
let memoryGallery = [...INITIAL_GALLERY];

let pool: mysql.Pool | null = null;
let mysqlTested = false;
let mysqlAvailable = false;

export async function getDbPool(): Promise<mysql.Pool | null> {
  if (mysqlTested) {
    return mysqlAvailable ? pool : null;
  }

  try {
    const host = process.env.DB_HOST || 'localhost';
    const port = parseInt(process.env.DB_PORT || '3306', 10);
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || '';
    const database = process.env.DB_NAME || 'salon_sofa_repair';

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 2000
    });

    // Test connection
    const connection = await pool.getConnection();
    connection.release();
    mysqlAvailable = true;
    console.log('Successfully connected to MySQL database');
  } catch (err) {
    console.warn('MySQL connection not available, seamlessly running on active memory storage:', (err as Error).message);
    mysqlAvailable = false;
    pool = null;
  } finally {
    mysqlTested = true;
  }

  return mysqlAvailable ? pool : null;
}

// -------------------------------------------------------------
// Database Operations: Services
// -------------------------------------------------------------
export async function getServices(): Promise<ServiceItem[]> {
  const p = await getDbPool();
  if (p) {
    try {
      const [rows] = await p.query('SELECT * FROM services ORDER BY created_at DESC');
      if (Array.isArray(rows) && rows.length > 0) {
        return (rows as any[]).map((r) => ({
          id: r.id,
          title: r.title,
          category: r.category,
          shortDescription: r.short_description,
          detailedDescription: r.detailed_description,
          startingPrice: Number(r.starting_price),
          priceFormatted: r.price_formatted,
          turnaroundTime: r.turnaround_time,
          features: typeof r.features === 'string' ? JSON.parse(r.features) : r.features || [],
          image: r.image,
          badge: r.badge,
          isPopular: Boolean(r.is_popular)
        }));
      }
    } catch (err) {
      console.error('Error fetching services from MySQL, using fallback:', err);
    }
  }
  return memoryServices;
}

// -------------------------------------------------------------
// Database Operations: Bookings
// -------------------------------------------------------------
export async function getBookings(): Promise<BookingRequest[]> {
  const p = await getDbPool();
  if (p) {
    try {
      const [rows] = await p.query('SELECT * FROM bookings ORDER BY created_at DESC');
      if (Array.isArray(rows)) {
        return (rows as any[]).map((r) => ({
          id: r.id,
          customerName: r.customer_name,
          phone: r.phone,
          email: r.email,
          address: r.address,
          city: r.city,
          category: r.category,
          serviceId: r.service_id,
          serviceName: r.service_name,
          itemCount: r.item_count,
          issueDescription: r.issue_description,
          preferredDate: r.preferred_date,
          urgency: r.urgency,
          status: r.status,
          estimatedCost: Number(r.estimated_cost),
          photoUrl: r.photo_url,
          notes: r.notes,
          createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString()
        }));
      }
    } catch (err) {
      console.error('Error fetching bookings from MySQL, using fallback:', err);
    }
  }
  return [...memoryBookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createBooking(data: Omit<BookingRequest, 'id' | 'createdAt'>): Promise<BookingRequest> {
  const newBooking: BookingRequest = {
    ...data,
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString()
  };

  const p = await getDbPool();
  if (p) {
    try {
      await p.query(
        `INSERT INTO bookings (id, customer_name, phone, email, address, city, category, service_id, service_name, item_count, issue_description, preferred_date, urgency, status, estimated_cost, photo_url, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newBooking.id,
          newBooking.customerName,
          newBooking.phone,
          newBooking.email || null,
          newBooking.address,
          newBooking.city,
          newBooking.category,
          newBooking.serviceId || null,
          newBooking.serviceName,
          newBooking.itemCount,
          newBooking.issueDescription,
          newBooking.preferredDate,
          newBooking.urgency,
          newBooking.status,
          newBooking.estimatedCost,
          newBooking.photoUrl || null,
          newBooking.notes || null
        ]
      );
    } catch (err) {
      console.error('Error inserting booking into MySQL:', err);
    }
  }

  memoryBookings.unshift(newBooking);
  return newBooking;
}

export async function updateBookingStatus(id: string, status: BookingRequest['status'], notes?: string): Promise<boolean> {
  const p = await getDbPool();
  if (p) {
    try {
      await p.query('UPDATE bookings SET status = ?, notes = COALESCE(?, notes) WHERE id = ?', [status, notes || null, id]);
    } catch (err) {
      console.error('Error updating booking in MySQL:', err);
    }
  }

  const index = memoryBookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    memoryBookings[index].status = status;
    if (notes) memoryBookings[index].notes = notes;
    return true;
  }
  return false;
}

export async function deleteBooking(id: string): Promise<boolean> {
  const p = await getDbPool();
  if (p) {
    try {
      await p.query('DELETE FROM bookings WHERE id = ?', [id]);
    } catch (err) {
      console.error('Error deleting booking in MySQL:', err);
    }
  }

  const initialLen = memoryBookings.length;
  memoryBookings = memoryBookings.filter((b) => b.id !== id);
  return memoryBookings.length < initialLen;
}

// -------------------------------------------------------------
// Database Operations: Inquiries
// -------------------------------------------------------------
export async function getInquiries(): Promise<InquiryMessage[]> {
  const p = await getDbPool();
  if (p) {
    try {
      const [rows] = await p.query('SELECT * FROM inquiries ORDER BY created_at DESC');
      if (Array.isArray(rows)) {
        return (rows as any[]).map((r) => ({
          id: r.id,
          name: r.name,
          phone: r.phone,
          email: r.email,
          category: r.category,
          message: r.message,
          status: r.status,
          createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString()
        }));
      }
    } catch (err) {
      console.error('Error fetching inquiries from MySQL:', err);
    }
  }
  return memoryInquiries;
}

export async function createInquiry(data: Omit<InquiryMessage, 'id' | 'createdAt' | 'status'>): Promise<InquiryMessage> {
  const newInquiry: InquiryMessage = {
    ...data,
    id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
    status: 'unread',
    createdAt: new Date().toISOString()
  };

  const p = await getDbPool();
  if (p) {
    try {
      await p.query(
        'INSERT INTO inquiries (id, name, phone, email, category, message, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [newInquiry.id, newInquiry.name, newInquiry.phone, newInquiry.email, newInquiry.category, newInquiry.message, newInquiry.status]
      );
    } catch (err) {
      console.error('Error inserting inquiry into MySQL:', err);
    }
  }

  memoryInquiries.unshift(newInquiry);
  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: InquiryMessage['status']): Promise<boolean> {
  const p = await getDbPool();
  if (p) {
    try {
      await p.query('UPDATE inquiries SET status = ? WHERE id = ?', [status, id]);
    } catch (err) {
      console.error('Error updating inquiry status in MySQL:', err);
    }
  }

  const item = memoryInquiries.find((i) => i.id === id);
  if (item) {
    item.status = status;
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// Database Operations: Reviews
// -------------------------------------------------------------
export async function getReviews(): Promise<CustomerReview[]> {
  return memoryReviews;
}

// -------------------------------------------------------------
// Database Operations: Admin Stats
// -------------------------------------------------------------
export async function getAdminStats(): Promise<AdminStats> {
  const bookings = await getBookings();
  const inquiries = await getInquiries();

  const totalBookings = bookings.length;
  const pendingRepairs = bookings.filter((b) => b.status === 'pending').length;
  const inProgressRepairs = bookings.filter((b) => b.status === 'in_progress' || b.status === 'assigned').length;
  const completedRepairs = bookings.filter((b) => b.status === 'completed').length;
  const cancelledRepairs = bookings.filter((b) => b.status === 'cancelled').length;
  const estimatedRevenue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + (b.estimatedCost || 0), 0);
  const officeChairBookings = bookings.filter((b) => b.category === 'office_chair').length;
  const reclinerBookings = bookings.filter((b) => b.category === 'recliner_chair').length;
  const salonChairBookings = bookings.filter((b) => b.category === 'salon_chair').length;
  const sofaBookings = bookings.filter((b) => b.category === 'sofa_repair').length;

  return {
    totalBookings,
    pendingRepairs,
    inProgressRepairs,
    completedRepairs,
    cancelledRepairs,
    estimatedRevenue,
    officeChairBookings,
    reclinerBookings,
    salonChairBookings,
    sofaBookings,
    totalInquiries: inquiries.length
  };
}

// -------------------------------------------------------------
// Database Operations: Gallery
// -------------------------------------------------------------
export async function getGallery(): Promise<GalleryItem[]> {
  const p = await getDbPool();
  if (p) {
    try {
      await p.query(`
        CREATE TABLE IF NOT EXISTS gallery (
          id VARCHAR(64) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          category VARCHAR(50) NOT NULL,
          image_url VARCHAR(500) NOT NULL,
          description TEXT,
          created_at VARCHAR(50)
        )
      `);
      const [rows] = await p.query('SELECT * FROM gallery ORDER BY created_at DESC');
      if (Array.isArray(rows) && rows.length > 0) {
        return (rows as any[]).map((r) => ({
          id: r.id,
          title: r.title,
          category: r.category,
          imageUrl: r.image_url,
          description: r.description || '',
          createdAt: r.created_at || ''
        }));
      }
    } catch (err) {
      console.error('Error fetching gallery from MySQL, using fallback:', err);
    }
  }
  return memoryGallery;
}

export async function addGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<GalleryItem> {
  const newItem: GalleryItem = {
    id: `gal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: item.title,
    category: item.category,
    imageUrl: item.imageUrl,
    description: item.description || '',
    createdAt: new Date().toISOString().split('T')[0]
  };

  const p = await getDbPool();
  if (p) {
    try {
      await p.query(
        'INSERT INTO gallery (id, title, category, image_url, description, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        [newItem.id, newItem.title, newItem.category, newItem.imageUrl, newItem.description, newItem.createdAt]
      );
    } catch (err) {
      console.error('Error adding gallery item to MySQL:', err);
    }
  }

  memoryGallery.unshift(newItem);
  return newItem;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const p = await getDbPool();
  if (p) {
    try {
      await p.query('DELETE FROM gallery WHERE id = ?', [id]);
    } catch (err) {
      console.error('Error deleting gallery item from MySQL:', err);
    }
  }
  memoryGallery = memoryGallery.filter((item) => item.id !== id);
  return true;
}
