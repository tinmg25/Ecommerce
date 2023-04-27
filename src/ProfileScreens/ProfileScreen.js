import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from '../config/themeContext';

const ProfileScreen = () => {

    const theme = useContext(themeContext);

    return (
        <View style={[styles.container,{backgroundColor: theme.background}]}>
            <MaterialCommunityIcons style={[styles.user_icon,{backgroundColor: theme.background}]} name='account' size={150}/>
            <View style={styles.profile_view}>
                <Text style={[styles.label,{backgroundColor: theme.background}]}>Name</Text>
                <Text style={[styles.label,{backgroundColor: theme.background}]}>Email</Text>
                <Text style={[styles.label,{backgroundColor: theme.background}]}>Address</Text>
                <Text style={[styles.label,{backgroundColor: theme.background}]}>Phone No.</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.edit_btn}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.change_pwd_btn}>Change Password</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        color: '#000',
        alignSelf: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    profile_view: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    label: {
        fontSize: 20,
        marginVertical: 10,
        color:'#000',
    },
    edit_btn: {
        alignSelf:'center',
        width: 250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#04144F',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
        marginVertical: 10,
    },
    change_pwd_btn: {
        alignSelf:'center',
        width: 250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#04144F',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
        marginVertical: 10,
    },
    user_icon: {
        alignSelf:'center',
        color: '#000',
    }
})

export default ProfileScreen;