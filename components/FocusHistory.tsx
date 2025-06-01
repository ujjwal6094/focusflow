import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const FocusHistory = () => {
  const [focusData, setFocusData] = useState<{ date: string; time: number;   }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem('focusHistory');
        if (stored) {
          setFocusData(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Error loading focus history', err);
      }
    };
    loadData();
  }, []);

  const chartData = {
    labels: focusData.map(item => item.date.slice(5)), // show MM-DD
    datasets: [{ data: focusData.map(item => item.time) }],
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="text-2xl font-bold mb-4 text-center">Focus History</Text>

      {focusData.length > 0 ? (
        <BarChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={250}
          yAxisSuffix="s"
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
            labelColor: () => '#555',
            style: { borderRadius: 16 },
          }}
          style={{ borderRadius: 16 }}
        />
      ) : (
        <Text className="text-center text-gray-500">No focus sessions yet.</Text>
      )}
    </ScrollView>
  );
};

export default FocusHistory;
