import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LanguageContext } from '../LanguageContext';

const CardItemCard = ({
  item,
  onAddToCart,
  onRemoveFromCart,
  onAddWishList,
  onRemoveFromWishList,
  isWishList
}) => {

  const { translate } = useContext(LanguageContext);

  return (
    <View style={styles.main_view}>
      <Image source={item.image ? { uri: `data:image/jpeg;base64,${item.image}` } : require('../images/no_image.png')}
        style={styles.product_img} />
      <Text style={styles.label1}>{item.name}</Text>
      <View style={styles.sub_view}>
        <Text style={styles.label2}>{'$' + item.price}</Text>
        {isWishList ? (
          <TouchableOpacity
            style={styles.cart_btn}
            onPress={() => {
              onAddToCart(item);
            }}>
            <Text>{translate('add_to_cart')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.cart_btn}
            onPress={() => {
              onRemoveFromCart(item);
            }}>
            <Text>{translate('remove_item')}</Text>
          </TouchableOpacity>
        )}
      </View>
      {isWishList ? (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            onRemoveFromWishList();
          }}>
          <Image source={require('../images/love.png')} style={styles.logo_img} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            onAddWishList(item);
          }}>
          <Image source={require('../images/like.png')} style={styles.logo_img} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main_view: {
    width: '90%',
    height: 200,
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
});

export default CardItemCard;
