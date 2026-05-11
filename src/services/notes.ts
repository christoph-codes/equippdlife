import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Note, CreateNoteInput, UpdateNoteInput } from '../types/note';

export const createNote = async (input: CreateNoteInput): Promise<Note> => {
  const now = serverTimestamp();
  const docRef = await addDoc(collection(db, 'notes'), {
    ...input,
    createdAt: now,
    updatedAt: now,
  });

  const snap = await getDoc(docRef);
  return { id: snap.id, ...snap.data() } as Note;
};

export const updateNote = async (noteId: string, input: UpdateNoteInput): Promise<void> => {
  await updateDoc(doc(db, 'notes', noteId), {
    ...input,
    updatedAt: serverTimestamp(),
  });
};

export const deleteNote = async (noteId: string): Promise<void> => {
  await deleteDoc(doc(db, 'notes', noteId));
};

export const getNoteById = async (noteId: string): Promise<Note | null> => {
  const snap = await getDoc(doc(db, 'notes', noteId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Note;
};

export const getUserNotes = async (userId: string): Promise<Note[]> => {
  const q = query(
    collection(db, 'notes'),
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Note));
};

export const getStudyNotes = async (userId: string, studySlug: string): Promise<Note[]> => {
  const q = query(
    collection(db, 'notes'),
    where('userId', '==', userId),
    where('studySlug', '==', studySlug),
    orderBy('updatedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Note));
};
