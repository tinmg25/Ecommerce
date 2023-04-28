import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderListScreen = ({ navigation }) => {


    return (
        <View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('OrderDetails')}>
                    <Text style={styles.label}>Order Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        alignSelf:'center',
        justifyContent:'center',
        fontSize:50,
        color:'#000',
    }
});

export default OrderListScreen;