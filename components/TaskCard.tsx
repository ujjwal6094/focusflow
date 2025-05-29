import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../types';

interface Props {
  task: Task;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: Props) {
  return (
    <View className="bg-blue-100 p-3 my-2 rounded-xl flex-row justify-between items-center">
      <View>
        <Text className="text-lg font-semibold">{task.text}</Text>
        <Text className="text-xs text-gray-500">{task.createdAt}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Text className="text-red-500 font-bold">✕</Text>
      </TouchableOpacity>
    </View>
  );
}
