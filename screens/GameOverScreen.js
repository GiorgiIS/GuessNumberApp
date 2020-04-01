import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>The Game is Over!</Text>
            <View style={styles.imageContainer} >
                {
                    // Difference between this two ways of importing images that in first case
                    // when we get image locally our application knows about its size and is faster also
                    // in second our app does not know about s
                }
                {/* <Image style={styles.image} source={require('../assets/success.png')} resizeMode='cover' /> */}
                <Image
                    fadeDuration={1000}
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
    );
}

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

    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 20
    },

    highlight: {
        color: Colors.primary,
    },

    newGame: {
        marginTop: 20,
        borderRadius: 100
    },

    bodyText: {
        fontSize: 15
    }
});

export default GameOverScreen;