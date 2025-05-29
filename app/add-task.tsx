import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTask() {
  const [task, setTask] = useState("");

  const saveTask = async () => {
    if (!task.trim()) return Alert.alert("Please enter a task");

    const existing = JSON.parse(await AsyncStorage.getItem("focusTasks") || "[]");
    const updated = [...existing, { id: Date.now(), title: task, completed: false }];
    await AsyncStorage.setItem("focusTasks", JSON.stringify(updated));
    router.back(); // go back to home
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">Add a New Focus Task</Text>
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="e.g., Study React Native"
        className="border border-gray-300 p-3 rounded mb-4"
      />
      <Button title="Save Task" onPress={saveTask} />
    </SafeAreaView>
  );
}
