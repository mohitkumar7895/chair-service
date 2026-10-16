import { NextResponse } from 'next/server';
import { getServices } from '@/lib/db';

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json({ success: true, services });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
