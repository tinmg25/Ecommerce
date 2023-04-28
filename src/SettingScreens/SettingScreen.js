import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../config/themeContext";
import AwesomeAlert from "react-native-awesome-alerts";

const SettingScreen = ({ navigation }) => {

    const theme = useContext(themeContext);

    const [mode, setMode] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>Dark Mode</Text>
                <Switch
                    value={mode}
                    onValueChange={(value) => {
                        setMode(value);
                        EventRegister.emit("ChangeTheme", value);
                    }}
                />
            </View>
            <View style={[styles.sub_view, { borderBottomColor: theme.color }]}>
                <Text style={[styles.label, { color: theme.color }]}>Logout</Text>
                <TouchableOpacity
                    title="Logout"
                    onPress={() => setShowAlert(!showAlert)}
                >
                    <MaterialCommunityIcons name="logout" size={30} style={{ color: theme.color }} />
                </TouchableOpacity>
            </View>
            <AwesomeAlert
                show={showAlert}
                title="Logout"
                titleStyle={{color:'#04144F',fontSize:20}}
                message="Are you sure want to logout?"
                messageStyle={{color:'red'}}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}

                showCancelButton={true}
                cancelButtonStyle={{backgroundColor:'gray'}}
                cancelText="No"
                onCancelPressed={() => setShowAlert(false)}

                showConfirmButton={true}
                confirmButtonColor="#04144F"
                confirmText="Yes"
                onConfirmPressed={()=> navigation.navigate('Login')}
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
    }
});

export default SettingScreen;