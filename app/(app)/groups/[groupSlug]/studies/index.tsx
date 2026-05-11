import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getStudiesByGroup } from '../../../../../src/lib/contentLoader';
import { ScreenContainer } from '../../../../../src/components/ScreenContainer';
import { StudyCard } from '../../../../../src/components/StudyCard';
import { EmptyState } from '../../../../../src/components/EmptyState';
import { SectionHeader } from '../../../../../src/components/SectionHeader';

export default function StudiesIndexScreen() {
  const { groupSlug } = useLocalSearchParams<{ groupSlug: string }>();
  const router = useRouter();
  const studies = getStudiesByGroup(groupSlug ?? '');

  return (
    <ScreenContainer>
      <SectionHeader title="Studies" subtitle={`${studies.length} studies`} />
      {studies.length === 0 ? (
        <EmptyState title="No studies yet" icon="📖" />
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
