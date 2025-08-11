import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseAvailable } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Проверяем доступность Supabase
    if (!isSupabaseAvailable()) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { title, description, city, contact, price, category, type, country } = body;

    // Валидация данных
    if (!title || !description || !city || !contact || !type || !country) {
      return NextResponse.json(
        { error: 'Barcha majburiy maydonlar to\'ldirilishi kerak' },
        { status: 400 }
      );
    }

    // Сохраняем объявление в базу данных
    const { data, error } = await supabase!
      .from('ads')
      .insert([
        {
          title,
          description,
          city,
          contact,
          price: price || null,
          category: category || null,
          type,
          country,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Ma\'lumotlarni saqlashda xatolik yuz berdi' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Server xatoligi' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Проверяем доступность Supabase
    if (!isSupabaseAvailable()) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const country = searchParams.get('country');
    const city = searchParams.get('city');

    let query = supabase!
      .from('ads')
      .select('*')
      .order('created_at', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }
    if (country) {
      query = query.eq('country', country);
    }
    if (city) {
      query = query.eq('city', city);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Ma\'lumotlarni olishda xatolik yuz berdi' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Server xatoligi' },
      { status: 500 }
    );
  }
} 