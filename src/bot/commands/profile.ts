import TelegramBot from 'node-telegram-bot-api';
import { supabase } from '../../lib/supabase';

export async function profileCommand(bot: TelegramBot, chatId: number) {
  try {
    // Проверяем, существует ли профиль пользователя
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('telegram_id', chatId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Database error:', error);
      await bot.sendMessage(chatId, 'Произошла ошибка при получении профиля.');
      return;
    }

    if (!profile) {
      // Профиль не найден - предлагаем создать
      const message = `
📝 У вас еще нет профиля!

Создайте свой профиль, чтобы другие узбеки могли вас найти.

В профиле вы можете указать:
• 📍 Вашу локацию (страна, город)
• 🎓 Статус (студент, работаю, живу)
• 🎯 Интересы
• 📖 О себе
      `;

      const keyboard = {
        inline_keyboard: [
          [{ text: '📝 Создать профиль', callback_data: 'create_profile' }],
          [{ text: '🔙 Назад в меню', callback_data: 'main_menu' }]
        ]
      };

      await bot.sendMessage(chatId, message, {
        reply_markup: keyboard,
        parse_mode: 'HTML'
      });
    } else {
      // Профиль найден - показываем информацию
      const statusEmoji = {
        student: '🎓',
        working: '💼',
        living: '🏠',
        other: '📋'
      };

      const interests = profile.interests?.length > 0 
        ? profile.interests.join(', ') 
        : 'Не указаны';

      const message = `
👤 Ваш профиль:

📛 Имя: ${profile.first_name} ${profile.last_name || ''}
📍 Локация: ${profile.country}, ${profile.city}
${statusEmoji[profile.status as keyof typeof statusEmoji]} Статус: ${profile.status}
🎯 Интересы: ${interests}
📖 О себе: ${profile.bio || 'Не указано'}

Дата создания: ${new Date(profile.created_at).toLocaleDateString('ru-RU')}
      `;

      const keyboard = {
        inline_keyboard: [
          [{ text: '✏️ Редактировать профиль', callback_data: 'edit_profile' }],
          [{ text: '🗑️ Удалить профиль', callback_data: 'delete_profile' }],
          [{ text: '🔙 Назад в меню', callback_data: 'main_menu' }]
        ]
      };

      await bot.sendMessage(chatId, message, {
        reply_markup: keyboard,
        parse_mode: 'HTML'
      });
    }
  } catch (error) {
    console.error('Error in profile command:', error);
    await bot.sendMessage(chatId, 'Произошла ошибка при получении профиля.');
  }
} 