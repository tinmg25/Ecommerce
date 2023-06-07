import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import themeContext from '../../config/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageContext } from '../../LanguageContext';
import { API_KEY } from '../../common/APIKey';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

const ProfileScreen = ({ navigation }) => {

    const { translate } = useContext(LanguageContext);

    const [userData, setUserData] = useState(null);
    const theme = useContext(themeContext);

    useEffect(() => {
        // const getData = async () => {
        //     try {
        //         const mEmail = await AsyncStorage.getItem('EMAIL');
        //         if (mEmail !== null) {
        //             const response = await fetch(`${API_KEY}/api/users/${mEmail}`, {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify({ mEmail })
        //             });
        //             const data = await response.json();
        //             setUserData(data);
        //         }
        //     }
        //     catch (e) {
        //     }
        // };
        // getData();

        const getFirestoreData = async () => {
            try {
                const mEmail = await AsyncStorage.getItem('EMAIL');
                if (mEmail) {
                    const userRef = query(collection(db,"user_mst"));
                    const userDataQuery = query(userRef, where("email", "==", mEmail));
                    const userSnapshot = await getDocs(userDataQuery);

                    if (userSnapshot.docs.length > 0) {
                        const user = userSnapshot.docs[0].data();
                        setUserData(user);
                    }
                } else {
                    console.log('Something went wrong');
                }
            } catch (error) {
                console.error('Error fetching firestore', error);
            }
        }

        getFirestoreData();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <MaterialCommunityIcons style={[styles.user_icon, { color: theme.color }]} name='account' size={150} />
            <View style={[styles.profile_view, { borderColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>{translate('p_name')} : {userData && userData.name}</Text>
                <Text style={[styles.label, { color: theme.color }]}>{translate('p_email')} : {userData && userData.email}</Text>
                <Text style={[styles.label, { color: theme.color }]}>{translate('p_address')} : {userData && userData.address}</Text>
                <Text style={[styles.label, { color: theme.color }]}>{translate('p_phone')} : {userData && userData.phone}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { userData })}>
                <Text style={styles.edit_btn}>{translate('edit')}</Text>
            </TouchableOpacity>
            <View style={styles.order_view}>
                <Text style={styles.order_text}>{translate('my_order')}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('OrderLists')}>
                    <Image source={require('../../images/orderlist.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

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
    user_icon: {
        alignSelf: 'center',
        color: '#000',
    },
    order_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 10,
    },
    order_text: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    logo_img: {
        width: 30,
        height: 30,
    },
})

export default ProfileScreen;