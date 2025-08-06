import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseAvailable } from '@/lib/supabase';

// GET /api/profiles - получить все профили
export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseAvailable()) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const city = searchParams.get('city');
    const status = searchParams.get('status');
    const interests = searchParams.get('interests');

    let query = supabase!
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    // Фильтрация по параметрам
    if (country) {
      query = query.eq('country', country);
    }
    if (city) {
      query = query.eq('city', city);
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (interests) {
      const interestsArray = interests.split(',');
      query = query.overlaps('interests', interestsArray);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profiles: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/profiles - создать новый профиль
export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseAvailable()) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      telegram_id,
      first_name,
      last_name,
      username,
      photo_url,
      country,
      city,
      status,
      interests,
      bio
    } = body;

    // Валидация обязательных полей
    if (!telegram_id || !first_name || !country || !city || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Проверка существования профиля
    const { data: existingProfile } = await supabase!
      .from('profiles')
      .select('id')
      .eq('telegram_id', telegram_id)
      .single();

    if (existingProfile) {
      return NextResponse.json(
        { error: 'Profile already exists' },
        { status: 409 }
      );
    }

    // Создание профиля
    const { data, error } = await supabase!
      .from('profiles')
      .insert({
        telegram_id,
        first_name,
        last_name,
        username,
        photo_url,
        country,
        city,
        status,
        interests: interests || [],
        bio
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 