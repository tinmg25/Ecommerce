import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    Image,
    TouchableOpacity,
    DrawerLayoutAndroid,
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
        fetch('http://192.168.64.77:8087/api/product')
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
                    <View style={styles.image_view} key={item.product_id}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ProductDetail',
                                {
                                    productId: item.product_id,
                                    productName: item.product_name,
                                    productPrice: item.price,
                                    productDesc: item.description,
                                })}>
                            <Text style={{ fontSize: 50 }}>Image</Text>
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
            const response = await fetch('http://192.168.64.77:8087/api/category');
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
            const response = await fetch('http://192.168.64.77:8087/api/brand');
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

    // const drawer = useRef(null);

    // const navigationView = () => (
    //     <View style={[styles.container, styles.navigationContainer]}>
    //         <Text style={styles.menuHead}>HL</Text>
    //         <TouchableOpacity onPress={() => navigation.navigate('Product')}>
    //             <View style={styles.menuView}>
    //                 <MaterialCommunityIcons style={styles.menuIcon} name="home" size={30} />
    //                 <Text style={styles.menuItem}>Home</Text>
    //             </View>
    //         </TouchableOpacity>
    //         <TouchableOpacity>
    //             <View style={styles.menuView}>
    //                 <MaterialCommunityIcons style={styles.menuIcon} name="view-list" size={30} />
    //                 <Text style={styles.menuItem}>Order List</Text>
    //             </View>
    //         </TouchableOpacity>
    //         <View style={styles.menuView}>
    //             <MaterialCommunityIcons style={styles.menuIcon} name="account" size={30} />
    //             <Text style={styles.menuItem}>Profile</Text>
    //         </View>
    //         <View style={styles.menuView}>
    //             <MaterialCommunityIcons style={styles.menuIcon} name="cog" size={30} />
    //             <Text style={styles.menuItem}>Setting</Text>
    //         </View>
    //     </View>
    // );

    return (
        // <DrawerLayoutAndroid
        //     ref={drawer}
        //     drawerPosition='left'
        //     drawerWidth={300}
        //     renderNavigationView={navigationView}>
            <View style={styles.container}>
                {/* <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
                    <MaterialCommunityIcons style={styles.drawerIcon} name="menu" size={30} />
                </TouchableOpacity> */}
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
                        keyExtractor={(item) => item.product_id}
                        onRefresh={() => { }}
                        refreshing={false}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        // </DrawerLayoutAndroid>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '',
    },
    // drawerIcon: {
    //     alignSelf: 'flex-start',
    //     color: '#000000',
    //     padding: 10,
    // },
    // menuHead: {
    //     fontSize: 70,
    //     color: "#FFF",
    //     fontStyle: "italic",
    //     fontWeight: "bold",
    //     marginVertical: 20,
    //     backgroundColor: '#04144F',
    //     alignSelf: 'center',
    //     borderRadius: 20,
    //     padding: 10,
    // },
    // menuView: {
    //     flexDirection: 'row',
    //     backgroundColor: '#04144F',
    //     borderBottomWidth: 2,
    //     borderBottomColor: '#FFF',
    // },
    // menuIcon: {
    //     color: '#FFF',
    //     alignSelf: 'center',
    // },
    // menuItem: {
    //     fontSize: 20,
    //     color: '#FFF',
    //     padding: 10,
    // },
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