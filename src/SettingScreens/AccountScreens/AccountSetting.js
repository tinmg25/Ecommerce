import React, { useState, useContext } from 'react';
import {View, Text, StyleSheet, Switch, Button } from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from '../../config/themeContext';
import { LanguageContext } from '../../LanguageContext';

const AccountSettingScreen = () => {

    const { language, translate, changeLanguage } = useContext(LanguageContext);

    const handleLanguageChange = () => {
      const newLanguage = language === 'en' ? 'jp' : 'en';
      changeLanguage(newLanguage);
    }

    const theme = useContext(themeContext);

    const [mode, setMode] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.sub_view, {borderBottomColor: theme.color}]}>
        <Text style={[styles.label, {color: theme.color}]}>{translate('dark_mode')}</Text>
        <Switch
          value={mode}
          onValueChange={value => {
            setMode(value);
            EventRegister.emit('ChangeTheme', value);
          }}
        />
      </View>
      <View style={styles.sub_view}>
        <Text style={[styles.label, {color: theme.color}]}>{translate('language')}</Text>
        <Button title={translate('setting')} onPress={handleLanguageChange}/>
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
    alignItems:'center'
  },
  label: {
    fontSize: 20,
  },
});

export default AccountSettingScreen;
