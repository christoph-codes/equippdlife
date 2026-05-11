import { Timestamp } from 'firebase/firestore';

export interface Group {
  id: string;
  name: string;
  slug: string;
  description: string;
  organization: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface GroupMember {
  userId: string;
  role: 'member' | 'leader' | 'admin';
  joinedAt: Timestamp;
}
