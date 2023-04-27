import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, useColorScheme, Switch } from 'react-native';
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../config/themeContext";

const SettingScreen = () => {

    const theme = useContext(themeContext);

    const [mode, setMode] = useState(false);

    return (
        <View style={[styles.container,{backgroundColor: theme.background}]}>
            <Text style={[styles.text,{color: theme.color}]}>Dark Mode</Text>
            <Switch
                value={mode}
                onValueChange={(value) => {
                    setMode(value);
                    EventRegister.emit("changeTheme", mode);
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
});

export default SettingScreen;