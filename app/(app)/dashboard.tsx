import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { useGroups } from '../../src/hooks/useGroups';
import { useNotes } from '../../src/hooks/useNotes';
import { ScreenContainer } from '../../src/components/ScreenContainer';
import { SectionHeader } from '../../src/components/SectionHeader';
import { GroupCard } from '../../src/components/GroupCard';
import { NoteCard } from '../../src/components/NoteCard';
import { ComingSoonPanel } from '../../src/components/ComingSoonPanel';
import { EmptyState } from '../../src/components/EmptyState';
import { colors, typography, spacing } from '../../src/theme';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { groups, loading: groupsLoading } = useGroups(user?.uid ?? null);
  const { notes, loading: notesLoading } = useNotes(user?.uid ?? null);

  const recentNotes = notes.slice(0, 3);

  return (
    <ScreenContainer>
      <View style={styles.welcome}>
        <Text style={styles.greeting}>Good day,</Text>
        <Text style={styles.name}>{user?.displayName || 'Friend'} 👋</Text>
        <Text style={styles.verse}>{"\"Your word is a lamp for my feet, a light on my path.\" — Psalm 119:105"}</Text>
      </View>

      <SectionHeader
        title="My Groups"
        actionLabel="See all"
        onAction={() => router.push('/(app)/groups')}
      />
      {!groupsLoading && groups.length === 0 && (
        <EmptyState title="No groups yet" description="You'll be added to a group soon." icon="👥" />
      )}
      {groups.slice(0, 2).map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          onPress={() => router.push(`/(app)/groups/${group.slug}` as never)}
        />
      ))}

      <View style={styles.section}>
        <SectionHeader
          title="Recent Notes"
          actionLabel={notes.length > 3 ? 'See all' : undefined}
        />
        {!notesLoading && recentNotes.length === 0 && (
          <EmptyState title="No notes yet" description="Start taking notes during a study." icon="📝" />
        )}
        {recentNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onPress={() => router.push(`/(app)/notes/${note.id}` as never)}
          />
        ))}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Music" actionLabel="Explore" onAction={() => router.push('/(app)/music')} />
        <View style={styles.previewCard}>
          <Text style={styles.previewEmoji}>🎵</Text>
          <Text style={styles.previewText}>Discover faith-centered music curated for your journey.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <ComingSoonPanel
          title="Equippd Shop"
          description="Apparel and more coming soon. Stay tuned."
          emoji="👕"
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  greeting: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  name: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  verse: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    fontStyle: 'italic',
    lineHeight: typography.fontSize.sm * 1.6,
  },
  section: {
    marginTop: spacing.xl,
  },
  previewCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  previewEmoji: {
    fontSize: 32,
  },
  previewText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * 1.6,
  },
});
