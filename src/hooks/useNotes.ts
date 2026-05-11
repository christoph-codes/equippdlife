import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types/note';
import { getUserNotes, getStudyNotes } from '../services/notes';

export const useNotes = (userId: string | null, studySlug?: string) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = studySlug
        ? await getStudyNotes(userId, studySlug)
        : await getUserNotes(userId);
      setNotes(data);
    } catch (err) {
      setError('Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, [userId, studySlug]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, loading, error, refetch: fetchNotes };
};
