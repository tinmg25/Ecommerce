import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import themeContext from "../config/themeContext";
import AwesomeAlert from "react-native-awesome-alerts";
import { LanguageContext } from "../LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingScreen = ({ navigation }) => {

    const { translate } = useContext(LanguageContext);

    const theme = useContext(themeContext);

    const [mode, setMode] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const removeAsyncStorageItem = async (key) => {
        try{
            await AsyncStorage.removeItem(key);
        } catch(error){

        }
    }

    const handleLogout = async () => {
        await removeAsyncStorageItem('EMAIL');
        navigation.navigate('Login');
    }

    return (
        <View style={[styles.container]}>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>{translate('profile')}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                    <Image source={require('../images/profile.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>{translate('account_setting')}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                    <Image source={require('../images/user.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>{translate('help_support')}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Help')}>
                    <Image source={require('../images/question.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>{translate('about')}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <Image source={require('../images/info.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>{translate('logout')}</Text>
                <TouchableOpacity
                    title="Logout"
                    onPress={() => setShowAlert(!showAlert)}
                >
                    <Image source={require('../images/exit.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
            <AwesomeAlert
                show={showAlert}
                title={translate('logout')}
                titleStyle={{ color: '#04144F', fontSize: 30, fontWeight: '600', textDecorationLine: 'underline', }}
                message={translate('logout_message')}
                messageStyle={{ color: 'red', fontSize: 15, }}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showProgress={true}
                progressColor="red"
                progressSize={30}
                overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}

                showCancelButton={true}
                cancelButtonStyle={{ backgroundColor: 'gray', width: 70, }}
                cancelText="No"
                cancelButtonTextStyle={{ textAlign: 'center', fontSize: 15, }}
                onCancelPressed={() => setShowAlert(false)}

                showConfirmButton={true}
                confirmButtonStyle={{ backgroundColor: '#04144F', width: 70, }}
                confirmText="Yes"
                confirmButtonTextStyle={{ textAlign: 'center', fontSize: 15, }}
                onConfirmPressed={() => handleLogout()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sub_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
    },
    label: {
        fontSize: 20,
    },
    logo_img: {
        width: 30,
        height: 30,
    }
});

export default SettingScreen;