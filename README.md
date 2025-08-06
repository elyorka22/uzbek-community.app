# Uzbek Community - Telegram Web App

Telegram Web App для объединения узбеков, живущих, учащихся или работающих за границей.

## 🎯 Цель проекта

Создать платформу для поиска и общения узбеков по всему миру. Пользователи смогут:
- Создавать профили с информацией о себе
- Искать других узбеков по локации и интересам
- Создавать сообщества и группы
- Общаться и делиться опытом

## 🚀 Технологии

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Telegram Integration**: Telegram Web App SDK
- **Icons**: Lucide React
- **Deployment**: Railway

## 📱 Функциональность

### ✅ Реализовано
- [x] Главная страница с описанием проекта
- [x] Страница профиля пользователя
- [x] Загрузка и редактирование фото профиля
- [x] Форма с основными полями (имя, фамилия, локация, статус)
- [x] Система выбора интересов
- [x] Интеграция с Telegram Web App SDK
- [x] Интеграция с Supabase
- [x] API endpoints для работы с профилями
- [x] Страница поиска пользователей с фильтрами
- [x] Адаптивный дизайн
- [x] Telegram Bot с основными командами

### 🔄 В разработке
- [ ] Система сообщений
- [ ] Создание сообществ
- [ ] Уведомления
- [ ] Загрузка изображений в Supabase Storage

## 🛠️ Установка и запуск

### Предварительные требования
- Node.js 18+ 
- npm или yarn
- Аккаунт Supabase

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd uzbek-community
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка переменных окружения
Скопируйте `env.example` в `.env.local` и заполните значения:
```bash
cp env.example .env.local
```

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Telegram Bot
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Настройка Supabase
1. Создайте проект в [Supabase](https://supabase.com)
2. Выполните SQL схему из файла `supabase/schema.sql`
3. Получите URL и ключи API из настроек проекта

### 5. Запуск в режиме разработки
```bash
# Запуск веб-приложения
npm run dev

# Запуск Telegram-бота (в отдельном терминале)
npm run bot:dev
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

### 6. Сборка для продакшена
```bash
npm run build
npm start
```

## 🚀 Деплой

### Railway (рекомендуется)
Подробная инструкция по деплою: [DEPLOYMENT.md](./DEPLOYMENT.md)

1. Подключите репозиторий к Railway
2. Настройте переменные окружения
3. Деплой произойдет автоматически

### Vercel
```bash
npm install -g vercel
vercel
```

## 📁 Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Главная страница
│   ├── profile/           # Страница профиля
│   │   └── page.tsx
│   ├── search/            # Страница поиска
│   │   └── page.tsx
│   ├── api/               # API endpoints
│   │   └── profiles/      # API для профилей
│   ├── layout.tsx         # Основной layout
│   └── globals.css        # Глобальные стили
├── components/            # React компоненты
│   ├── ImageUpload.tsx    # Компонент загрузки изображений
│   └── InterestsSelector.tsx # Селектор интересов
├── hooks/                 # React хуки
│   └── useProfiles.ts     # Хук для работы с профилями
├── lib/                   # Утилиты
│   ├── telegram.ts        # Интеграция с Telegram
│   └── supabase.ts        # Конфигурация Supabase
├── types/                 # TypeScript типы
│   └── user.ts           # Типы пользователя
└── bot/                   # Telegram Bot
    ├── index.ts          # Основной файл бота
    ├── commands/         # Команды бота
    └── README.md         # Документация бота
```

## 🔧 API Endpoints

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

## 📱 Telegram Web App

Приложение интегрировано с Telegram Web App SDK и поддерживает:
- Автоматическое получение данных пользователя из Telegram
- Адаптацию под тему Telegram (светлая/темная)
- Нативные уведомления Telegram
- Оптимизацию для мобильных устройств

## 🤖 Telegram Bot

Бот предоставляет интерфейс для управления профилями и поиска пользователей:

### Команды
- `/start` - Главное меню
- `/profile` - Управление профилем
- `/search` - Поиск узбеков
- `/help` - Справка

### Функции
- Создание и редактирование профилей через Web App
- Поиск пользователей с фильтрами
- Просмотр статистики сообщества
- Интеграция с веб-приложением

Подробная документация: [src/bot/README.md](./src/bot/README.md)

## 🗄️ База данных (Supabase)

### Основные таблицы:
- **profiles** - профили пользователей
- **messages** - сообщения между пользователями
- **communities** - сообщества
- **community_members** - участники сообществ

### Безопасность:
- Row Level Security (RLS) включен
- Политики безопасности настроены
- Автоматическое обновление timestamps

## 🎨 Дизайн

- Современный и чистый дизайн
- Адаптивная верстка для всех устройств
- Поддержка светлой и темной темы
- Оптимизация для мобильных устройств

## 📈 Планы развития

1. **Этап 1**: Базовая функциональность профилей ✅
2. **Этап 2**: Интеграция с Supabase и API ✅
3. **Этап 3**: Система поиска и фильтрации ✅
4. **Этап 4**: Telegram Bot ✅
5. **Этап 5**: Система сообщений
6. **Этап 6**: Сообщества и группы
7. **Этап 7**: Уведомления и push-сообщения

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License

## 📞 Контакты

- Проект: Uzbek Community
- Домен: uzbek-community.com
- Telegram Bot: @uzbek_community_bot

## 📚 Документация

- [Настройка Supabase](SUPABASE_SETUP.md)
- [Инструкция по деплою](DEPLOYMENT.md)
- [Telegram Web App Documentation](https://core.telegram.org/bots/webapps)
- [Supabase Documentation](https://supabase.com/docs)

---

**Uzbek Community Team** © 2024
