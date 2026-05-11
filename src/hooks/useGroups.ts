import { useState, useEffect } from 'react';
import { Group } from '../types/group';
import { getUserGroups } from '../services/groups';

export const useGroups = (userId: string | null) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchGroups = async () => {
      try {
        const data = await getUserGroups(userId);
        setGroups(data);
      } catch (err) {
        setError('Failed to load groups');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [userId]);

  return { groups, loading, error };
};
