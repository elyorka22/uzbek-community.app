'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface InterestsSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
}

const AVAILABLE_INTERESTS = [
  'Спорт',
  'Музыка',
  'Кино',
  'Книги',
  'Путешествия',
  'Кулинария',
  'Технологии',
  'Искусство',
  'Наука',
  'Бизнес',
  'Образование',
  'Медицина',
  'IT',
  'Дизайн',
  'Маркетинг',
  'Финансы',
  'Языки',
  'Фотография',
  'Танцы',
  'Йога'
];

export default function InterestsSelector({ selectedInterests, onInterestsChange }: InterestsSelectorProps) {
  const [newInterest, setNewInterest] = useState('');

  const addInterest = (interest: string) => {
    if (interest.trim() && !selectedInterests.includes(interest.trim())) {
      onInterestsChange([...selectedInterests, interest.trim()]);
    }
  };

  const removeInterest = (interestToRemove: string) => {
    onInterestsChange(selectedInterests.filter(interest => interest !== interestToRemove));
  };

  const handleAddCustomInterest = () => {
    if (newInterest.trim()) {
      addInterest(newInterest);
      setNewInterest('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomInterest();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Интересы
        </label>
        
        {/* Выбранные интересы */}
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedInterests.map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {interest}
              <button
                onClick={() => removeInterest(interest)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Добавление нового интереса */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Добавить интерес..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddCustomInterest}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Добавить
          </button>
        </div>

        {/* Доступные интересы */}
        <div className="grid grid-cols-2 gap-2">
          {AVAILABLE_INTERESTS.map((interest) => (
            <button
              key={interest}
              onClick={() => addInterest(interest)}
              disabled={selectedInterests.includes(interest)}
              className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                selectedInterests.includes(interest)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 