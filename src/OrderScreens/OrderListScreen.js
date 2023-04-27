import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    DrawerLayoutAndroid,
    TouchableOpacity
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderListScreen = ({ navigation }) => {


    return (
            <View>
                <View>
                    <Text>Ordre List Screen</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    drawerIcon: {
        alignSelf: 'flex-start',
        color: '#000000',
        padding: 10,
    },
    menuHead: {
        fontSize: 70,
        color: "#FFF",
        fontStyle: "italic",
        fontWeight: "bold",
        marginVertical: 20,
        backgroundColor: '#04144F',
        alignSelf: 'center',
        borderRadius: 20,
        padding: 10,
    },
    menuView: {
        flexDirection: 'row',
        backgroundColor: '#04144F',
        borderBottomWidth: 2,
        borderBottomColor: '#FFF',
    },
    menuIcon: {
        color: '#FFF',
        alignSelf: 'center',
    },
    menuItem: {
        fontSize: 20,
        color: '#FFF',
        padding: 10,
    },
});

export default OrderListScreen;