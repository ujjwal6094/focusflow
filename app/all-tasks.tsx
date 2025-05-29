import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AllTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("focusTasks").then(data => {
      if (data) setTasks(JSON.parse(data));
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">📋 All Focus Tasks</Text>
      <ScrollView>
        {tasks.map((task: any) => (
          <View
            key={task.id}
            className={`p-4 mb-2 rounded-xl ${task.completed ? "bg-green-200" : "bg-yellow-100"}`}
          >
            <Text className="text-lg text-black">{task.title}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
