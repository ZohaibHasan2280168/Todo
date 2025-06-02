import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../config/api';

export default function UpdateTaskScreen({ route, navigation }) {
  const { task } = route.params;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }

    try {
      await api.put(`/tasks/${task.id}`, {
        title,
        description,
      });
      Alert.alert('Success', 'Task updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating task:', error.message);
      Alert.alert('Error', 'Failed to update task.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Task Description"
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Update Task" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
