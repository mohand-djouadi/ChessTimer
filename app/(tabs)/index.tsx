import CostumeGameForm from "@/components/CostumeGameForm/CostumeGameForm";
import StandardChoiceItem from "@/components/StandardChoiceItem/StandardChoiceItem";
import Title from "@/components/Title/Title";
import { games } from "@/constants/StandarGames";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [standardGame, setStandardGame] = useState(true);

  return (
    <SafeAreaView>
      <Title />
      <View className="flex justify-between h-[70%]">
        <View className="flex flex-row justify-around items-center">
          <Pressable onPress={() => setStandardGame(true)}>
            {/* <Text className='text-2xl'>Standard</Text> */}
            <Text
              className={
                standardGame ? "text-primary text-2xl" : "text-black text-2xl"
              }
            >
              Standart
            </Text>
          </Pressable>
          <Pressable onPress={() => setStandardGame(false)}>
            <Text
              className={
                !standardGame ? "text-primary text-2xl" : "text-black text-2xl"
              }
            >
              Costume
            </Text>
          </Pressable>
        </View>
        {standardGame ? (
          <View className="flex justify-center pl-10 items-center w-full">
            <FlatList
              data={games}
              renderItem={({ item }) => (
                <StandardChoiceItem
                  name={item.name}
                  time={item.time}
                  image={item.image}
                />
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        ) : (
          <View>
            <CostumeGameForm />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Index;
