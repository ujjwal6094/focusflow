import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import TaskCard from '../components/TaskCard';
import { Task } from '../types';
import { loadTasks, saveTasks } from '../utils/storage';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    loadTasks().then(setTasks);
  }, []);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = {
      id: uuid.v4().toString(),
      text: input.trim(),
      createdAt: new Date().toLocaleString(),
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveTasks(updated);
    setInput('');
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-white mt-10">
      <Text className="text-3xl font-bold mb-4 text-center">🧠 FocusFlow</Text>
      <View className="flex-row mb-4">
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Enter your focus task..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={addTask} className="bg-blue-500 ml-2 px-4 rounded-lg justify-center">
          <Text className="text-white font-semibold">Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onDelete={deleteTask} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
