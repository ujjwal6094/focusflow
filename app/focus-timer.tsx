import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FocusTimer() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">⏱️ Focus Timer Screen</Text>
      <Text className="text-gray-500">Coming tomorrow...</Text>
    </SafeAreaView>
  );
}
