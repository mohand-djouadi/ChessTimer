import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tabs 
        screenOptions={{ 
            headerShown: false, 
            tabBarActiveTintColor: "#54A288",
            tabBarStyle: {
                borderTopWidth: 1,
                borderTopColor: "#0000000",
                height: 60 + insets.bottom,
                paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 10,
                paddingTop: 10
            },
            tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: "600"
            }
        }}
    >
        <Tabs.Screen name='index' 
          options={{ 
            title: "Play",
            tabBarIcon: ({ color }) => <FontAwesome5 name="chess-queen" size={24} color={color} />,
            
          }} 
        />
        <Tabs.Screen name='history' 
          options={{ 
            title: "History",
            tabBarIcon: ({ color }) => <FontAwesome name="history" size={24} color={color} />
          }} 
        />
    </Tabs>
  )
}

export default TabsLayout