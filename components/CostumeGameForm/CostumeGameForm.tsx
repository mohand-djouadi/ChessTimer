import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

const CostumeGameForm = () => {
  const [whiteName, setWhiteName] = useState<string>("");
  const [blackName, setBlackName] = useState<string>("");
  const [whiteTime, setWhiteTime] = useState<number>(0);
  const [blackTime, setBlackTime] = useState<number>(0);

  const router = useRouter();

  const handleWhiteTimeChange = (time: string) => {
    if (time != "") {
      isNaN(parseInt(time))
        ? Alert.alert("enter only numeric")
        : setWhiteTime(parseInt(time));
    }
  };
  const handleBlackTimeChange = (time: string) => {
    if (time != "") {
      isNaN(parseInt(time))
        ? Alert.alert("enter only numeric")
        : setBlackTime(parseInt(time));
    }
  };

  const handleStartGame = () => {
    router.push({
      pathname: "/play",
      params: {
        whiteTime: whiteTime,
        blackTime: blackTime,
      },
    });
  };

  return (
    <View className="flex justify-center items-center">
      <View className="w-[90%] flex flex-row justify-around items-center border-primary border-2 rounded-full px-2 py-4 my-3">
        <TextInput
          className="border-b-secondary border-b-2 w-15"
          editable
          maxLength={40}
          placeholder="White player name"
          onChangeText={(text) => setWhiteName(text)}
          value={whiteName}
          testID="white-name-input"
        />
        <Text>White</Text>
        <TextInput
          className="border-b-secondary border-b-2 w-15"
          editable
          maxLength={40}
          placeholder="White time in min"
          onChangeText={(text) => handleWhiteTimeChange(text)}
          keyboardType="numeric"
          testID="white-time-input"
        />
      </View>
      <View className="w-[90%] flex flex-row justify-around items-center border-primary border-2 rounded-full px-2 py-4 my-3">
        <TextInput
          className="border-b-secondary border-b-2 w-15"
          editable
          maxLength={40}
          placeholder="Black player name"
          onChangeText={(text) => setBlackName(text)}
          value={blackName}
          testID="black-name-input"
        />
        <Text>Black</Text>
        <TextInput
          className="border-b-secondary border-b-2 w-15"
          editable
          maxLength={40}
          placeholder="Black time in min"
          onChangeText={(text) => handleBlackTimeChange(text)}
          keyboardType="numeric"
          testID="black-time-input"
        />
      </View>
      <TouchableOpacity
        onPress={handleStartGame}
        className="bg-primary w-[50%] h-[20%] rounded-full flex justify-center items-center my-7"
      >
        <Text>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CostumeGameForm;
