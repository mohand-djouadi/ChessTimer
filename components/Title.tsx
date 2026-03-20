import React from 'react';
import { Text, View } from 'react-native';

const Title = () => {
  return (
    <View className='flex flex-col justify-center items-center h-40 w-full'>
      <Text className='text-4xl'>Let's play</Text>
      <Text className='text-4xl text-primary'>Chess</Text>
    </View>
  )
}

export default Title