import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getStudiesByGroup } from '../../../../src/lib/contentLoader';
import { ScreenContainer } from '../../../../src/components/ScreenContainer';
import { SectionHeader } from '../../../../src/components/SectionHeader';
import { StudyCard } from '../../../../src/components/StudyCard';
import { EmptyState } from '../../../../src/components/EmptyState';
import { colors, typography, spacing } from '../../../../src/theme';

export default function GroupDetailScreen() {
  const { groupSlug } = useLocalSearchParams<{ groupSlug: string }>();
  const router = useRouter();
  const studies = getStudiesByGroup(groupSlug ?? '');

  const groupNames: Record<string, string> = {
    'the-fellas': 'The Fellas',
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.org}>EQUIPPD</Text>
        <Text style={styles.name}>{groupNames[groupSlug ?? ''] ?? groupSlug}</Text>
        <Text style={styles.description}>
          {"A men's Bible study group dedicated to growing in faith and community."}
        </Text>
      </View>

      <SectionHeader title="Studies" subtitle={`${studies.length} studies available`} />

      {studies.length === 0 ? (
        <EmptyState title="No studies yet" description="Studies will appear here soon." icon="📖" />
      ) : (
        studies.map((study) => (
          <StudyCard
            key={study.slug}
            study={study}
            onPress={() =>
              router.push(`/(app)/groups/${groupSlug}/studies/${study.slug}` as never)
            }
          />
        ))
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  org: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.base * 1.6,
  },
});
