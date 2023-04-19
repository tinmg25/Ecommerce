import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    Image,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

const data = [
    {
        id: 1, name: 'Laptop',
        items: [
            { id: 1, source: require('../images/laptop1.png') },
            { id: 2, source: require('../images/laptop2.png') },
            { id: 3, source: require('../images/laptop3.png') },
        ]
    },
    {
        id: 2, name: 'Phone',
        items: [
            { id: 1, source: require('../images/phone1.png') },
            { id: 2, source: require('../images/phone2.png') },
        ]
    },
    {
        id: 3, name: 'Backpack',
        items: [
            { id: 1, source: require('../images/bp1.png') },
            { id: 2, source: require('../images/bp2.png') },
        ]
    },
]

const ProductScreen = ({ navigation }) => {

    const [category, setCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [categoryItems, setCategoryItems] = useState([
        { label: 'Laptop', value: 'laptop' },
        { label: 'Phone', value: 'phone' },
        { label: 'Backpack', value: 'backpack' },
    ]);

    const [brand, setBrand] = useState(false);
    const [brandValue, setBrandValue] = useState(null);
    const [brandItems, setBrandItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Samsung', value: 'samsung' },
        { label: 'Xiaomi', value: 'xiaomi' },
    ]);

    const renderItem = ({ item }) => (
        <View>
            <Text style={styles.product_title}>{item.name}</Text>
            <FlatList
                data={item.items}
                renderItem={({ item }) => (
                    <View style={styles.image_view}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail')}>
                            <Image
                                source={item.source}
                                style={styles.image}
                                resizeMode="center" />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    useEffect(() => {
        ToastAndroid.show('Login Successful',ToastAndroid.SHORT)
    })

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <MaterialCommunityIcons style={styles.iconStyle} name="magnify" size={30} />
                <TextInput
                    style={styles.inputStyle}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='Search' />
            </View>
            <View style={styles.view2}>
                <View style={{ width: 150, position: 'relative', zIndex: 1, elevation: 1, }}>
                    <DropDownPicker
                        style={{ zIndex: 2, elevation: 2 }}
                        open={category}
                        value={categoryValue}
                        items={categoryItems}
                        setOpen={setCategory}
                        setValue={setCategoryValue}
                        setItems={setCategoryItems}
                        placeholder='Category'
                    />
                </View>
                <View style={{ width: 150, }}>
                    <DropDownPicker
                        open={brand}
                        value={brandValue}
                        items={brandItems}
                        setOpen={setBrand}
                        setValue={setBrandValue}
                        setItems={setBrandItems}
                        placeholder='Brand'
                    />
                </View>
            </View>
            <View style={styles.view3}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    onRefresh={() => { }}
                    refreshing={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '',
    },
    searchBar: {
        marginTop: 10,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 50,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    },
    view2: {
        flexDirection: 'row',
        marginHorizontal: 15,
        justifyContent: 'space-around',
        position: 'relative',
        zIndex: 1,
        elevation: 1,
    },
    view3: {
        height: 500,
        marginHorizontal: 15,
        marginTop: 10,
    },
    product_title: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
    },
    image_view: {
        padding: 15,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
});

export default ProductScreen;