/**
 * Firestore Seed Script
 * Run with: npx ts-node scripts/seedFirestore.ts
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const projectId = process.env.FIREBASE_PROJECT_ID;

if (!projectId) {
  console.error('Error: FIREBASE_PROJECT_ID environment variable is required.');
  process.exit(1);
}

if (getApps().length === 0) {
  initializeApp({ projectId });
}

const db = getFirestore();

async function seedDefaultGroup() {
  const groupRef = db.collection('groups').doc('the-fellas');
  const existing = await groupRef.get();

  if (existing.exists) {
    console.log('✅ "The Fellas" group already exists. Skipping.');
    return;
  }

  await groupRef.set({
    name: 'The Fellas',
    slug: 'the-fellas',
    description: "A men's Bible study group under the Equippd organization",
    organization: 'Equippd',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  console.log('✅ "The Fellas" group created successfully.');
}

async function main() {
  console.log('🌱 Starting Firestore seed...');
  await seedDefaultGroup();
  console.log('✅ Seed complete.');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
