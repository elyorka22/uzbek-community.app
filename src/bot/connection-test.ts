import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { supabase } from '../lib/supabase';

dotenv.config({ path: '.env.local' });

async function testBotConnection() {
  console.log('🤖 Тестирование подключения к Telegram Bot API...\n');

  const token = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!token) {
    console.error('❌ TELEGRAM_BOT_TOKEN не найден в переменных окружения');
    return false;
  }

  try {
    console.log('🔍 Создание экземпляра бота...');
    const bot = new TelegramBot(token, { polling: false });
    
    console.log('🔍 Получение информации о боте...');
    const botInfo = await bot.getMe();
    
    console.log('✅ Подключение к Telegram Bot API успешно!');
    console.log(`   Имя бота: ${botInfo.first_name}`);
    console.log(`   Username: @${botInfo.username}`);
    console.log(`   ID бота: ${botInfo.id}`);
    console.log(`   Язык: ${botInfo.language_code || 'Не указан'}`);
    
    return true;
  } catch (error: unknown) {
    console.error('Error connecting to Telegram Bot:', error);
  }
}

async function testWebAppUrl() {
  console.log('\n🌐 Тестирование Web App URL...\n');
  
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  
  if (!appUrl) {
    console.error('❌ NEXT_PUBLIC_APP_URL не найден в переменных окружения');
    return false;
  }

  try {
    console.log(`🔍 Проверка URL: ${appUrl}`);
    
    // Простая проверка формата URL
    const url = new URL(appUrl);
    console.log(`✅ URL формат корректный`);
    console.log(`   Протокол: ${url.protocol}`);
    console.log(`   Хост: ${url.hostname}`);
    console.log(`   Порт: ${url.port || 'по умолчанию'}`);
    
    return true;
  } catch (error: unknown) {
    console.error('❌ Неверный формат URL:', error);
    return false;
  }
}

async function runConnectionTests() {
  console.log('🚀 Запуск тестов подключения...\n');

  const botConnected = await testBotConnection();
  const urlValid = await testWebAppUrl();

  console.log('\n📊 Результаты тестирования:');
  console.log(`   Подключение к Telegram Bot API: ${botConnected ? '✅' : '❌'}`);
  console.log(`   Web App URL: ${urlValid ? '✅' : '❌'}`);

  if (botConnected && urlValid) {
    console.log('\n🎉 Все тесты подключения пройдены!');
    console.log('🤖 Бот готов к запуску');
    return true;
  } else {
    console.log('\n❌ Некоторые тесты не пройдены');
    console.log('🔧 Проверьте настройки и попробуйте снова');
    return false;
  }
}

// Запускаем тесты если файл вызван напрямую
if (require.main === module) {
  runConnectionTests().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

export { runConnectionTests, testBotConnection, testWebAppUrl }; 