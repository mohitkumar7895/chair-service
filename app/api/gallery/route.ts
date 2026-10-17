import { NextResponse } from 'next/server';
import { getGallery, addGalleryItem, deleteGalleryItem } from '@/lib/db';

export async function GET() {
  try {
    const gallery = await getGallery();
    return NextResponse.json({ success: true, gallery });
  } catch (error) {
    console.error('Failed to fetch gallery items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, imageUrl, description } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Title and image are required' },
        { status: 400 }
      );
    }

    const newItem = await addGalleryItem({
      title,
      category: category || 'office_chair',
      imageUrl,
      description: description || ''
    });

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    console.error('Failed to create gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create gallery item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Gallery item ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteGalleryItem(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Failed to delete gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
}
