import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { addGalleryItem } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    // Support multiple files under 'files' or 'file'
    const rawFiles = [
      ...formData.getAll('files'),
      ...formData.getAll('file')
    ] as File[];

    const validFiles = rawFiles.filter(
      (f) => f && typeof f !== 'string' && f.type?.startsWith('image/')
    );

    if (validFiles.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid image files provided' },
        { status: 400 }
      );
    }

    // Ensure public/uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const uploadedItems = [];

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${Date.now()}-${i}-${safeName}`;
      const filePath = path.join(uploadsDir, filename);

      await fs.writeFile(filePath, buffer);

      const imageUrl = `/uploads/${filename}`;
      // Directly add to gallery so it is live instantly
      const cleanTitle = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .trim();

      const galleryItem = await addGalleryItem({
        title: cleanTitle || 'Chair Repair Photo',
        category: 'office_chair',
        imageUrl: imageUrl,
        description: ''
      });

      uploadedItems.push(galleryItem);
    }

    return NextResponse.json({
      success: true,
      count: uploadedItems.length,
      items: uploadedItems
    });
  } catch (error) {
    console.error('Multi-file upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload image files' },
      { status: 500 }
    );
  }
}
