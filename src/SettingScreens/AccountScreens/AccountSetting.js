import React, { useState, useContext } from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from '../../config/themeContext';

const AccountSettingScreen = () => {

    const theme = useContext(themeContext);

    const [mode, setMode] = useState(false);

  return (
    <View>
      <View style={[styles.sub_view, {borderBottomColor: theme.color}]}>
        <Text style={[styles.label, {color: theme.color}]}>Dark Mode</Text>
        <Switch
          value={mode}
          onValueChange={value => {
            setMode(value);
            EventRegister.emit('ChangeTheme', value);
          }}
        />
      </View>
    </View>
  );
};

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
});

export default AccountSettingScreen;
