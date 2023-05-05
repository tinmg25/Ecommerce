import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.sub_view}>
                <Text style={styles.header}>App Name</Text>
                <Text style={styles.label}>HL Ecommerce</Text>
            </View>
            <View style={styles.sub_view}>
                <Text style={styles.header}>Version</Text>
                <Text style={styles.label}>1.0.0</Text>
            </View>
            <View style={styles.sub_view}>
                <Text style={styles.header}>Description</Text>
                <Text style={styles.label}>Search Fast, Buy Smart</Text>
            </View>
            <View style={styles.sub_view}>
                <Text style={styles.header}>Contact</Text>
                <Text style={styles.label}>tinmgwai25@gmail.com</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sub_view:{
        borderBottomWidth:1,
    },
    header: {
        fontSize: 20,
        marginLeft: 10,
    },
    label: {
        fontSize: 15,
        marginLeft: 15,
        color: '#000',
        marginBottom:10,
    }
});

export default AboutScreen;