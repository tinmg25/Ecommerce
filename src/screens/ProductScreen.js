import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

// const data = [
//     {
//         id: 1, name: 'Laptop',
//         items: [
//             { id: 1, name: 'asus', source: require('../images/laptop1.png') },
//             { id: 2, name: 'dell', source: require('../images/laptop2.png') },
//             { id: 3, name: 'hp', source: require('../images/laptop3.png') },
//         ]
//     },
//     {
//         id: 2, name: 'Phone',
//         items: [
//             { id: 1, source: require('../images/phone1.png') },
//             { id: 2, source: require('../images/phone2.png') },
//         ]
//     },
//     {
//         id: 3, name: 'Backpack',
//         items: [
//             { id: 1, source: require('../images/bp1.png') },
//             { id: 2, source: require('../images/bp2.png') },
//         ]
//     },
// ]

const ProductScreen = ({ navigation }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://192.168.64.60:8087/api/product')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));

    }, []);

    const renderItem = ({ item }) => (
        <View>
            <Text style={styles.product_title}>{item.name}</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.image_view}>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('ProductDetail',
                        {
                            productId: item.product_id,
                            productName: item.product_name,
                            productPrice: item.price,
                            productDesc: item.description,
                        })}>
                            <Image
                                source={item.source}
                                style={styles.image}
                                resizeMode="center" />
                        </TouchableOpacity>
                        <Text>Name - {item.product_name}</Text>
                        <Text>Price - {item.price}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.product_id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    const [category, setCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://192.168.64.60:8087/api/category');
            const result = await response.json();
            setCategoryItems(result);
        }

        fetchData();
    }, []);

    const categoryItem = [
        { label: '', value: null },
        ...categoryItems.map((catItem) => ({
            label: catItem.category_name,
            value: catItem.category_id,
        })),
    ];

    const [brand, setBrand] = useState(false);
    const [brandValue, setBrandValue] = useState(null);
    const [brandItems, setBrandItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://192.168.64.60:8087/api/brand');
            const result = await response.json();
            setBrandItems(result);
        }

        fetchData();
    }, []);

    const brandItem = [
        { label: '', value: null },
        ...brandItems.map((bItem) => ({
            label: bItem.brand_name,
            value: bItem.brand_id,
        })),
    ];

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
                        items={categoryItem}
                        setOpen={setCategory}
                        setValue={setCategoryValue}
                        setItems={setCategoryItems}
                        placeholder='Category'
                    />
                </View>
                <View style={{ width: 150, position: 'relative', zIndex: 1, elevation: 1, }}>
                    <DropDownPicker
                        style={{ zIndex: 2, elevation: 2 }}
                        open={brand}
                        value={brandValue}
                        items={brandItem}
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
                    keyExtractor={(item) => item.id}
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