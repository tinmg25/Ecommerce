import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LanguageContext } from '../LanguageContext';
import { collection, deleteDoc, doc, where, getDocs, query, updateDoc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const CardItemCard = ({
  item,
  onAddToCart,
  onRemoveFromCart,
  onAddWishList,
  onRemoveFromWishList,
  isWishList
}) => {

  const { translate } = useContext(LanguageContext);

  useEffect(() => {
    setQty(item.quantity || 1);
  }, [item.quantity])

  const [qty, setQty] = useState(1);

  const increaseQty = async () => {
    const newQty = qty + 1;
    setQty(newQty);

    // Update quantity in Firestore
    if (isWishList) {
      // Update quantity in the wishlist collection
      const itemDocRef = doc(db, 'wishlist', item.id);
      await setDoc(itemDocRef, { ...item, quantity: newQty });
    } else {
      // Update quantity in the cart collection
      const itemQuerySnapshot = await getDocs(
        query(collection(db, 'cart'), where('id', '==', item.id))
      );
      const itemDoc = itemQuerySnapshot.docs[0];

      const itemDocRef = doc(db, 'cart', itemDoc.id);
      await updateDoc(itemDocRef, { quantity: newQty });
    }
  };

  const decreaseQty = async () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);

      // Update quantity in Firestore
      if (isWishList) {
        // Update quantity in the wishlist collection
        const itemDocRef = doc(db, 'wishlist', item.id);
        await setDoc(itemDocRef, { ...item, quantity: newQty });
      } else {
        // Update quantity in the cart collection
        const itemQuerySnapshot = await getDocs(
          query(collection(db, 'cart'), where('id', '==', item.id))
        );
        const itemDoc = itemQuerySnapshot.docs[0];

        const itemDocRef = doc(db, 'cart', itemDoc.id);
        await updateDoc(itemDocRef, { quantity: newQty });
      }
    };
  }

  const addItemToCart = async (item) => {
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
      console.error('Error adding cart item');
    }
  };

  const removeItemFromCart = async (item) => {
    try {
      const itemQuerySnapshot = await getDocs(
        query(collection(db, 'cart'), where('id', '==', item.id))
      );
      const itemDoc = itemQuerySnapshot.docs[0];

      const itemDocRef = doc(db, 'cart', itemDoc.id);
      await deleteDoc(itemDocRef);
    } catch (error) {
      console.error('Error removing cart item');
    }
  };

  const addItemToWishlist = async (item) => {
    try {
      await addDoc(collection(db, 'wishlist'), { ...item })
    } catch (error) {
      console.error('Error adding wishlist item');
    }
  };

  const removeItemFromWishlist = async (item) => {
    try {
      const itemQuerySnapshot = await getDocs(
        query(collection(db, 'wishlist'), where('id', '==', item.id))
      );
      const itemDoc = itemQuerySnapshot.docs[0];

      const itemDocRef = doc(db, 'wishlist', itemDoc.id);
      await deleteDoc(itemDocRef);
    } catch (error) {
      console.error('Error removing wishlist item');
    }
  }

  return (
    <View style={styles.main_view}>
      <Image source={item.image ? { uri: `data:image/jpeg;base64,${item.image}` } : require('../images/no_image.png')}
        style={styles.product_img} />
      <Text style={styles.label1}>{item.name}</Text>
      <View style={styles.sub_view}>
        <Text style={styles.label2}>{'$' + item.price}</Text>
        {isWishList ? (
          // <TouchableOpacity
          //   style={styles.cart_btn}
          //   onPress={() => {
          //     onAddToCart(item);
          //   }}>
          //   <Text>{translate('add_to_cart')}</Text>
          // </TouchableOpacity>
          <TouchableOpacity
            style={styles.cart_btn}
            onPress={() => {
              addItemToCart(item);
            }}>
            <Text style={styles.cart_txt}>{translate('add_to_cart')}</Text>
          </TouchableOpacity>
        ) : (
          // <TouchableOpacity
          //   style={styles.cart_btn}
          //   onPress={() => {
          //     onRemoveFromCart(item);
          //   }}>
          //   <Text>{translate('remove_item')}</Text>
          // </TouchableOpacity>
          <TouchableOpacity
            style={styles.cart_btn}
            onPress={() => {
              removeItemFromCart(item);
            }}>
            <Text style={styles.cart_txt}>{translate('remove_item')}</Text>
          </TouchableOpacity>
        )}
      </View>
      {isWishList ? (
        // <TouchableOpacity
        //   style={styles.icon}
        //   onPress={() => {
        //     onRemoveFromWishList();
        //   }}>
        //   <Image source={require('../images/love.png')} style={styles.logo_img} />
        // </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            removeItemFromWishlist(item);
          }}>
          <Image source={require('../images/love.png')} style={styles.logo_img} />
        </TouchableOpacity>
      ) : (
        // <TouchableOpacity
        //   style={styles.icon}
        //   onPress={() => {
        //     onAddWishList(item);
        //   }}>
        //   <Image source={require('../images/like.png')} style={styles.logo_img} />
        // </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            addItemToWishlist(item);
          }}>
          <Image source={require('../images/like.png')} style={styles.logo_img} />
        </TouchableOpacity>
      )}
      {!isWishList ? (
        <View style={styles.qty_view}>
          <TouchableOpacity onPress={decreaseQty}>
            <Image
              style={styles.qty_icon}
              source={require('../images/minus.png')} />
          </TouchableOpacity>
          <Text style={styles.qty_txt}>{qty}</Text>
          <TouchableOpacity onPress={increaseQty}>
            <Image
              style={styles.qty_icon}
              source={require('../images/plus.png')} />
          </TouchableOpacity>
        </View>
      ) : (
        null
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main_view: {
    width: '90%',
    height: 250,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginVertical: 10,
  },
  product_img: {
    width: '100%',
    height: '50%',
  },
  label1: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 10,
  },
  sub_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
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
    backgroundColor: '#04144F',
    color: '#fff',
  },
  cart_txt: {
    color:'#fff',
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
  qty_view: {
    width: 200,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  qty_icon: {
    width: 30,
    height: 30,
  },
  qty_txt: {
    fontWeight: 600,
    fontSize: 20,
    color: '#000',
  }
});

export default CardItemCard;
