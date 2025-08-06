const dotenv = require('dotenv');
// Загружаем переменные окружения перед импортом supabase
dotenv.config({ path: '.env.local' });

const TelegramBot = require('node-telegram-bot-api');
import { supabase } from '../lib/supabase';

// Тестовая функция для проверки подключения к Supabase
async function testSupabaseConnection() {
  try {
    console.log('🔍 Тестирование подключения к Supabase...');
    
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Ошибка подключения к Supabase:', error.message);
      return false;
    }

    console.log('✅ Подключение к Supabase успешно');
    return true;
  } catch (error) {
    console.error('❌ Ошибка при тестировании Supabase:', error);
    return false;
  }
}

// Тестовая функция для проверки токена бота
function testBotToken(token: string) {
  try {
    console.log('🔍 Тестирование токена бота...');
    
    if (!token) {
      console.error('❌ Токен бота не найден');
      return false;
    }

    if (token.length < 10) {
      console.error('❌ Токен бота слишком короткий');
      return false;
    }

    console.log('✅ Токен бота валиден');
    return true;
  } catch (error) {
    console.error('❌ Ошибка при тестировании токена:', error);
    return false;
  }
}

// Основная функция тестирования
async function runTests() {
  console.log('🧪 Запуск тестов для Telegram бота...\n');

  // Проверяем переменные окружения
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  console.log('📋 Проверка переменных окружения:');
  console.log(`   TELEGRAM_BOT_TOKEN: ${token ? '✅ Найден' : '❌ Не найден'}`);
  console.log(`   NEXT_PUBLIC_APP_URL: ${appUrl ? '✅ Найден' : '❌ Не найден'}\n`);

  // Тестируем токен
  const tokenValid = testBotToken(token || '');
  console.log('');

  // Тестируем Supabase
  const supabaseValid = await testSupabaseConnection();
  console.log('');

  // Итоговый результат
  if (tokenValid && supabaseValid) {
    console.log('🎉 Все тесты пройдены успешно!');
    console.log('🤖 Бот готов к запуску');
    return true;
  } else {
    console.log('❌ Некоторые тесты не пройдены');
    console.log('🔧 Проверьте настройки и попробуйте снова');
    return false;
  }
}

// Запускаем тесты если файл вызван напрямую
if (require.main === module) {
  runTests().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

export { runTests, testSupabaseConnection, testBotToken }; 