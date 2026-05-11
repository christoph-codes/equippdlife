import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StudyFrontmatter } from '../types/study';
import { colors, typography, spacing, borderRadius } from '../theme';

interface Props {
  study: StudyFrontmatter;
  onPress: () => void;
}

export const StudyCard: React.FC<Props> = ({ study, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.scripture}>{study.scripture}</Text>
        <Text style={styles.date}>{study.date}</Text>
      </View>
      <Text style={styles.title}>{study.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {study.description}
      </Text>
      {study.tags?.length > 0 && (
        <View style={styles.tags}>
          {study.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  scripture: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * 1.6,
    marginBottom: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tag: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
});
