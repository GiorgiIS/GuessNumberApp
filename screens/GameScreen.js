import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';
import { Ionicons } from '@expo/vector-icons';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    }

    return randomNumber;
}

const renderListItem = (listLength, itemData) => (
    <View key={itemData.item} style={styles.listItem} >
        <Text style={DefaultStyles.bodyText}># {itemData.index + 1}</Text>
        <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
    </View>
);

const GameScreen = props => {

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);

    // 1. State hook, setCurrentGuess is method that sets state for currentGuess.
    // 2. useState(initialGuess) will be used only once, first time the component renders.
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [currentPasGuesses, setCurrentPasGuesses] = useState([initialGuess]);
    // saving device with in state, and will update when it changes. e.x. when screen rotates.
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);

    // Ref hook, can be used to store data, difference between Ref and State is
    // that when State is changed rerender happens, but when Ref does - nothing.
    const currentMin = useRef(1);
    const currentMax = useRef(100);

    const { userChoice, onGameOver } = props;



    // Effect hook, this is the function that will run after component render,
    // first parameter is function, that you want to run after componenet is rendered,
    // and second parameter is array of dependencies, variables on what useEffect depeneds
    // so if some of this variables change, useEffect will be called.
    // useEffect can return function, return function is called clean up function and is used to 
    // clean resourses created in useEffect, e.x. remove event listener, unsubscribe from something..
    // its because not to subscribe multiple times on something because of useEffect runs after every render 
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(currentPasGuesses.length);
        };
    }, [currentGuess, userChoice, onGameOver]);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height);
            setAvailableDeviceWidth(Dimensions.get('window').width);
        };

        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert(
                'Don\'t lie!',
                'You know that this is wrong...',
                [{ text: 'Pardon!', style: 'cancel' }]);

            return;
        }

        if (direction === 'lower') {
            currentMax.current = currentGuess;
        }
        else if (direction === 'greater') {
            currentMin.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentMin.current, currentMax.current, currentGuess);
        setCurrentGuess(nextNumber);

        // 1. When the new state is depended on previous one,
        //    passing like this is more safe than doing 
        //    directly setCurrentPasGuesses([nextNumber, ...currentPasGuesses]);
        //    because there may be bug, if state changes during this operation.
        //    But currently used syntax will guarantee that you have latest state.
        // 2. I use here nextNumber and not currentGuess from state, because the state is not updated yet.
        setCurrentPasGuesses(currentPasGuesses => [...currentPasGuesses, nextNumber]);
    }

    const height = availableDeviceHeight;

    // below is commented version of almost same code
    if (height < 500) {
        return (
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                    <View style={styles.controls}>
                        <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                            <Ionicons name="md-remove" size={25} color='white' />
                        </MainButton>
                        <NumberContainer>{currentGuess}</NumberContainer>
                        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={25} color='white' />
                        </MainButton>
                    </View>
                    <View style={styles.listContainer}>
                        <FlatList
                            contentContainerStyle={styles.list}
                            keyExtractor={(item) => item.toString()}
                            data={currentPasGuesses}
                            renderItem={renderListItem.bind(this, currentPasGuesses.length)} />
                    </View>
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <NumberContainer>{currentGuess}</NumberContainer>
                <Card style={styles.buttonContainer}>
                    {
                        // Using bind parameter will pass in function.
                        // e.x. 'lower' is function parameter that should be passsed
                    }
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                        <Ionicons name="md-remove" size={25} color='white' />
                    </MainButton>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={25} color='white' />
                    </MainButton>
                </Card>
                {
                    //It is better to wrap ScollView in View component to style without bugs
                }
                <View style={styles.listContainer}>
                    {
                        // contentContainerStyle in ScrollView is used not style, 
                        // to control content style inside the scrollview,
                        // same prop should be used on FlatList also.
                        // but style still can be used for example to control margin of this ScrollView or FlatList
                    }
                    {/* <ScrollView contentContainerStyle={styles.list}>
                    {currentPasGuesses.map((guess, index) => renderListItem(guess, index + 1))}
                </ScrollView> */}

                    {/* ScrolView renders all elements of array but FlatList renders only that are visible
                to user, thats why for performance in large lists FLatList is better than ScrollView*/}

                    <FlatList
                        contentContainerStyle={styles.list}
                        keyExtractor={(item) => item.toString()}
                        data={currentPasGuesses}
                        renderItem={renderListItem.bind(this, currentPasGuesses.length)} />
                    { /* renderListItem has second parameter also, it is passed by default from FlatList
                    as last parameter of function. And this parameter is wrapper of array element that
                    has two fields, index and item. index is the index of the element in array, and item
                    is element itself */}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },

    list: {
        // flexGrox is same as flex, plus additional logic for scrollview
        // not to overlap parent container. Simply use flexGrow if want
        // flex logic and you are in scrollview
        flexGrow: 1,
    },

    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '60%'
    }
});

export default GameScreen;