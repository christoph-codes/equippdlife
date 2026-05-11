import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateUserInput = Omit<User, 'createdAt' | 'updatedAt'>;
