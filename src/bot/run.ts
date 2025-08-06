import dotenv from 'dotenv';
import bot from './index';

// Загружаем переменные окружения
dotenv.config({ path: '.env.local' });

// Проверяем наличие токена
if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN не найден в переменных окружения');
  console.log('📝 Добавьте TELEGRAM_BOT_TOKEN в файл .env.local');
  process.exit(1);
}

if (!process.env.NEXT_PUBLIC_APP_URL) {
  console.error('❌ NEXT_PUBLIC_APP_URL не найден в переменных окружения');
  console.log('📝 Добавьте NEXT_PUBLIC_APP_URL в файл .env.local');
  process.exit(1);
}

console.log('🤖 Запуск Telegram бота...');
console.log('📱 URL приложения:', process.env.NEXT_PUBLIC_APP_URL);

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