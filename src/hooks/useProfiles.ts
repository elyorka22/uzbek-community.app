import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/user';

interface UseProfilesOptions {
  country?: string;
  city?: string;
  status?: string;
  interests?: string[];
}

interface UseProfilesReturn {
  profiles: UserProfile[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProfiles(options: UseProfilesOptions = {}): UseProfilesReturn {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.country) params.append('country', options.country);
      if (options.city) params.append('city', options.city);
      if (options.status) params.append('status', options.status);
      if (options.interests && options.interests.length > 0) {
        params.append('interests', options.interests.join(','));
      }

      const response = await fetch(`/api/profiles?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch profiles');
      }

      const data = await response.json();
      
      // Преобразование данных из Supabase в формат UserProfile
      const transformedProfiles: UserProfile[] = data.profiles.map((profile: {
        id: string;
        telegram_id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        photo_url?: string;
        country: string;
        city: string;
        status: string;
        interests?: string[];
        bio?: string;
        created_at: string;
        updated_at: string;
      }) => ({
        id: profile.id,
        telegramId: profile.telegram_id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        username: profile.username,
        photoUrl: profile.photo_url,
        location: {
          country: profile.country,
          city: profile.city
        },
        status: profile.status,
        interests: profile.interests || [],
        bio: profile.bio,
        createdAt: new Date(profile.created_at),
        updatedAt: new Date(profile.updated_at)
      }));

      setProfiles(transformedProfiles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [options.country, options.city, options.status, options.interests?.join(',')]);

  return {
    profiles,
    loading,
    error,
    refetch: fetchProfiles
  };
}

interface UseProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  deleteProfile: () => Promise<void>;
}

export function useProfile(telegramId: number): UseProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    // Не делаем запрос если telegramId равен 0
    if (!telegramId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/profiles/${telegramId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setProfile(null);
          return;
        }
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      
      // Преобразование данных из Supabase в формат UserProfile
      const transformedProfile: UserProfile = {
        id: data.profile.id,
        telegramId: data.profile.telegram_id,
        firstName: data.profile.first_name,
        lastName: data.profile.last_name,
        username: data.profile.username,
        photoUrl: data.profile.photo_url,
        location: {
          country: data.profile.country,
          city: data.profile.city
        },
        status: data.profile.status,
        interests: data.profile.interests || [],
        bio: data.profile.bio,
        createdAt: new Date(data.profile.created_at),
        updatedAt: new Date(data.profile.updated_at)
      };

      setProfile(transformedProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!telegramId) {
      throw new Error('Telegram ID is required');
    }

    try {
      setError(null);

      const response = await fetch(`/api/profiles/${telegramId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          username: data.username,
          photo_url: data.photoUrl,
          country: data.location?.country,
          city: data.location?.city,
          status: data.status,
          interests: data.interests,
          bio: data.bio
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const responseData = await response.json();
      
      // Обновляем локальное состояние
      if (profile) {
        setProfile({
          ...profile,
          ...data,
          updatedAt: new Date()
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteProfile = async () => {
    if (!telegramId) {
      throw new Error('Telegram ID is required');
    }

    try {
      setError(null);

      const response = await fetch(`/api/profiles/${telegramId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }

      setProfile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    if (telegramId > 0) {
      fetchProfile();
    } else {
      setLoading(false);
      setProfile(null);
      setError(null);
    }
  }, [telegramId]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    deleteProfile
  };
} 