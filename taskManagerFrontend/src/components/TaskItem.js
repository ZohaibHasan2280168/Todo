import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import api from '../config/api';

export default function TaskItem({ task, onRefresh, navigation }) {
  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      onRefresh();
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.desc}>{task.description}</Text>
      <View style={styles.actions}>
        <Button title="Edit" onPress={() => navigation.navigate('UpdateTask', { task })} />
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f4f4f4',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  desc: {
    marginVertical: 4,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
