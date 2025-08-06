const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const TelegramBot = require('node-telegram-bot-api');

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
    console.log(`📋 Информация о боте:`);
    console.log(`   Имя: ${botInfo.first_name}`);
    console.log(`   Username: @${botInfo.username}`);
    console.log(`   ID: ${botInfo.id}`);
    console.log(`   Может присоединяться к группам: ${botInfo.can_join_groups ? 'Да' : 'Нет'}`);
    console.log(`   Может читать сообщения: ${botInfo.can_read_all_group_messages ? 'Да' : 'Нет'}`);
    console.log(`   Поддерживает inline режим: ${botInfo.supports_inline_queries ? 'Да' : 'Нет'}`);
    
    return true;
  } catch (error: any) {
    console.error('❌ Ошибка подключения к Telegram Bot API:');
    console.error(`   Код ошибки: ${error.code || 'Неизвестно'}`);
    console.error(`   Сообщение: ${error.message || 'Неизвестно'}`);
    
    if (error.code === 401) {
      console.error('💡 Возможно, токен бота неверный. Проверьте токен в .env.local');
    } else if (error.code === 'ENOTFOUND') {
      console.error('💡 Проблема с интернет-соединением');
    }
    
    return false;
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
  } catch (error: any) {
    console.error('❌ Неверный формат URL:', error.message);
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