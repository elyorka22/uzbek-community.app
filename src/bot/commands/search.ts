import TelegramBot from 'node-telegram-bot-api';
import { supabase } from '../../lib/supabase';

export async function searchCommand(bot: TelegramBot, chatId: number) {
  try {
    // Проверяем, есть ли у пользователя профиль
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('telegram_id', chatId)
      .single();

    if (!userProfile) {
      await bot.sendMessage(chatId, 
        '📝 Сначала создайте свой профиль, чтобы искать других узбеков!', {
        reply_markup: {
          inline_keyboard: [
            [{ text: '📝 Создать профиль', callback_data: 'create_profile' }],
            [{ text: '🔙 Назад в меню', callback_data: 'main_menu' }]
          ]
        }
      });
      return;
    }

    const message = `
🔍 Поиск узбеков

Найдите других узбеков по всему миру!

Вы можете искать по:
• 🌍 Стране
• 🏙️ Городу  
• 🎓 Статусу (студент, работаю, живу)
• 🎯 Интересам

Используйте наше приложение для удобного поиска с фильтрами:
      `;

    const keyboard = {
      inline_keyboard: [
        [{ text: '🔍 Открыть поиск', callback_data: 'search_users' }],
        [{ text: '📊 Статистика', callback_data: 'show_stats' }],
        [{ text: '🔙 Назад в меню', callback_data: 'main_menu' }]
      ]
    };

    await bot.sendMessage(chatId, message, {
      reply_markup: keyboard,
      parse_mode: 'HTML'
    });

  } catch (error) {
    console.error('Error in search command:', error);
    await bot.sendMessage(chatId, 'Произошла ошибка при поиске.');
  }
}

// Функция для показа статистики
export async function showStats(bot: TelegramBot, chatId: number) {
  try {
    // Получаем статистику из базы данных
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('country, status');

    if (error) {
      console.error('Database error:', error);
      await bot.sendMessage(chatId, 'Произошла ошибка при получении статистики.');
      return;
    }

    if (!profiles || profiles.length === 0) {
      await bot.sendMessage(chatId, 'Пока нет зарегистрированных пользователей.');
      return;
    }

    // Подсчитываем статистику
    const totalUsers = profiles.length;
    const countries = new Set(profiles.map(p => p.country));
    const statuses = profiles.reduce((acc, profile) => {
      acc[profile.status] = (acc[profile.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const message = `
📊 Статистика Uzbek Community:

👥 Всего пользователей: ${totalUsers}
🌍 Стран: ${countries.size}
🎓 Студентов: ${statuses.student || 0}
💼 Работающих: ${statuses.working || 0}
🏠 Живущих: ${statuses.living || 0}
📋 Других: ${statuses.other || 0}

Топ стран:
${Array.from(countries).slice(0, 5).map(country => `• ${country}`).join('\n')}
      `;

    const keyboard = {
      inline_keyboard: [
        [{ text: '🔍 Начать поиск', callback_data: 'search_users' }],
        [{ text: '🔙 Назад', callback_data: 'search' }]
      ]
    };

    await bot.sendMessage(chatId, message, {
      reply_markup: keyboard,
      parse_mode: 'HTML'
    });

  } catch (error) {
    console.error('Error showing stats:', error);
    await bot.sendMessage(chatId, 'Произошла ошибка при получении статистики.');
  }
} 