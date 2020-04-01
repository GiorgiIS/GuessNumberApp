import { StyleSheet } from 'react-native';

// This fonts are not default,
// but they are imported in App.js
// Styles don't cascade on child Views but they do if componnet is Text
// e.x. If I have View inside another View, and I put font on parent View
// child View want inherit it, but if there is Text component instead of Views
// child View will also inherit it.
export default StyleSheet.create({
    bodyText: {
        fontFamily: 'open-sans'
    },

    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
});