import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, color, size }: { name: IoniconName; color: string; size: number }) {
  return <Ionicons name={name} size={size} color={color} />;
}

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text, fontWeight: '700' },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home-outline" color={color} size={size} />
          ),
          headerTitle: 'EQUIPPD',
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="people-outline" color={color} size={size} />
          ),
          headerTitle: 'Bible Study Groups',
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          title: 'Music',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="musical-notes-outline" color={color} size={size} />
          ),
          headerTitle: 'Music Discovery',
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="bag-outline" color={color} size={size} />
          ),
          headerTitle: 'Shop',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="person-outline" color={color} size={size} />
          ),
          headerTitle: 'Settings',
        }}
      />
      <Tabs.Screen
        name="groups/[groupSlug]/index"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="groups/[groupSlug]/studies/index"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="groups/[groupSlug]/studies/[studySlug]"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="notes/[noteId]"
        options={{ href: null, headerShown: false }}
      />
    </Tabs>
  );
}
