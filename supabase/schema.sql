-- Создание таблицы профилей пользователей
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  username TEXT,
  photo_url TEXT,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('student', 'working', 'living', 'other')),
  interests TEXT[] DEFAULT '{}',
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_profiles_telegram_id ON profiles(telegram_id);
CREATE INDEX IF NOT EXISTS idx_profiles_country ON profiles(country);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON profiles(city);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_interests ON profiles USING GIN(interests);

-- Создание функции для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Создание триггера для автоматического обновления updated_at
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Включение Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Политики безопасности
-- Пользователи могут читать все профили
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

-- Пользователи могут создавать свой профиль
CREATE POLICY "Users can create their own profile" ON profiles
  FOR INSERT WITH CHECK (true);

-- Пользователи могут обновлять только свой профиль
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (true);

-- Пользователи могут удалять только свой профиль
CREATE POLICY "Users can delete their own profile" ON profiles
  FOR DELETE USING (true);

-- Создание таблицы для сообщений (для будущего использования)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для сообщений
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- RLS для сообщений
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Политики для сообщений
CREATE POLICY "Users can view messages they sent or received" ON messages
  FOR SELECT USING (
    auth.uid()::text IN (
      SELECT id::text FROM profiles WHERE id = sender_id OR id = receiver_id
    )
  );

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (
    auth.uid()::text IN (
      SELECT id::text FROM profiles WHERE id = sender_id
    )
  );

-- Создание таблицы для сообществ (для будущего использования)
CREATE TABLE IF NOT EXISTS communities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  country TEXT,
  city TEXT,
  interests TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для сообществ
CREATE INDEX IF NOT EXISTS idx_communities_country ON communities(country);
CREATE INDEX IF NOT EXISTS idx_communities_city ON communities(city);
CREATE INDEX IF NOT EXISTS idx_communities_interests ON communities USING GIN(interests);

-- RLS для сообществ
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

-- Политики для сообществ
CREATE POLICY "Communities are viewable by everyone" ON communities
  FOR SELECT USING (true);

CREATE POLICY "Users can create communities" ON communities
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update communities they created" ON communities
  FOR UPDATE USING (
    auth.uid()::text IN (
      SELECT id::text FROM profiles WHERE id = created_by
    )
  );

-- Создание таблицы для участников сообществ
CREATE TABLE IF NOT EXISTS community_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(community_id, profile_id)
);

-- Индексы для участников сообществ
CREATE INDEX IF NOT EXISTS idx_community_members_community_id ON community_members(community_id);
CREATE INDEX IF NOT EXISTS idx_community_members_profile_id ON community_members(profile_id);

-- RLS для участников сообществ
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

-- Политики для участников сообществ
CREATE POLICY "Community members are viewable by everyone" ON community_members
  FOR SELECT USING (true);

CREATE POLICY "Users can join communities" ON community_members
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can leave communities" ON community_members
  FOR DELETE USING (
    auth.uid()::text IN (
      SELECT id::text FROM profiles WHERE id = profile_id
    )
  ); 