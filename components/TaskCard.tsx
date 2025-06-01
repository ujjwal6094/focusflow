import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../types';

interface Props {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggleComplete, onDelete }: Props) {
  return (
    <View className={`p-4 mb-3 rounded-xl ${task.completed ? 'bg-green-200' : 'bg-yellow-100'}`}>
      <View className="flex-row justify-between items-center">
        <Text className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-600' : 'text-black'}`}>
          {task.text}
        </Text>
        <View className="flex-row gap-4">
          <TouchableOpacity onPress={() => onToggleComplete(task.id)}>
            <Ionicons name={task.completed ? 'checkmark-circle' : 'ellipse-outline'} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(task.id)}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
