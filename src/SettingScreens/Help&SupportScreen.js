import React, { useContext } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { LanguageContext } from "../LanguageContext";

const HelpSupportScreen = () => {

    const { translate } = useContext(LanguageContext);
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{translate('faq')}</Text>
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