import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartgameScreen from './screens/StartgameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


// Here is syntax to load fonts, after what we can use them in stylesheet
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  // AppLoading is expo component that is used to load data
  // it takes promise as argument and can handle finish or error cases
  // here we wait for fonts to be loaded and only after loading we continue process

  if (!dataLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={(err) => console.log(err)} />
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRound(0);
  }

  const gameOverHandler = numberOfRounds => {
    setGuessRound(numberOfRounds);
  }

  const newGameHandler = () => {
    setGuessRound(0);
    setUserNumber(undefined);
  }

  let content = <StartgameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRound <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  }
  else if (guessRound > 0) {
    content = <GameOverScreen numberOfRounds={guessRound} numberToGuess={userNumber} newGame={newGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title='Guess a number' />
      {content}
    </View>
  );
}

// StyleSheet.Create() is method that does nothing right now, just returning passed object,
// but in future may do something. It is react nativies feature, thats why I use it.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
