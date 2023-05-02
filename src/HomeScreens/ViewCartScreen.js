import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewCartScreen = ({ navigation }) => {

    // const { productId,productName,productPrice,productDesc} = route.params;

    const [count, setCount] = useState(1);

    const increment = () => {
        setCount( count + 1);
    }

    const decrement = () => {
        if(count<=1){
            setCount(1);
        } else{
            setCount( count - 1);
        }
    }
    
    return (
        <View>
            <View style={styles.main_view}>
                <View>
                    <Text>Image</Text>
                    <Text style={styles.title}></Text>
                    <Text style={styles.price}>Price : $</Text>
                </View>
                <View style={styles.view2}>
                    <TouchableOpacity onPress={()=>decrement()}>
                        <MaterialCommunityIcons name='minus-box' size={30} />
                    </TouchableOpacity>
                    <Text style={styles.count}>{count}</Text>
                    <TouchableOpacity onPress={increment}>
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