import React from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { useGroups } from '../../src/hooks/useGroups';
import { ScreenContainer } from '../../src/components/ScreenContainer';
import { GroupCard } from '../../src/components/GroupCard';
import { EmptyState } from '../../src/components/EmptyState';

export default function GroupsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { groups, loading } = useGroups(user?.uid ?? null);

  if (!loading && groups.length === 0) {
    return (
      <ScreenContainer>
        <EmptyState
          title="No groups yet"
          description="You haven't joined any Bible study groups yet."
          icon="👥"
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          onPress={() => router.push(`/(app)/groups/${group.slug}` as never)}
        />
      ))}
    </ScreenContainer>
  );
}
