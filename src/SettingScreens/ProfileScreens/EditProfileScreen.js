import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../../config/theme";

const EditProfileScreen = ({ navigation }) => {
    return(
        <View>
            <MaterialCommunityIcons style={[styles.user_icon, { color: theme.color }]} name='account' size={150} />
            <Text>Name</Text>
            <Text>Email</Text>
            <Text>Address</Text>
            <Text>Phone No.</Text>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default EditProfileScreen;