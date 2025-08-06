const TelegramBot = require('node-telegram-bot-api');

export async function startCommand(bot: any, chatId: number) {
  const welcomeMessage = `
🌟 Добро пожаловать в Uzbek Community!

Мы помогаем узбекам по всему миру находить друг друга, общаться и создавать сообщества.

Что вы можете делать:
• 📝 Создать свой профиль
• 🔍 Найти других узбеков
• 💬 Общаться с сообществом
• 🌍 Присоединиться к группам по интересам

Выберите действие:
  `;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '📝 Создать профиль', callback_data: 'create_profile' },
        { text: '✏️ Редактировать профиль', callback_data: 'edit_profile' }
      ],
      [
        { text: '🔍 Найти узбеков', callback_data: 'search_users' },
        { text: '❓ Помощь', callback_data: 'help' }
      ]
    ]
  };

  try {
    await bot.sendMessage(chatId, welcomeMessage, {
      reply_markup: keyboard,
      parse_mode: 'HTML'
    });
  } catch (error) {
    console.error('Error sending start message:', error);
    await bot.sendMessage(chatId, 'Произошла ошибка. Попробуйте позже.');
  }
} 