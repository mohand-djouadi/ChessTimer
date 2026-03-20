import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const play = () => {

  const { whiteTime, blackTime } = useLocalSearchParams()

  const [start, setStart] = useState<boolean>(false)
  const [whiteSeconds, setWhiteSeconds] = useState<number>(Number(whiteTime) * 60)
  const [blackSeconds, setBlackSeconds] = useState<number>(Number(blackTime) * 60)
  const [turn, setTurn] = useState<'WHITE' | 'BLACK'>('WHITE')
  const [whiteDraw, setWhiteDraw] = useState<boolean>(false)
  const [blackDraw, setBlackDraw] = useState<boolean>(false)
  const [resign, setResign] = useState<'WHITE' | 'BLACK' | null >(null)
  const [winner, setWinner] = useState<'WHITE' | 'BLACK' | null >(null)
  const [checkMated, setCheckMated] = useState<'WHITE' | 'BLACK' | null >(null)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [gameEndState, setGameEndState] = useState<string>("")

  useEffect(() => {
    let interval: number = 0
    if (start && !gameOver) {
      switch (turn) {
        case "WHITE": 
          interval = setInterval(() => {
            setWhiteSeconds((prevSeconds) => prevSeconds - 1);
          }, 1000);
          break;
        case "BLACK":
          interval = setInterval(() => {
            setBlackSeconds((prevSeconds) => prevSeconds - 1);
          }, 1000);
          break
      }
    } 
    return () => clearInterval(interval);
  }, [start, turn, whiteSeconds, blackSeconds])

  useEffect(() => {
    if (gameOver) return
    if (whiteDraw && blackDraw) {
      setGameOver(true)
      setGameEndState("Draw")
    } else if (resign == 'BLACK') {
      setGameOver(true)
      setWinner('WHITE')
      setGameEndState('White win by resign')
    } else if (resign == 'WHITE') {
      setGameOver(true)
      setWinner('BLACK')
      setGameEndState('Black win by resign')
    } else if (checkMated) {
      setGameOver(true)
      checkMated == 'WHITE' ? setWinner('BLACK') : setWinner('WHITE')
      checkMated == 'WHITE' ? setGameEndState('Black win by check mate') : setGameEndState('White win by check mate')
    } else if (turn == 'BLACK' && blackSeconds == 0) {
      setGameOver(true)
      setWinner('WHITE')
      setGameEndState('White win by timeout')
    } else if (turn == 'WHITE' && whiteSeconds == 0) {
      setGameOver(true)
      setWinner('BLACK')
      setGameEndState('Black win by timeout')
    }
  }, [whiteDraw, blackDraw, winner, resign, turn, checkMated, whiteSeconds, blackDraw])


  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60)
    const remainsSeconds = secs % 60
    return `${minutes}:${remainsSeconds < 10 ? '0' : ''}${remainsSeconds}`
  }

  return (
    <SafeAreaView>
      <Pressable className='bg-[#616161] h-[50vh] flex flex-row justify-around justify-center items-center pl-10'
        onPress={() => setTurn('WHITE')}
      >
        <View className='flex flex-col-reverse justify-center items-center'>
          <Pressable
            onPress={() => setBlackDraw(true)}
          >
            <FontAwesome className='py-5 rotate-180' name="hand-stop-o" size={50} color="white" />
          </Pressable>
          <Pressable
            onPress={() => setResign('BLACK')}
          >
            <FontAwesome6 className='py-5 rotate-180' name="flag" size={50} color="white" />
          </Pressable>
          <Pressable
            onPress={() => setCheckMated('WHITE')}
          >
            <FontAwesome6 className='py-5 rotate-180' name="chess-king" size={50} color="red" />
          </Pressable>
        </View>
        <Text
          className='text-white text-9xl rotate-90'
        >
          { formatTime(blackSeconds) }
        </Text>
      </Pressable>
      {
        (!start) && (
          <TouchableOpacity 
            onPress={() => setStart(true)}
            className='absolute top-[47%] left-[25%] bg-primary p-10 flex justify-center items-center z-10 w-[50%] rounded-full'
          >
            <Text className='text-white font-bold text-3xl'>Start</Text>
          </TouchableOpacity>
        )
      }
      {gameOver && (
        <View className="absolute inset-0 bg-black/70 flex justify-center items-center z-50">
          <View className="bg-white p-8 rounded-2xl items-center w-[80%]">
            <Text className="text-2xl font-bold mb-2">GAME OVER</Text>
            <Text className="text-lg text-gray-600 mb-6 text-center">{gameEndState}</Text>
            <TouchableOpacity 
              className="bg-primary px-10 py-3 rounded-full"
            >
              <Link 
                href={{ pathname: '/(tabs)' }}
              >
                <Text className="text-white font-bold">Home</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Pressable className='bg-white h-[50vh] flex flex-row justify-around items-center pl-10'
        onPress={() => setTurn('BLACK')}
      >
        <View className='flex justify-center items-center'>
          <Pressable
            onPress={() => setWhiteDraw(true)}
          >
            <FontAwesome className='py-5' name="hand-stop-o" size={50} color="black" />
          </Pressable>
          <Pressable
            onPress={() => setResign('WHITE')}
          >
            <FontAwesome6 className='py-5' name="flag" size={50} color="black" />
          </Pressable>
          <Pressable
            onPress={() => setCheckMated('BLACK')}
          >
            <FontAwesome6 className='py-5' name="chess-king" size={50} color="red" />
          </Pressable>
        </View>
        <Text
          className='text-black text-9xl rotate-90'
        >
          { formatTime(whiteSeconds) }
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default play