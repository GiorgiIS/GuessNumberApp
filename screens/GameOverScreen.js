import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={{ ...DefaultStyles.title, ...styles.title }}>The Game is Over!</Text>
                <View style={styles.imageContainer} >
                    {
                        // Difference between this two ways of importing images that in first case
                        // when we get image locally our application knows about its size and is faster also
                        // in second our app does not know about s
                    }
                    {/* <Image style={styles.image} source={require('../assets/success.png')} resizeMode='cover' /> */}
                    <Image
                        fadeDuration={500}
                        style={styles.image}
                        source={{ uri: 'https://i.redd.it/koa30a2ssdn21.jpg' }} />
                </View>
                <Text style={{ ...DefaultStyles.bodyText, ...styles.bodyText }}>
                    Computer guessed number
                <Text style={styles.highlight}> {props.numberToGuess} </Text> in
                <Text style={styles.highlight}> {props.numberOfRounds} </Text> tries
            </Text>
                <View style={styles.newGame}>
                    <MainButton onPress={props.newGame}> New Game </MainButton>
                </View>
            </View>
        </ScrollView>
    );
}

// this code runs only once in lifecycle
// so if I rotate screen that will change width and height
// I will not be able to know it from this code, because
// this code runs only when application starts.
// I have added log below to be sure.
// in order to have updated data about changing width or height
// for example when phone is rotated, I have to listen special event
// 'change' on Dimensions. The code is: Dimensions.addEventListener('change', updateLayout)
// updateLayout is some function that is called when dimensions changed.
// add this event listener in useEffect. but dont forget to 
// return () => {Dimensions.removeEventListener('change', updateLayout)} for cleaning purposes
// useEffect return function is called clean up function and is used to clean resourses created
// in useEffect, e.x. remove event listener, unsubscribe from something..
// its because not to subscribe multiple times on something because of useEffect runs after
// every render 
const screenHeight = Dimensions.get('window').height;

console.log(screenHeight);

const styles = StyleSheet.create({

    // flex is how number that determies what part of place should element cover
    // concreteFlex / sumOfFlexes is the part that element will cover.
    // here it will cover full screen, because there is only one element with
    // flex property, so 1 / 1 = 1
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        width: '100%',
        height: '100%',
    },

    // check screenHeight comment
    imageContainer: {
        width: screenHeight <= 350 ? 80 : screenHeight <= 550 ? 150 : 300,
        height: screenHeight <= 350 ? 80 : screenHeight <= 550 ? 150 : 300,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 20
    },

    highlight: {
        color: Colors.primary,
    },

    // check screenHeight comment
    newGame: {
        marginTop: screenHeight <= 350 ? 10 : 20,
        marginBottom: screenHeight <= 350 ? 10 : 20,
        borderRadius: 100
    },


    // check screenHeight comment
    title: {
        marginTop: screenHeight <= 350 ? 10 : 20,
    },

    bodyText: {
        fontSize: 15
    },
});

export default GameOverScreen;