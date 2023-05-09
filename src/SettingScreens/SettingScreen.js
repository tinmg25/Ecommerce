import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import themeContext from "../config/themeContext";
import AwesomeAlert from "react-native-awesome-alerts";

const SettingScreen = ({ navigation }) => {

    const theme = useContext(themeContext);

    const [mode, setMode] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    return (
        <View style={[styles.container]}>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>Profile Setting</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../images/profile.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>Account Setting</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                    <Image source={require('../images/user.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>Notification</Text>
                <TouchableOpacity>
                    <Image source={require('../images/noti.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>Help & Support</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Help')}>
                    <Image source={require('../images/question.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>About</Text>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <Image source={require('../images/info.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>Logout</Text>
                <TouchableOpacity
                    title="Logout"
                    onPress={() => setShowAlert(!showAlert)}
                >
                    <Image source={require('../images/exit.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
            <AwesomeAlert
                show={showAlert}
                title="Logout"
                titleStyle={{ color: '#04144F', fontSize: 30, fontWeight: '600', textDecorationLine: 'underline', }}
                message="Are you sure want to logout?"
                messageStyle={{ color: 'red', fontSize: 20, }}
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
                onConfirmPressed={() => navigation.navigate('Login')}
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