import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../config/api';

export default function CreateTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please enter both title and description.');
      return;
    }

    try {
      await api.post('/tasks', { title, description });
      Alert.alert('Success', 'Task added successfully!');
      navigation.goBack(); // Return to HomeScreen
    } catch (error) {
      console.error('Error adding task:', error.message);
      Alert.alert('Error', 'Failed to add task.');
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
      <Button title="Add Task" onPress={handleAddTask} />
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
