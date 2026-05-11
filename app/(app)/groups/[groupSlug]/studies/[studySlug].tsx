import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getStudyBySlug } from '../../../../../src/lib/contentLoader';
import { useAuth } from '../../../../../src/hooks/useAuth';
import { useNotes } from '../../../../../src/hooks/useNotes';
import { ScreenContainer } from '../../../../../src/components/ScreenContainer';
import { NoteCard } from '../../../../../src/components/NoteCard';
import { SectionHeader } from '../../../../../src/components/SectionHeader';
import { EmptyState } from '../../../../../src/components/EmptyState';
import { colors, typography, spacing, borderRadius } from '../../../../../src/theme';

export default function StudyDetailScreen() {
  const { groupSlug, studySlug } = useLocalSearchParams<{ groupSlug: string; studySlug: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { notes, loading: notesLoading } = useNotes(user?.uid ?? null, studySlug);
  const study = getStudyBySlug(groupSlug ?? '', studySlug ?? '');

  if (!study) {
    return (
      <ScreenContainer>
        <EmptyState title="Study not found" icon="😕" />
      </ScreenContainer>
    );
  }

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <Text key={index} style={styles.h1}>{line.slice(2)}</Text>;
      }
      if (line.startsWith('## ')) {
        return <Text key={index} style={styles.h2}>{line.slice(3)}</Text>;
      }
      if (line.startsWith('### ')) {
        return <Text key={index} style={styles.h3}>{line.slice(4)}</Text>;
      }
      if (line.startsWith('> ')) {
        return (
          <View key={index} style={styles.blockquote}>
            <Text style={styles.blockquoteText}>{line.slice(2)}</Text>
          </View>
        );
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <Text key={index} style={styles.listItem}>{'• '}{line.slice(2)}</Text>;
      }
      if (line.trim() === '') {
        return <View key={index} style={styles.spacer} />;
      }
      return <Text key={index} style={styles.paragraph}>{line}</Text>;
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.scripture}>{study.scripture}</Text>
        <Text style={styles.title}>{study.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>By {study.author}</Text>
          <Text style={styles.metaDot}>{'·'}</Text>
          <Text style={styles.metaText}>{study.date}</Text>
        </View>
        <Text style={styles.description}>{study.description}</Text>
      </View>

      <View style={styles.content}>
        {renderContent(study.content)}
      </View>

      <View style={styles.notesSection}>
        <SectionHeader
          title="My Notes"
          actionLabel="Add Note"
          onAction={() =>
            router.push({
              pathname: '/(app)/notes/[noteId]',
              params: { noteId: 'new', groupSlug, studySlug },
            } as never)
          }
        />
        {!notesLoading && notes.length === 0 && (
          <EmptyState
            title="No notes yet"
            description="Tap 'Add Note' to record your thoughts."
            icon="📝"
          />
        )}
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onPress={() => router.push(`/(app)/notes/${note.id}` as never)}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  scripture: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    lineHeight: typography.fontSize['3xl'] * 1.2,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  metaText: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
  },
  metaDot: {
    color: colors.textMuted,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.base * 1.6,
    fontStyle: 'italic',
  },
  content: {
    marginBottom: spacing.xl,
  },
  h1: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  h2: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  h3: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: spacing.md,
    marginVertical: spacing.sm,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
  },
  blockquoteText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: typography.fontSize.base * 1.7,
  },
  listItem: {
    fontSize: typography.fontSize.base,
    color: colors.text,
    lineHeight: typography.fontSize.base * 1.7,
    paddingLeft: spacing.sm,
    marginBottom: spacing.xs,
  },
  paragraph: {
    fontSize: typography.fontSize.base,
    color: colors.text,
    lineHeight: typography.fontSize.base * 1.8,
    marginBottom: spacing.xs,
  },
  spacer: {
    height: spacing.sm,
  },
  notesSection: {
    marginTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
  },
});
