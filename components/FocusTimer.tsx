import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const FocusTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState<number>(25); // in minutes
  const [timeLeft, setTimeLeft] = useState<number>(duration * 60); // in seconds
  const [totalFocusTime, setTotalFocusTime] = useState(0);
   const intervalRef = useRef<number | null>(null);

  // Load total focus time on mount
  useEffect(() => {
    const loadTotal = async () => {
      const stored = await AsyncStorage.getItem('totalFocusTime');
      if (stored) setTotalFocusTime(parseInt(stored));
    };
    loadTotal();
  }, []);

  // Reset timeLeft when duration changes (before timer starts)
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(duration * 60);
    }
  }, [duration]);

  // Countdown logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(intervalRef.current!);
      setIsActive(false);
      saveFocusTime(duration * 60); // full session
    }

    return () => clearInterval(intervalRef.current!);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    if (isActive) {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      setIsActive(false);
      saveFocusTime(duration * 60 - timeLeft); // save what’s completed
    } else {
      setIsActive(true);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setIsActive(false);
    setTimeLeft(duration * 60);
  };

  const saveFocusTime = async (sessionTime: number) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const stored = await AsyncStorage.getItem('focusHistory');
      let history = stored ? JSON.parse(stored) : [];

      const existing = history.find((item: any) => item.date === today);
      if (existing) {
        existing.time += sessionTime;
      } else {
        history.push({ date: today, time: sessionTime });
      }

      await AsyncStorage.setItem('focusHistory', JSON.stringify(history));
      setTotalFocusTime((prev) => prev + sessionTime);
      await AsyncStorage.setItem(
        'totalFocusTime',
        (totalFocusTime + sessionTime).toString()
      );
    } catch (error) {
      console.error('Failed to save focus time:', error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="text-4xl font-bold text-gray-800 mb-6">Focus Timer</Text>

      {!isActive && (
        <TextInput
          className="border border-gray-400 rounded px-4 py-2 mb-4 w-40 text-center text-lg"
          keyboardType="numeric"
          value={duration.toString()}
          onChangeText={(text) => {
            const mins = parseInt(text) || 0;
            setDuration(mins);
          }}
        />
      )}

      <Text className="text-6xl font-mono text-blue-600">
        {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
        {String(timeLeft % 60).padStart(2, '0')}
      </Text>

      <Text className="text-lg text-gray-600 mt-4">
        Total Focused Time: {totalFocusTime}s
      </Text>

      <View className="flex-row gap-4 mt-6">
        <TouchableOpacity
          onPress={toggleTimer}
          className="bg-blue-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold text-lg">
            {isActive ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={resetTimer}
          className="bg-red-500 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold text-lg">Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FocusTimer;
