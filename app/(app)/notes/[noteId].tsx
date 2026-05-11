import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { getNoteById, createNote, updateNote, deleteNote } from '../../../src/services/notes';
import { useAuth } from '../../../src/hooks/useAuth';
import { ScreenContainer } from '../../../src/components/ScreenContainer';
import { TextInput } from '../../../src/components/TextInput';
import { Button } from '../../../src/components/Button';
import { colors, spacing } from '../../../src/theme';

export default function NoteScreen() {
  const { noteId, groupSlug, studySlug } = useLocalSearchParams<{
    noteId: string;
    groupSlug?: string;
    studySlug?: string;
  }>();
  const router = useRouter();
  const navigation = useNavigation();
  const { user } = useAuth();

  const isNew = noteId === 'new';

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew && noteId) {
      getNoteById(noteId).then((note) => {
        if (note) {
          setTitle(note.title);
          setBody(note.body);
        }
        setInitialLoading(false);
      });
    }
  }, [noteId, isNew]);

  const handleDelete = () => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteNote(noteId!);
            router.back();
          } catch {
            Alert.alert('Error', 'Could not delete note.');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: isNew ? 'New Note' : 'Edit Note',
      headerRight: () =>
        !isNew ? (
          <TouchableOpacity onPress={handleDelete} style={{ marginRight: spacing.md }}>
            <Text style={{ color: colors.error, fontWeight: '600' }}>Delete</Text>
          </TouchableOpacity>
        ) : null,
    });
  }, [isNew, navigation]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Required', 'Please enter a title for your note.');
      return;
    }
    if (!user) return;

    setLoading(true);
    try {
      if (isNew) {
        await createNote({
          userId: user.uid,
          groupSlug: groupSlug ?? '',
          studySlug: studySlug ?? '',
          title: title.trim(),
          body: body.trim(),
        });
      } else {
        await updateNote(noteId!, { title: title.trim(), body: body.trim() });
      }
      router.back();
    } catch {
      Alert.alert('Error', 'Could not save note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return null;

  return (
    <ScreenContainer>
      <TextInput
        label="Title"
        placeholder="Note title..."
        value={title}
        onChangeText={setTitle}
        autoCapitalize="sentences"
      />
      <TextInput
        label="Notes"
        placeholder="Write your thoughts, reflections, or questions..."
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={12}
        autoCapitalize="sentences"
      />
      <Button label={isNew ? 'Save Note' : 'Update Note'} onPress={handleSave} loading={loading} fullWidth />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});
