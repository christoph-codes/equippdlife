import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { Group } from '../types/group';

export const getGroupBySlug = async (slug: string): Promise<Group | null> => {
  const q = query(collection(db, 'groups'), where('slug', '==', slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as Group;
};

export const getUserGroups = async (userId: string): Promise<Group[]> => {
  const groups: Group[] = [];
  const groupsSnapshot = await getDocs(collection(db, 'groups'));

  for (const groupDoc of groupsSnapshot.docs) {
    const memberDoc = await getDoc(doc(db, 'groups', groupDoc.id, 'members', userId));
    if (memberDoc.exists()) {
      groups.push({ id: groupDoc.id, ...groupDoc.data() } as Group);
    }
  }

  return groups;
};

export const seedDefaultGroup = async (): Promise<void> => {
  const groupRef = doc(db, 'groups', 'the-fellas');
  const existing = await getDoc(groupRef);

  if (!existing.exists()) {
    await setDoc(groupRef, {
      name: 'The Fellas',
      slug: 'the-fellas',
      description: "A men's Bible study group under the Equippd organization",
      organization: 'Equippd',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
};
