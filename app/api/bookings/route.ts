import { NextRequest, NextResponse } from 'next/server';
import { getBookings, createBooking } from '@/lib/db';

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json({ success: true, bookings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.customerName || !body.phone || !body.address || !body.serviceName) {
      return NextResponse.json(
        { success: false, error: 'Please provide full name, phone number, address, and service required.' },
        { status: 400 }
      );
    }

    const booking = await createBooking({
      customerName: body.customerName,
      phone: body.phone,
      email: body.email || '',
      address: body.address,
      city: body.city || 'Delhi NCR',
      category: body.category || 'salon_chair',
      serviceId: body.serviceId,
      serviceName: body.serviceName,
      itemCount: Number(body.itemCount) || 1,
      issueDescription: body.issueDescription || '',
      preferredDate: body.preferredDate || 'Earliest Available',
      urgency: body.urgency || 'normal',
      status: 'pending',
      estimatedCost: Number(body.estimatedCost) || 999,
      photoUrl: body.photoUrl,
      notes: body.notes || 'Submitted via online portal'
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
