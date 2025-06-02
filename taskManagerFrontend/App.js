import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import UpdateTaskScreen from './src/screens/UpdateTaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} options={{ title: 'Add New Task' }} />
        <Stack.Screen name="UpdateTask" component={UpdateTaskScreen} options={{ title: 'Edit Task' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
