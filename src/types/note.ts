import { Timestamp } from 'firebase/firestore';

export interface Note {
  id: string;
  userId: string;
  groupSlug: string;
  studySlug: string;
  title: string;
  body: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateNoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateNoteInput = Pick<Note, 'title' | 'body'>;
