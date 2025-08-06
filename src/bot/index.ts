import TelegramBot from 'node-telegram-bot-api';
import { supabase } from '../lib/supabase';
import { startCommand } from './commands/start';
import { profileCommand } from './commands/profile';
import { searchCommand, showStats } from './commands/search';
import { helpCommand } from './commands/help';

// Получаем токен бота из переменных окружения
const token = process.env.TELEGRAM_BOT_TOKEN;

// Создаем экземпляр бота только если токен доступен
let bot: TelegramBot | null = null;

if (token) {
  bot = new TelegramBot(token, { polling: true });
  
  // Обработчик ошибок подключения
  bot.on('error', (error: Error) => {
    console.error('❌ Ошибка бота:', error.message);
    if (error.message.includes('Conflict') || error.message.includes('409')) {
      console.error('⚠️  Конфликт с Telegram API. Возможно:');
      console.error('   - Бот уже запущен в другом месте');
      console.error('   - Установлен webhook (удалите через @BotFather)');
      console.error('   - Несколько экземпляров бота');
    }
  });

  // Обработчик polling ошибок
  bot.on('polling_error', (error: Error) => {
    console.error('❌ Ошибка polling:', error.message);
    if (error.message.includes('Conflict') || error.message.includes('409')) {
      console.error('⚠️  Конфликт с Telegram API. Проверьте webhook в @BotFather');
    }
  });

  // Обработчик команды /start
  bot.onText(/\/start/, (msg: TelegramBot.Message, match: RegExpExecArray | null) => startCommand(bot!, msg.chat.id));

  // Обработчик команды /profile
  bot.onText(/\/profile/, (msg: TelegramBot.Message, match: RegExpExecArray | null) => profileCommand(bot!, msg.chat.id));

  // Обработчик команды /search
  bot.onText(/\/search/, (msg: TelegramBot.Message, match: RegExpExecArray | null) => searchCommand(bot!, msg.chat.id));

  // Обработчик команды /help
  bot.onText(/\/help/, (msg: TelegramBot.Message, match: RegExpExecArray | null) => helpCommand(bot!, msg.chat.id));

  // Обработчик callback_query (для inline кнопок)
  bot.on('callback_query', async (callbackQuery: TelegramBot.CallbackQuery) => {
    if (!callbackQuery.data) return;

    const chatId = callbackQuery.message?.chat.id;
    if (!chatId) return;

    try {
      const data = callbackQuery.data;
      
      switch (data) {
        case 'create_profile':
          await handleCreateProfile(chatId);
          break;
        case 'edit_profile':
          await handleEditProfile(chatId);
          break;
        case 'search_users':
          await handleSearchUsers(chatId);
          break;
        case 'show_stats':
          await showStats(bot!, chatId);
          break;
        case 'delete_profile':
          await handleDeleteProfile(chatId);
          break;
        case 'search':
          await searchCommand(bot!, chatId);
          break;
        case 'help':
          await helpCommand(bot!, chatId);
          break;
        case 'main_menu':
          await startCommand(bot!, chatId);
          break;
        default:
          await bot!.sendMessage(chatId, 'Неизвестная команда');
      }
    } catch (error) {
      console.error('Error handling callback query:', error);
      await bot!.sendMessage(chatId, 'Произошла ошибка. Попробуйте позже.');
    }
  });

  // Обработчик текстовых сообщений
  bot.on('message', async (msg: TelegramBot.Message) => {
    if (msg.text && !msg.text.startsWith('/')) {
      // Обработка текстовых сообщений (для создания/редактирования профиля)
      await handleTextMessage(msg);
    }
  });
} else {
  console.log('⚠️  TELEGRAM_BOT_TOKEN не найден, бот не будет запущен');
}

// Функция для создания профиля
async function handleCreateProfile(chatId: number) {
  try {
    if (!supabase) {
      await bot!.sendMessage(chatId, 'База данных недоступна. Попробуйте позже.');
      return;
    }

    // Проверяем, существует ли уже профиль
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('telegram_id', chatId)
      .single();

    if (existingProfile) {
      await bot!.sendMessage(chatId, 'У вас уже есть профиль! Используйте /profile для редактирования.');
      return;
    }

    // Отправляем ссылку на Web App для создания профиля
    const webAppUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile`;
    
    await bot!.sendMessage(chatId, 
      'Создайте свой профиль в нашем приложении!', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📝 Создать профиль', web_app: { url: webAppUrl } }],
          [{ text: '🔙 Назад в меню', callback_data: 'main_menu' }]
        ]
      }
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    await bot!.sendMessage(chatId, 'Произошла ошибка при создании профиля.');
  }
}

// Функция для редактирования профиля
async function handleEditProfile(chatId: number) {
  try {
    if (!supabase) {
      await bot!.sendMessage(chatId, 'База данных недоступна. Попробуйте позже.');
      return;
    }

    // Проверяем, существует ли профиль
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('telegram_id', chatId)
      .single();

    if (!profile) {
      await bot!.sendMessage(chatId, 'У вас еще нет профиля! Создайте его с помощью команды /profile');
      return;
    }

    // Отправляем ссылку на Web App для редактирования профиля
    const webAppUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile`;
    
    await bot!.sendMessage(chatId, 
      'Редактируйте свой профиль в нашем приложении!', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '✏️ Редактировать профиль', web_app: { url: webAppUrl } }],
          [{ text: '🔙 Назад в меню', callback_data: 'main_menu' }]
        ]
      }
    });
  } catch (error) {
    console.error('Error editing profile:', error);
    await bot!.sendMessage(chatId, 'Произошла ошибка при редактировании профиля.');
  }
}

// Функция для поиска пользователей
async function handleSearchUsers(chatId: number) {
  try {
    // Отправляем ссылку на Web App для поиска
    const webAppUrl = `${process.env.NEXT_PUBLIC_APP_URL}/search`;
    
    await bot!.sendMessage(chatId, 
      'Найдите узбеков по всему миру в нашем приложении!', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔍 Найти узбеков', web_app: { url: webAppUrl } }],
          [{ text: '🔙 Назад в меню', callback_data: 'main_menu' }]
        ]
      }
    });
  } catch (error) {
    console.error('Error searching users:', error);
    await bot!.sendMessage(chatId, 'Произошла ошибка при поиске пользователей.');
  }
}

// Функция для удаления профиля
async function handleDeleteProfile(chatId: number) {
  try {
    if (!supabase) {
      await bot!.sendMessage(chatId, 'База данных недоступна. Попробуйте позже.');
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('telegram_id', chatId);

    if (error) {
      console.error('Error deleting profile:', error);
      await bot!.sendMessage(chatId, 'Произошла ошибка при удалении профиля.');
      return;
    }

    await bot!.sendMessage(chatId, 'Ваш профиль успешно удален!', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Создать новый профиль', callback_data: 'create_profile' }],
          [{ text: 'Назад в меню', callback_data: 'main_menu' }]
        ]
      }
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    await bot!.sendMessage(chatId, 'Произошла ошибка при удалении профиля.');
  }
}

// Функция для обработки текстовых сообщений
async function handleTextMessage(msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  // Здесь можно добавить логику для обработки текстовых сообщений
  // Например, для создания профиля пошагово
  await bot!.sendMessage(chatId, 'Используйте команды бота или кнопки для навигации.');
}

console.log('Telegram bot is running...');

export default bot; 