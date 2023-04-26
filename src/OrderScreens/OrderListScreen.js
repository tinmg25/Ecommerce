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

    const drawer = useRef(null);

    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
            <Text style={styles.menuHead}>HL</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Product')}>
                <View style={styles.menuView}>
                    <MaterialCommunityIcons style={styles.menuIcon} name="home" size={30} />
                    <Text style={styles.menuItem}>Home</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('OrderList')}>
                <View style={styles.menuView}>
                    <MaterialCommunityIcons style={styles.menuIcon} name="view-list" size={30} />
                    <Text style={styles.menuItem}>Order List</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.menuView}>
                <MaterialCommunityIcons style={styles.menuIcon} name="account" size={30} />
                <Text style={styles.menuItem}>Profile</Text>
            </View>
            <View style={styles.menuView}>
                <MaterialCommunityIcons style={styles.menuIcon} name="cog" size={30} />
                <Text style={styles.menuItem}>Setting</Text>
            </View>
        </View>
    );

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerPosition='left'
            drawerWidth={300}
            renderNavigationView={navigationView}>
            <View>
                <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
                    <MaterialCommunityIcons style={styles.drawerIcon} name="menu" size={30} />
                </TouchableOpacity>
                <View>
                    <Text>Ordre List Screen</Text>
                </View>
            </View>
        </DrawerLayoutAndroid>
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