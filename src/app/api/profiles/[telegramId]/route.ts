import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/profiles/[telegramId] - получить профиль по Telegram ID
export async function GET(
  request: NextRequest,
  { params }: { params: { telegramId: string } }
) {
  try {
    const telegramId = parseInt(params.telegramId);

    if (isNaN(telegramId)) {
      return NextResponse.json(
        { error: 'Invalid Telegram ID' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Profile not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/profiles/[telegramId] - обновить профиль
export async function PUT(
  request: NextRequest,
  { params }: { params: { telegramId: string } }
) {
  try {
    const telegramId = parseInt(params.telegramId);
    const body = await request.json();

    if (isNaN(telegramId)) {
      return NextResponse.json(
        { error: 'Invalid Telegram ID' },
        { status: 400 }
      );
    }

    const {
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
    if (!first_name || !country || !city || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Обновление профиля
    const { data, error } = await supabase
      .from('profiles')
      .update({
        first_name,
        last_name,
        username,
        photo_url,
        country,
        city,
        status,
        interests: interests || [],
        bio,
        updated_at: new Date().toISOString()
      })
      .eq('telegram_id', telegramId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Profile not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/profiles/[telegramId] - удалить профиль
export async function DELETE(
  request: NextRequest,
  { params }: { params: { telegramId: string } }
) {
  try {
    const telegramId = parseInt(params.telegramId);

    if (isNaN(telegramId)) {
      return NextResponse.json(
        { error: 'Invalid Telegram ID' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('telegram_id', telegramId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 