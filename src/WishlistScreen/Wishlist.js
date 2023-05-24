import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
} from 'react-native';
import CardItemCard from '../common/CartItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromWishlist } from '../redux/actions/Actions';
import { LanguageContext } from '../LanguageContext';

const WishlistScreen = ({ navigation }) => {

    const { translate } = useContext(LanguageContext);

    const cartData = useSelector( state => state.reducers2);
    const dispatch = useDispatch();
    
    return (
        <View style={styles.main_view}>
            {cartData.length > 0 ? (
                <FlatList 
                data={cartData}
                renderItem={({item,index}) => {
                    return <CardItemCard 
                    isWishList={('a')}
                    item={item} 
                    onRemoveFromWishList={()=>{
                        dispatch(removeItemFromWishlist(index))
                    }}
                    onAddToCart={(x)=>{
                        dispatch(addItemToCart(x));
                    }}/>;
                }}/>
            ):(
                <View style={styles.no_data}>
                    <Image style={styles.img} source={require('../images/empty_wishlist.png')}/>
                    <Text style={styles.no_item}>{translate('no_wishlist')}</Text>
                </View>
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    main_view: {
        flex:1,
    },
    no_data: {
        flex:1,
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    no_item: {
        fontSize:18,
        color:'#000',
    },
    img: {
        width:350,
        height:400,
    }
})

export default WishlistScreen;