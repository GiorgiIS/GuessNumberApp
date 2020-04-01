import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

const MainButton = props => {
    return (
        // create custom buttom, TouchableOpacity is area that can be touched
        // activeOpacity property determines how long effect will be
        // there are also other types of Touchable components.
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.text}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20
    },
    text: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
});

export default MainButton;