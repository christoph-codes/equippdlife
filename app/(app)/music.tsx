import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../src/components/ScreenContainer';
import { SectionHeader } from '../../src/components/SectionHeader';
import { Card } from '../../src/components/Card';
import { colors, typography, spacing, borderRadius } from '../../src/theme';

const musicTracks = [
  {
    id: '1',
    title: 'Way Maker',
    artist: 'Sinach',
    description: "A powerful declaration of God's faithfulness and presence in every season.",
    link: '',
    genre: 'Worship',
  },
  {
    id: '2',
    title: 'Goodness of God',
    artist: 'Bethel Music',
    description: 'A heartfelt anthem celebrating the enduring goodness and faithfulness of God.',
    link: '',
    genre: 'Contemporary Christian',
  },
  {
    id: '3',
    title: 'King of Kings',
    artist: 'Hillsong Worship',
    description: 'A sweeping worship song tracing the story of redemption from creation to resurrection.',
    link: '',
    genre: 'Worship',
  },
  {
    id: '4',
    title: 'Evidence',
    artist: 'Josh Baldwin',
    description: "A testimony-driven song reflecting on God's faithfulness through every trial.",
    link: '',
    genre: 'Contemporary Worship',
  },
];

export default function MusicScreen() {
  return (
    <ScreenContainer>
      <View style={styles.intro}>
        <Text style={styles.introText}>
          Discover music that fuels your faith journey. Curated for study, worship, and daily devotion.
        </Text>
      </View>

      <SectionHeader title="Featured Tracks" />

      {musicTracks.map((track) => (
        <Card key={track.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.genreBadge}>
              <Text style={styles.genreText}>{track.genre}</Text>
            </View>
            <Text style={styles.musicIcon}>🎵</Text>
          </View>
          <Text style={styles.title}>{track.title}</Text>
          <Text style={styles.artist}>{track.artist}</Text>
          <Text style={styles.description}>{track.description}</Text>
          {track.link ? (
            <TouchableOpacity onPress={() => Linking.openURL(track.link)} style={styles.linkButton}>
              <Text style={styles.linkText}>Listen →</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.comingSoon}>
              <Text style={styles.comingSoonText}>Link coming soon</Text>
            </View>
          )}
        </Card>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  intro: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  introText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.base * 1.6,
    fontStyle: 'italic',
  },
  card: {
    marginBottom: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  genreBadge: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  genreText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: 0.5,
  },
  musicIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  artist: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * 1.6,
    marginBottom: spacing.sm,
  },
  linkButton: {
    alignSelf: 'flex-start',
  },
  linkText: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  comingSoon: {
    alignSelf: 'flex-start',
  },
  comingSoonText: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});
