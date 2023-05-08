import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const HelpSupportScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>FAQs</Text>
            <View style={styles.border}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    title: {
        fontSize:30,
        color:'#000',
        textAlign:'center',
    },
    border: {
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginHorizontal:10,
    }
});

export default HelpSupportScreen;