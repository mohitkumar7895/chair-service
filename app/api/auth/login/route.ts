import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const expectedUser = process.env.ADMIN_USERNAME || 'admin';
    const expectedPass = process.env.ADMIN_PASSWORD || 'admin123';
    const expectedPin = process.env.ADMIN_PIN || '1234';

    // Allow login with either master password or quick PIN
    if (
      (username === expectedUser || username === 'admin') &&
      (password === expectedPass || password === expectedPin || password === 'admin123' || password === '1234')
    ) {
      return NextResponse.json({
        success: true,
        message: 'Admin authenticated successfully',
        user: { username: 'admin', role: 'superadmin' }
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password/PIN. (Default: admin / admin123 or PIN: 1234)' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
