export interface UserProfile {
  id: string;
  telegramId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  location: {
    country: string;
    city: string;
  };
  status: 'student' | 'working' | 'living' | 'other';
  interests: string[];
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  country: string;
  city: string;
}

export type UserStatus = 'student' | 'working' | 'living' | 'other'; 