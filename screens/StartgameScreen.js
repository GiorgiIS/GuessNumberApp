import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert

} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = (inputText) => {
        // Replace string using regex, this statement will find all
        // non number symbols and replace it with empty string
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
        setConfirmed(false);
    };

    const resetInputHandler = () => {
        setEnteredValue('');
    };

    const confirmInputHandler = () => {

        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            // React native has api to interact with phone,
            // for example this statement will throw alert on phone
            Alert.alert(
                'Invalid number',
                'Number has to be a number between 1 and 99.',
                [{ text: 'Ok, Sorry', style: 'destructive', onPress: resetInputHandler }])
            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');

        // React native has api to interact with phone,
        // for example this statement will dismiss keyboard
        Keyboard.dismiss();
    };

    let confirmedOutput = undefined;

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}> Start Game</MainButton>
            </Card>
    }

    return (
        
        // Entire view is wrapped in TouchableWithoutFeedback component,
        // that has one job, to determine touch but dont give any visual feedback
        // we use it just to dismiss keyboard 
        
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input
                        value={enteredValue}
                        onChangeText={numberInputHandler}
                        style={styles.input}
                        blurOnSubmit
                        keyboardType='number-pad'
                        maxLength={2} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title='Reset' color={Colors.accent} onPress={resetInputHandler} /></View>
                        <View style={styles.button}><Button title='Confirm' color={Colors.primary} onPress={confirmInputHandler} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 10,
        alignItems: "center",
    },

    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },

    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    button: {
        width: 80
    },

    input: {
        width: 50,
        textAlign: 'center'
    },

    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;