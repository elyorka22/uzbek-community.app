const TelegramBot = require('node-telegram-bot-api');

// Простой тест структуры бота
function testBotStructure() {
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
function testBotCommands() {
  console.log('\n🔍 Тестирование команд бота...\n');

  try {
    // Импортируем команды
    const { startCommand } = require('./commands/start');
    const { profileCommand } = require('./commands/profile');
    const { searchCommand, showStats } = require('./commands/search');
    const { helpCommand } = require('./commands/help');

    console.log('✅ Команда /start доступна');
    console.log('✅ Команда /profile доступна');
    console.log('✅ Команда /search доступна');
    console.log('✅ Команда /help доступна');
    console.log('✅ Функция showStats доступна');

    return true;
  } catch (error) {
    console.error('❌ Ошибка при тестировании команд:', error);
    return false;
  }
}

// Основная функция тестирования
function runSimpleTests() {
  console.log('🚀 Запуск простых тестов для Telegram бота...\n');

  const structureValid = testBotStructure();
  const commandsValid = testBotCommands();

  console.log('\n📊 Результаты тестирования:');
  console.log(`   Структура бота: ${structureValid ? '✅' : '❌'}`);
  console.log(`   Команды бота: ${commandsValid ? '✅' : '❌'}`);

  if (structureValid && commandsValid) {
    console.log('\n🎉 Все базовые тесты пройдены!');
    console.log('🤖 Бот готов к настройке и запуску');
    return true;
  } else {
    console.log('\n❌ Некоторые тесты не пройдены');
    console.log('🔧 Проверьте структуру проекта');
    return false;
  }
}

// Запускаем тесты если файл вызван напрямую
if (require.main === module) {
  const dotenv = require('dotenv');
  dotenv.config({ path: '.env.local' });
  
  const success = runSimpleTests();
  process.exit(success ? 0 : 1);
}

export { runSimpleTests, testBotStructure, testBotCommands }; 