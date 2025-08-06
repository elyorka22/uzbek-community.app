-- Полезные SQL запросы для Uzbek Community
-- Выполняйте эти запросы в SQL Editor Supabase

-- 1. Общая статистика
SELECT 
  COUNT(*) as total_users,
  COUNT(DISTINCT country) as total_countries,
  COUNT(DISTINCT city) as total_cities
FROM profiles;

-- 2. Статистика по странам
SELECT 
  country,
  COUNT(*) as user_count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM profiles), 2) as percentage
FROM profiles 
GROUP BY country 
ORDER BY user_count DESC;

-- 3. Статистика по городам
SELECT 
  city,
  country,
  COUNT(*) as user_count
FROM profiles 
GROUP BY city, country 
ORDER BY user_count DESC 
LIMIT 20;

-- 4. Статистика по статусам
SELECT 
  status,
  COUNT(*) as user_count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM profiles), 2) as percentage
FROM profiles 
GROUP BY status 
ORDER BY user_count DESC;

-- 5. Популярные интересы
SELECT 
  unnest(interests) as interest,
  COUNT(*) as user_count
FROM profiles 
GROUP BY interest 
ORDER BY user_count DESC;

-- 6. Пользователи по интересам и странам
SELECT 
  country,
  unnest(interests) as interest,
  COUNT(*) as user_count
FROM profiles 
GROUP BY country, interest 
ORDER BY user_count DESC;

-- 7. Поиск пользователей по интересам
SELECT 
  first_name,
  last_name,
  country,
  city,
  status,
  interests
FROM profiles 
WHERE 'IT' = ANY(interests)
ORDER BY created_at DESC;

-- 8. Поиск пользователей по стране и статусу
SELECT 
  first_name,
  last_name,
  city,
  interests,
  bio
FROM profiles 
WHERE country = 'Германия' AND status = 'student'
ORDER BY created_at DESC;

-- 9. Пользователи с определенными интересами
SELECT 
  first_name,
  last_name,
  country,
  city,
  interests
FROM profiles 
WHERE interests && ARRAY['Спорт', 'IT']
ORDER BY created_at DESC;

-- 10. Статистика по месяцам регистрации
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as new_users
FROM profiles 
GROUP BY month 
ORDER BY month DESC;

-- 11. Активные пользователи (зарегистрированные в последние 30 дней)
SELECT 
  first_name,
  last_name,
  country,
  city,
  created_at
FROM profiles 
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- 12. Пользователи без фото профиля
SELECT 
  first_name,
  last_name,
  country,
  city,
  username
FROM profiles 
WHERE photo_url IS NULL OR photo_url = ''
ORDER BY created_at DESC;

-- 13. Пользователи с длинными описаниями
SELECT 
  first_name,
  last_name,
  country,
  bio,
  LENGTH(bio) as bio_length
FROM profiles 
WHERE bio IS NOT NULL AND LENGTH(bio) > 50
ORDER BY bio_length DESC;

-- 14. Статистика по городам в Германии
SELECT 
  city,
  COUNT(*) as user_count,
  STRING_AGG(first_name || ' ' || last_name, ', ') as users
FROM profiles 
WHERE country = 'Германия'
GROUP BY city 
ORDER BY user_count DESC;

-- 15. Пользователи с наибольшим количеством интересов
SELECT 
  first_name,
  last_name,
  country,
  interests,
  ARRAY_LENGTH(interests, 1) as interests_count
FROM profiles 
ORDER BY interests_count DESC 
LIMIT 10;

-- 16. Поиск пользователей по части имени
SELECT 
  first_name,
  last_name,
  country,
  city,
  status
FROM profiles 
WHERE first_name ILIKE '%али%' OR last_name ILIKE '%али%'
ORDER BY created_at DESC;

-- 17. Статистика по времени суток регистрации
SELECT 
  EXTRACT(HOUR FROM created_at) as hour,
  COUNT(*) as registrations
FROM profiles 
GROUP BY hour 
ORDER BY hour;

-- 18. Пользователи с одинаковыми именами
SELECT 
  first_name,
  COUNT(*) as name_count,
  STRING_AGG(country, ', ') as countries
FROM profiles 
GROUP BY first_name 
HAVING COUNT(*) > 1
ORDER BY name_count DESC;

-- 19. Топ городов по количеству пользователей
SELECT 
  city,
  country,
  COUNT(*) as user_count
FROM profiles 
GROUP BY city, country 
HAVING COUNT(*) >= 2
ORDER BY user_count DESC;

-- 20. Пользователи с определенными интересами в определенной стране
SELECT 
  first_name,
  last_name,
  city,
  interests,
  bio
FROM profiles 
WHERE country = 'США' AND 'IT' = ANY(interests)
ORDER BY created_at DESC;

-- 21. Статистика по дням недели регистрации
SELECT 
  TO_CHAR(created_at, 'Day') as day_of_week,
  COUNT(*) as registrations
FROM profiles 
GROUP BY day_of_week 
ORDER BY registrations DESC;

-- 22. Пользователи без описания
SELECT 
  first_name,
  last_name,
  country,
  city,
  status
FROM profiles 
WHERE bio IS NULL OR bio = ''
ORDER BY created_at DESC;

-- 23. Поиск пользователей по нескольким критериям
SELECT 
  first_name,
  last_name,
  country,
  city,
  status,
  interests
FROM profiles 
WHERE 
  country IN ('Германия', 'США', 'Великобритания') AND
  status = 'student' AND
  'IT' = ANY(interests)
ORDER BY created_at DESC;

-- 24. Статистика по годам регистрации
SELECT 
  EXTRACT(YEAR FROM created_at) as year,
  COUNT(*) as registrations
FROM profiles 
GROUP BY year 
ORDER BY year DESC;

-- 25. Пользователи с уникальными интересами
SELECT 
  unnest(interests) as unique_interest,
  COUNT(*) as user_count
FROM profiles 
GROUP BY unique_interest 
HAVING COUNT(*) = 1
ORDER BY unique_interest; 