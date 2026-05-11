import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../src/components/ScreenContainer';
import { ComingSoonPanel } from '../../src/components/ComingSoonPanel';
import { colors, typography, spacing } from '../../src/theme';

const categories = [
  { emoji: '👕', label: 'Apparel' },
  { emoji: '🧢', label: 'Headwear' },
  { emoji: '📿', label: 'Accessories' },
  { emoji: '📖', label: 'Resources' },
];

export default function ShopScreen() {
  return (
    <ScreenContainer>
      <ComingSoonPanel
        title="Equippd Shop"
        description="Wear your faith. Equippd apparel and resources are on the way."
        emoji="🛍️"
      />

      <View style={styles.categories}>
        <Text style={styles.categoriesTitle}>{"What's Coming"}</Text>
        <View style={styles.grid}>
          {categories.map((cat) => (
            <View key={cat.label} style={styles.categoryItem}>
              <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  categories: {
    marginTop: spacing.xl,
    padding: spacing.md,
  },
  categoriesTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  categoryItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    width: '45%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryEmoji: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  categoryLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
});
