import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, addItemToWishlist, removeItemFromWishlist } from '../redux/actions/Actions';
import { LanguageContext } from '../LanguageContext';
import { API_KEY } from '../common/APIKey';
import { getDocs, collection, query, where, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const ProductScreen = ({ navigation }) => {

  const { translate } = useContext(LanguageContext);

  const { width } = Dimensions.get('screen');
  const imageWidth = width;

  const dispatch = useDispatch();

  const items = useSelector(state => state);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchCategories();
    const fetchFirestoreData = async () => {
      try {
        const categoriesSnapshot = await getDocs(collection(db, 'category'));

        const categoriesData = [];
        for (const categoryDoc of categoriesSnapshot.docs) {
          const categoryId = categoryDoc.id;
          const categoryData = categoryDoc.data();
          const productsSnapshot = await getDocs(
            query(collection(db, 'product_tbl'), where('category_id', '==', categoryId))
          );

          const productsData = await Promise.all(
            productsSnapshot.docs.map(async (productDoc) => {
              const productId = productDoc.id;
              const productData = productDoc.data();

              return {
                id: productId,
                ...productData,
              };
            })
          );

          categoriesData.push({
            id: categoryId,
            name: categoryData.category_name,
            products: productsData,
          });
        }

        setCategories(categoriesData);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching categories', error);
        setLoading(false);
      }
    }

    fetchFirestoreData();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoryResponse = await fetch(`${API_KEY}/api/category`);
      const categoriesData = await categoryResponse.json();

      const productResponse = await fetch(`${API_KEY}/api/product`);
      const productsData = await productResponse.json();

      const categoriesWithProducts = categoriesData.map(category => {
        const filteredProducts = productsData.filter(product => product.category_id === category.category_id);
        return { ...category, products: filteredProducts };
      });

      setCategories(categoriesWithProducts);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const addtoCart = async (item) => {
    try {
      const cartQuery = query(collection(db, 'cart'), where('id', '==', item.id));
      const cartSnapshot = await getDocs(cartQuery);

      if (cartSnapshot.empty) {
        // Item does not exist in the cart, add it as a new item with quantity 1
        await addDoc(collection(db, 'cart'), { ...item, quantity: 1 });
      } else {
        // Item already exists in the cart, update the quantity
        const cartDoc = cartSnapshot.docs[0];
        const cartItemRef = doc(db, 'cart', cartDoc.id);
        const cartItemData = cartDoc.data();
        const updatedQuantity = cartItemData.quantity + 1;

        await updateDoc(cartItemRef, { quantity: updatedQuantity });
      }

    } catch (error) {
      console.error('Error adding item', error);
    }
  }

  const renderProduct = ({ item }) => {

    // const isItemInWishlist = items.reducers2.find(
    //   (wishlistItem) => wishlistItem.id === item.id
    // );

    const toggleWishlist = async (item) => {
      try {
        const wishlistQuery = query(collection(db, 'wishlist'), where('id', '==', item.id));
        const wishlistSnapshot = await getDocs(wishlistQuery);

        if (wishlistSnapshot.empty) {
          await addDoc(collection(db, 'wishlist'), { ...item, quantity: 1 });
        } else {
          const wishlistDoc = wishlistSnapshot.docs[0];
          const wishlistItemRef = doc(db, 'wishlist', wishlistDoc.id);
          const wishlistItemData = wishlistDoc.data();
          const updatedQuantity = wishlistItemData.quantity + 1;

          await updateDoc(wishlistItemRef, { quantity: updatedQuantity });
        }
        // dispatch(removeItemFromWishlist(item.id));
      } catch (error) {
        console.error("Error fetching wishlist", error);
        // dispatch(addItemToWishlist(item));
      }
    };

    const navigateToProductDetails = product => {
      navigation.navigate('ProductDetails', { product });
    };

    return (
      <View style={styles.product_view}>
        <TouchableOpacity onPress={() => navigateToProductDetails(item)}>
          <Image
            source={{ uri: item.image_url }}
            style={styles.product_img}
            resizeMode='cover'
          />
          {/* <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: `data:image/jpeg;base64,${imageData}` }}
          /> */}
        </TouchableOpacity>
        <Text style={styles.label1}>{item.product_name}</Text>
        <View style={styles.sub_view}>
          <Text style={styles.label2}>{'$' + item.price}</Text>
          {/* <TouchableOpacity
            style={styles.cart_btn}
            onPress={() => {
              dispatch(addItemToCart(item));
            }}>
            <Text>{translate('add_to_cart')}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.cart_btn}
            onPress={() => addtoCart(item)}>
            <Text>{translate('add_to_cart')}</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          style={styles.icon}
          onPress={toggleWishlist}>
          <Image source={
            isItemInWishlist
              ? require('../images/love.png')
              : require('../images/like.png')
          }
            style={styles.logo_img} />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.icon}
          onPress={() => toggleWishlist(item)}>
          <Image source={
             require('../images/like.png')
          }
            style={styles.logo_img} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategoryItem = ({ item }) => {

    return (
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={item.products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={[styles.img, { width: imageWidth }]}
        resizeMode='contain'
        source={require('../images/background_img.png')} />
      <View style={styles.category_view}>
        {loading ? (
          <ActivityIndicator size="large" animating={true} />
        ) : (
          <FlatList
            style={styles.category_list}
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: '32%',
  },
  category_view: {
    flex: 1,
    justifyContent: 'center',
  },
  product_view: {
    marginLeft: 10,
    elevation: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    marginVertical: 5,
    marginLeft: 10,
  },
  sub_label: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
    marginVertical: 5,
    marginLeft: 20,
  },
  product_img: {
    width: 200,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cart: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    width: 100,
    backgroundColor: '#04144F',
    color: '#fff',
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_img: {
    width: 30,
    height: 30,
  },
  label1: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 10,
    fontFamily: 'NotoSerifJP-Black'
  },
  sub_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  label2: {
    fontSize: 18,
    fontWeight: '600',
  },
  cart_btn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontFamily: 'NotoSerifJP-Black'
  },
  category_list: {
    marginVertical: 10,
  },
});

export default ProductScreen;
