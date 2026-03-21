import { Game } from "@/constants/StandarGames";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const StandardChoiceItem = ({ name, time, image }: Game) => {
  return (
    <Link
      href={{
        pathname: "/play",
        params: {
          whiteTime: time,
          blackTime: time,
        },
      }}
      className="my-2"
    >
      <View className="border-4 border-primary rounded-3xl px-4 py-2 w-[90%] flex flex-row justify-around items-center mt-4">
        <Image source={image} role="img" />
        <View className="flex flex-col justify-center items-center">
          <Text className="text-3xl">{name}</Text>
          <Text className="text-2xl text-secondary">{time} min </Text>
        </View>
      </View>
    </Link>
  );
};

export default StandardChoiceItem;
