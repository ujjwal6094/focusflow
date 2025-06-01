import { Task } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';

import TaskCard from '../components/TaskCard';

// export interface Task {
//   id: string;
//   text: string;
//   completed: boolean;
//   timestamp: string;
//   createdAt : string;
// }

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const saved = await AsyncStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  };

  const saveTasks = async (updated: Task[]) => {
    await AsyncStorage.setItem('tasks', JSON.stringify(updated));
  };

  const addTask = () => {
    if (!text.trim()) return;
    const newTask: Task = {
      id: uuid.v4().toString(),
      text,
      completed: false,
      timestamp: new Date().toLocaleString(),
       createdAt: new Date().toISOString(),
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveTasks(updated);
    setText('');
  };

  const toggleComplete = (id: string) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">🎯 FocusFlow</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Add a new task"
        className="border p-3 rounded mb-3"
      />
      
      <TouchableOpacity onPress={addTask} className="bg-black py-2 rounded mb-4">
        <Text className="text-white text-center font-semibold">Add Task</Text>
      </TouchableOpacity>


      <View className="flex-row justify-around mb-4">
        <TouchableOpacity onPress={() => setFilter('all')}>
          <Text className={`font-semibold ${filter === 'all' ? 'text-blue-600' : 'text-gray-500'}`}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('completed')}>
          <Text className={`font-semibold ${filter === 'completed' ? 'text-green-600' : 'text-gray-500'}`}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('pending')}>
          <Text className={`font-semibold ${filter === 'pending' ? 'text-orange-500' : 'text-gray-500'}`}>Pending</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
