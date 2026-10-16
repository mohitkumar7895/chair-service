import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, createInquiry } from '@/lib/db';

export async function GET() {
  try {
    const inquiries = await getInquiries();
    return NextResponse.json({ success: true, inquiries });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Please enter your name, phone number, and inquiry message.' },
        { status: 400 }
      );
    }

    const inquiry = await createInquiry({
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      category: body.category || 'general',
      message: body.message
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
