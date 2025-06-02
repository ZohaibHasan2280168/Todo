import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, RefreshControl } from 'react-native';
import api from '../config/api';
import TaskItem from '../components/TaskItem';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchTasks);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button title="Add Task" onPress={() => navigation.navigate('CreateTask')} />
      {tasks.length === 0 ? (
        <Text style={styles.noTaskText}>No tasks available.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem task={item} onRefresh={fetchTasks} navigation={navigation} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noTaskText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});
