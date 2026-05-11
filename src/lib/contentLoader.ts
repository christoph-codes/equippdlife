import { Study, StudyFrontmatter } from '../types/study';

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const fmRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = raw.match(fmRegex);
  if (!match) return { data: {}, content: raw };

  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  yamlBlock.split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^['"]|['"]$/g, ''));
    } else {
      data[key] = value.replace(/^['"]|['"]$/g, '');
    }
  });

  return { data, content };
}

const ISAIAH_47 = `---
title: The Fall of Babylon — Isaiah 47
slug: isaiah-47
description: A study on God's sovereignty over nations and the danger of pride and self-reliance apart from Him.
scripture: Isaiah 47:1-15
groupSlug: the-fellas
date: 2024-01-15
tags: [sovereignty, pride, judgment, trust]
author: Equippd Team
---

## Overview

Isaiah 47 is a prophetic lament over Babylon — a nation that trusted in its own power, wealth, and wisdom rather than in the living God. Through this passage, we see a timeless warning about pride, self-reliance, and what happens when we make ourselves the center of our own story.

## Scripture Reading

> "Come down and sit in the dust, virgin daughter Babylon; sit on the ground without a throne, daughter of the Babylonians. No more will you be called tender or delicate."
> — Isaiah 47:1

## Key Themes

### 1. The Pride of Self-Sufficiency

Babylon said in her heart: "I am, and there is none besides me." This is the ultimate posture of self-reliance — believing we need nothing and no one beyond ourselves.

- How often do we operate from this same posture?
- Where in your life are you trusting in your own strength rather than God's?

### 2. The Danger of Misplaced Security

Babylon trusted in sorcery, wisdom, and pleasures — things that felt like security but were ultimately empty.

> "All the counsel you have received has only worn you out!"
> — Isaiah 47:13

Real security only comes from the One who holds all things together.

### 3. God's Sovereignty Over Nations and Lives

This chapter is a reminder that God is sovereign — over empires, over systems, over your personal circumstances.

- Nothing catches God off guard.
- His purposes will stand.

## Discussion Questions

- In what areas of your life are you most tempted to act like you are "in and there is none besides me"?
- What does it practically look like to trust God's sovereignty in a difficult season?
- How do we balance taking initiative and responsibility while still relying on God?

## Application

This week, identify one area where you have been relying on your own wisdom or strength. Bring it before God in prayer and ask for the humility to trust Him with it.

## Prayer

Lord, forgive us for the moments we act as though we are sovereign over our own lives. Like Babylon, we are prone to pride and self-reliance. Teach us to build our security on You alone — not on comfort, wisdom, or success. May we walk humbly before You this week. Amen.
`;

const SAMPLE_STUDY = `---
title: Walking in Obedience
slug: sample-study
description: A foundational study on what it means to walk in daily obedience to God's Word.
scripture: John 14:15-21
groupSlug: the-fellas
date: 2024-02-01
tags: [obedience, love, discipleship, Holy Spirit]
author: Equippd Team
---

## Overview

True love for God expresses itself through obedience. In John 14, Jesus connects love and obedience together — not as a transactional relationship, but as a natural expression of a transformed heart.

## Scripture Reading

> "If you love me, keep my commands. And I will ask the Father, and he will give you another advocate to help you and be with you forever."
> — John 14:15-16

## Key Themes

### 1. Obedience as Love in Action

Obedience is not about earning God's favor — it is about expressing love for Him.

- The commands of Jesus are not burdensome when we are walking in love.
- Our obedience reflects whose we are.

### 2. The Role of the Holy Spirit

Jesus promises the Spirit as a helper — the one who empowers us to actually live out what we believe.

> "But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things and will remind you of everything I have said to you."
> — John 14:26

We are not left alone in the work of obedience.

### 3. The Fruit of Obedience

When we walk in obedience:
- We experience deeper intimacy with the Father and Son
- We become a visible testimony to the world
- We grow in the character of Christ

## Discussion Questions

- What is the difference between obeying God out of fear versus obeying God out of love?
- Which command of Jesus feels hardest to keep right now? Why?
- How have you seen the Holy Spirit help you in an area where you were struggling?

## Application

Choose one command from the Sermon on the Mount (Matthew 5-7) and commit to intentionally practicing it this week. Journal what you observe.

## Prayer

Father, we want to love You not just in word but in action. Give us the grace to walk in obedience — not out of duty but out of delight in who You are. Thank You for the Holy Spirit who helps us every step of the way. Amen.
`;

const studyFiles: Record<string, string> = {
  'the-fellas/isaiah-47': ISAIAH_47,
  'the-fellas/sample-study': SAMPLE_STUDY,
};

export const getStudiesByGroup = (groupSlug: string): StudyFrontmatter[] => {
  const studies: StudyFrontmatter[] = [];

  Object.entries(studyFiles).forEach(([key, raw]) => {
    if (!key.startsWith(`${groupSlug}/`)) return;
    const { data } = parseFrontmatter(raw);
    studies.push(data as unknown as StudyFrontmatter);
  });

  return studies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getStudyBySlug = (groupSlug: string, studySlug: string): Study | null => {
  const key = `${groupSlug}/${studySlug}`;
  const raw = studyFiles[key];
  if (!raw) return null;

  const { data, content } = parseFrontmatter(raw);
  return {
    ...(data as unknown as StudyFrontmatter),
    content,
  };
};
