import dotenv from 'dotenv';
import bot from './index';

// Загружаем переменные окружения (только для локальной разработки)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.local' });
}

console.log('🤖 Запуск Telegram бота...');

// Проверяем наличие токена
if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN не найден в переменных окружения');
  console.log('📝 Добавьте TELEGRAM_BOT_TOKEN в Railway Variables');
  console.log('⚠️  Бот будет работать в режиме тестирования');
} else {
  console.log('✅ TELEGRAM_BOT_TOKEN найден');
}

if (!process.env.NEXT_PUBLIC_APP_URL) {
  console.error('❌ NEXT_PUBLIC_APP_URL не найден в переменных окружения');
  console.log('📝 Добавьте NEXT_PUBLIC_APP_URL в Railway Variables');
  console.log('⚠️  Ссылки на веб-приложение будут недоступны');
} else {
  console.log('✅ NEXT_PUBLIC_APP_URL найден:', process.env.NEXT_PUBLIC_APP_URL);
}

// Проверяем Supabase переменные
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('❌ Supabase переменные не найдены');
  console.log('📝 Добавьте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY в Railway Variables');
  console.log('⚠️  Функции с базой данных будут недоступны');
} else {
  console.log('✅ Supabase переменные найдены');
}

console.log('🚀 Бот запущен и готов к работе!');

// Обработчик завершения работы
process.on('SIGINT', () => {
  console.log('\n🛑 Остановка бота...');
  bot.stopPolling();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Остановка бота...');
  bot.stopPolling();
  process.exit(0);
}); 