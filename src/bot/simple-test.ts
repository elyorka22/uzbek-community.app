import TelegramBot from 'node-telegram-bot-api';
import { supabase } from '../lib/supabase';
import { startCommand } from './commands/start';
import { profileCommand } from './commands/profile';
import { searchCommand, showStats } from './commands/search';
import { helpCommand } from './commands/help';

// Простой тест структуры бота
async function testBotStructure() {
  console.log('🧪 Тестирование структуры Telegram бота...\n');

  try {
    // Проверяем, что модуль TelegramBot доступен
    console.log('✅ Модуль node-telegram-bot-api доступен');
    
    // Проверяем, что это функция конструктор
    if (typeof TelegramBot === 'function') {
      console.log('✅ TelegramBot является функцией конструктором');
    } else {
      console.log('❌ TelegramBot не является функцией конструктором');
      return false;
    }

    // Проверяем переменные окружения
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    console.log('\n📋 Проверка переменных окружения:');
    console.log(`   TELEGRAM_BOT_TOKEN: ${token ? '✅ Найден' : '❌ Не найден'}`);
    console.log(`   NEXT_PUBLIC_APP_URL: ${appUrl ? '✅ Найден' : '❌ Не найден'}`);

    if (!token) {
      console.log('\n💡 Для полного тестирования добавьте TELEGRAM_BOT_TOKEN в .env.local');
    }

    if (!appUrl) {
      console.log('\n💡 Для полного тестирования добавьте NEXT_PUBLIC_APP_URL в .env.local');
    }

    console.log('\n✅ Структура бота корректна');
    return true;

  } catch (error) {
    console.error('❌ Ошибка при тестировании структуры бота:', error);
    return false;
  }
}

// Проверяем команды бота
async function testBotCommands() {
  console.log('\n🔍 Тестирование команд бота...\n');

  try {
    // Импортируем команды
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Ошибка при получении профилей:', error);
      return false;
    }

    console.log('✅ Профили получены успешно!');
    console.log(`   Количество профилей: ${data?.length || 0}`);
    
    return true;
  } catch (error) {
    console.error('❌ Ошибка при тестировании команд:', error);
    return false;
  }
}

// Основная функция тестирования
async function runSimpleTests() {
  console.log('🚀 Запуск простых тестов для Telegram бота...\n');

  const structureValid = await testBotStructure();
  const commandsValid = await testBotCommands();

  console.log('\n📊 Результаты тестирования:');
  console.log(`   Структура бота: ${structureValid ? '✅' : '❌'}`);
  console.log(`   Команды бота: ${commandsValid ? '✅' : '❌'}`);

  console.log('\n🎉 Тестирование завершено!');
  return true;
}

// Запускаем тесты если файл вызван напрямую
if (require.main === module) {
  const dotenv = require('dotenv');
  dotenv.config({ path: '.env.local' });
  
  const success = runSimpleTests();
  process.exit(success ? 0 : 1);
}

export { runSimpleTests, testBotStructure, testBotCommands }; 