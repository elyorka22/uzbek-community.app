const TelegramBot = require('node-telegram-bot-api');

export async function helpCommand(bot: any, chatId: number) {
  const helpMessage = `
❓ Справка по использованию Uzbek Community Bot

📋 Доступные команды:

/start - Главное меню
/profile - Управление профилем
/search - Поиск узбеков
/help - Эта справка

🔧 Как использовать:

1️⃣ Создание профиля:
   • Нажмите "📝 Создать профиль"
   • Заполните информацию о себе
   • Укажите локацию и интересы

2️⃣ Поиск узбеков:
   • Нажмите "🔍 Найти узбеков"
   • Используйте фильтры для поиска
   • Общайтесь с найденными пользователями

3️⃣ Управление профилем:
   • Редактируйте информацию
   • Обновляйте статус и интересы
   • Добавляйте фото

💡 Советы:
• Будьте вежливы при общении
• Указывайте актуальную информацию
• Используйте поиск по интересам
• Присоединяйтесь к сообществам

📞 Поддержка:
Если у вас есть вопросы, обращайтесь к администраторам.
      `;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '📝 Создать профиль', callback_data: 'create_profile' },
        { text: '🔍 Найти узбеков', callback_data: 'search_users' }
      ],
      [
        { text: '📊 Статистика', callback_data: 'show_stats' },
        { text: '🔙 Главное меню', callback_data: 'main_menu' }
      ]
    ]
  };

  try {
    await bot.sendMessage(chatId, helpMessage, {
      reply_markup: keyboard,
      parse_mode: 'HTML'
    });
  } catch (error) {
    console.error('Error sending help message:', error);
    await bot.sendMessage(chatId, 'Произошла ошибка при отправке справки.');
  }
} 