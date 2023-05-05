import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from '../../config/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {

    const [userData, setUserData] = useState(null);
    const theme = useContext(themeContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const mEmail = await AsyncStorage.getItem('EMAIL');
                if (mEmail !== null) {
                    const response = await fetch(`http://192.168.64.54:8087/api/${mEmail}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ mEmail })
                    });
                    const data = await response.json();
                    setUserData(data);
                    console.log(data);
                }
            }
            catch (e) {
            }
        };
        getData();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <MaterialCommunityIcons style={[styles.user_icon, { color: theme.color }]} name='account' size={150} />
            <View style={[styles.profile_view, { borderColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>Name : {userData && userData.name}</Text>
                <Text style={[styles.label, { color: theme.color }]}>Email : {userData && userData.email}</Text>
                <Text style={[styles.label, { color: theme.color }]}>Address : {userData && userData.address}</Text>
                <Text style={[styles.label, { color: theme.color }]}>Phone No. : {userData && userData.phone_number}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.edit_btn}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
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
        color: '#000',
    },
    edit_btn: {
        alignSelf: 'center',
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
        alignSelf: 'center',
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
        alignSelf: 'center',
        color: '#000',
    }
})

export default ProfileScreen;