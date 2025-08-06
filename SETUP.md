# Инструкции по настройке Uzbek Community

## Быстрый старт

### 1. Клонирование и установка
```bash
git clone <repository-url>
cd uzbek-community
npm install
```

### 2. Настройка Supabase

1. **Создайте проект в Supabase:**
   - Перейдите на [supabase.com](https://supabase.com)
   - Создайте новый проект
   - Выберите регион (рекомендуется ближайший к вашей аудитории)

2. **Выполните SQL схему:**
   - В панели Supabase перейдите в **SQL Editor**
   - Создайте новый запрос
   - Скопируйте и выполните содержимое файла `supabase/schema.sql`

3. **Получите ключи API:**
   - В панели Supabase перейдите в **Settings** → **API**
   - Скопируйте **Project URL** и **anon public** ключ

### 3. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Telegram Bot
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=7792225685:AAECTpuaEn9AhMEvkVVnfCKwk7xdMLZp9Tw
NEXT_PUBLIC_APP_URL=https://uzbek-community.com
```

### 4. Запуск приложения

```bash
npm run dev
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
uzbek-community/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Главная страница
│   │   ├── profile/           # Страница профиля
│   │   ├── search/            # Страница поиска
│   │   ├── api/               # API endpoints
│   │   └── layout.tsx         # Основной layout
│   ├── components/            # React компоненты
│   ├── hooks/                 # React хуки
│   ├── lib/                   # Утилиты
│   └── types/                 # TypeScript типы
├── supabase/
│   └── schema.sql            # SQL схема базы данных
├── README.md                 # Основная документация
├── SUPABASE_SETUP.md         # Детальная настройка Supabase
└── SETUP.md                  # Этот файл
```

## API Endpoints

### Профили пользователей
- `GET /api/profiles` - получить все профили с фильтрами
- `POST /api/profiles` - создать новый профиль
- `GET /api/profiles/[telegramId]` - получить профиль по Telegram ID
- `PUT /api/profiles/[telegramId]` - обновить профиль
- `DELETE /api/profiles/[telegramId]` - удалить профиль

### Параметры фильтрации
- `country` - фильтр по стране
- `city` - фильтр по городу
- `status` - фильтр по статусу
- `interests` - фильтр по интересам (через запятую)

## Тестирование

### Проверка работы приложения
```bash
# Проверка главной страницы
curl http://localhost:3000

# Проверка страницы поиска
curl http://localhost:3000/search

# Проверка API профилей
curl http://localhost:3000/api/profiles
```

### Проверка Supabase подключения
1. Откройте страницу профиля: `http://localhost:3000/profile`
2. Попробуйте создать профиль
3. Проверьте данные в панели Supabase: **Database** → **Tables** → **profiles**

## Деплой

### Railway (рекомендуется)
1. Подключите репозиторий к Railway
2. Добавьте переменные окружения в настройках
3. Деплой произойдет автоматически

### Vercel
```bash
npm install -g vercel
vercel
```

## Устранение неполадок

### Ошибка "Missing Supabase environment variables"
- Убедитесь, что файл `.env.local` создан и содержит правильные значения
- Проверьте, что переменные начинаются с `NEXT_PUBLIC_`

### Ошибка подключения к Supabase
- Проверьте правильность URL и ключа API
- Убедитесь, что SQL схема выполнена в Supabase

### Ошибка "Profile not found"
- Это нормально для новых пользователей
- Профиль будет создан при первом сохранении

## Следующие шаги

1. **Настройка Telegram Bot:**
   - Создайте бота через @BotFather
   - Настройте Web App в боте
   - Добавьте обработчики команд

2. **Загрузка изображений:**
   - Настройте Supabase Storage
   - Добавьте политики доступа
   - Интегрируйте загрузку в приложение

3. **Система сообщений:**
   - Реализуйте чат между пользователями
   - Добавьте уведомления

4. **Сообщества:**
   - Создайте систему групп
   - Добавьте управление участниками

## Поддержка

- Документация Supabase: [supabase.com/docs](https://supabase.com/docs)
- Telegram Web App: [core.telegram.org/bots/webapps](https://core.telegram.org/bots/webapps)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs) 