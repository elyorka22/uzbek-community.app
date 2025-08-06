# Деплой Uzbek Community на Railway

## 🚀 Быстрый деплой

### 1. Подготовка репозитория

Убедитесь, что в репозитории есть все необходимые файлы:
- ✅ `package.json` с правильными скриптами
- ✅ `Procfile` для запуска веб-приложения и бота
- ✅ `railway.json` с настройками деплоя
- ✅ `railway-web.json` и `railway-bot.json` для отдельных сервисов
- ✅ `env.example` с примером переменных окружения

### 2. Создание проекта на Railway

1. Перейдите на [railway.app](https://railway.app)
2. Войдите в аккаунт (через GitHub)
3. Нажмите "New Project"
4. Выберите "Deploy from GitHub repo"
5. Выберите ваш репозиторий `uzbek-community`
6. Нажмите "Deploy Now"

### 3. Настройка двух сервисов

После создания проекта у вас будет один сервис. Нужно создать второй:

#### Web Service (уже создан)
1. Переименуйте существующий сервис в "Web"
2. В Settings → Start Command установите: `npm run start`
3. Или переименуйте `railway.json` в `railway-web.json` и переименуйте обратно

#### Bot Service (нужно создать)
1. Нажмите "New Service"
2. Выберите "GitHub Repo"
3. Выберите тот же репозиторий `uzbek-community`
4. Назовите сервис "Bot"
5. В Settings → Start Command установите: `npm run bot`

### 4. Настройка переменных окружения

После создания проекта:

1. Перейдите в раздел "Variables"
2. Добавьте следующие переменные:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Telegram Bot
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
NEXT_PUBLIC_APP_URL=https://your-railway-app-url.up.railway.app
```

**Где взять значения:**

#### Supabase
1. Перейдите в [supabase.com](https://supabase.com)
2. Откройте ваш проект
3. Settings → API
4. Скопируйте:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### Telegram Bot
1. Найдите @BotFather в Telegram
2. Отправьте `/mybots`
3. Выберите вашего бота
4. Bot Settings → API Token
5. Скопируйте токен → `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN`

#### App URL
1. После первого деплоя Railway выдаст URL
2. Скопируйте его → `NEXT_PUBLIC_APP_URL`

### 5. Настройка домена (опционально)

1. В Railway перейдите в "Settings"
2. Раздел "Domains"
3. Добавьте ваш домен (например, `uzbek-community.com`)
4. Настройте DNS записи согласно инструкциям Railway

### 6. Проверка деплоя

После настройки переменных:

1. Railway автоматически перезапустит проект
2. Дождитесь завершения билда (зеленый статус)
3. Проверьте работу по URL:
   - Веб-приложение: `https://your-app.up.railway.app`
   - API: `https://your-app.up.railway.app/api/profiles`

### 7. Проверка Telegram-бота

1. Найдите вашего бота в Telegram
2. Отправьте команду `/start`
3. Бот должен ответить и показать главное меню

## 🔧 Устранение проблем

### Ошибка билда
- Проверьте логи в Railway
- Убедитесь, что все зависимости в `package.json`
- Проверьте синтаксис TypeScript

### Бот не отвечает
- Проверьте переменную `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN`
- Убедитесь, что бот не заблокирован
- Проверьте логи в Railway
- Убедитесь, что Bot Service запущен с командой `npm run bot`

### Ошибки базы данных
- Проверьте переменные Supabase
- Убедитесь, что схема базы данных создана
- Проверьте RLS политики

### Проблемы с переменными окружения
- Убедитесь, что все переменные добавлены
- Проверьте правильность значений
- Перезапустите проект после изменения переменных

## 📊 Мониторинг

### Логи
- В Railway перейдите в "Deployments"
- Выберите последний деплой
- Просмотрите логи для диагностики

### Метрики
- Railway показывает CPU, память, сеть
- Настройте алерты при необходимости

## 🔄 Обновления

### Автоматический деплой
- Railway автоматически деплоит при push в main ветку
- Каждый коммит создает новый деплой

### Ручной деплой
1. В Railway нажмите "Deploy"
2. Выберите ветку и коммит
3. Дождитесь завершения

## 💰 Стоимость

- Railway предлагает бесплатный план
- Лимиты: 500 часов/месяц, 512MB RAM
- Для продакшена рекомендуется платный план

## 🔒 Безопасность

- Никогда не коммитьте `.env.local`
- Используйте только Railway Variables
- Регулярно обновляйте токены
- Настройте двухфакторную аутентификацию

## 📞 Поддержка

При проблемах:
1. Проверьте логи Railway
2. Убедитесь в правильности переменных
3. Проверьте документацию Railway
4. Обратитесь в поддержку Railway

---

**Успешного деплоя! 🚀** 