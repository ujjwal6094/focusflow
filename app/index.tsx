import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white p-4 justify-center ">
      <Text className="text-6xl text-center font-bold mb-4 text-black">🎯 FocusFlow</Text>
      <Text className="text-xl text-gray-700 mb-6 text-center">Your daily focus companion.</Text>

      <View className="space-y-4 ">
        <Link href="/focus-history" asChild>
          <TouchableOpacity className="bg-blue-500 p-4 rounded-xl">
            <Text className="text-white text-center text-lg">🔍Focus History </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/focus-timer" asChild>
          <TouchableOpacity className="bg-green-500 p-4 rounded-xl">
            <Text className="text-white text-center text-lg">⏱️ Start Focus Session</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/all-tasks" asChild>
          <TouchableOpacity className="bg-purple-500 p-4 rounded-xl">
            <Text className="text-white text-center text-lg">📋 View All Tasks</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
