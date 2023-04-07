import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewCartScreen = ({navigation}) => {
    return (
        <View>
            <View style={styles.main_view}>
                <View>
                    <Image
                        style={styles.image}
                        source={require('../images/laptop1.png')}
                        resizeMode="center" />
                    <Text style={styles.title}>ASUS Vivobook S15 S530</Text>
                    <Text style={styles.price}>Price :</Text>
                </View>
                <View style={styles.view2}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='minus-box' size={30} />
                    </TouchableOpacity>
                    <Text style={styles.count}>1</Text>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='plus-box' size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.horizontal_line}></View>
            <View style={styles.button_view}>
                <TouchableOpacity onPress={()=>navigation.navigate('Checkout')}>
                    <Text style={styles.button}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main_view: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    view1: {

    },
    view2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    title: {
        fontSize: 15,
        color: 'black',
    },
    price: {
        fontSize: 15,
        color: 'black',
    },
    count: {
        fontSize: 15,
        marginHorizontal: 15,
    },
    horizontal_line: {
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal:15,
        marginVertical:10,
    },
    button_view: {
        alignItems:'center',
    },
    button: {
        width:250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#04144F',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
        marginBottom:10,
    }
})

export default ViewCartScreen;