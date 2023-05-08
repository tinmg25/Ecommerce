import React,{ useEffect } from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import SplashScreen from "react-native-splash-screen";

const Splash = ({ navigation }) => {

    useEffect(()=>{
        SplashScreen.hide();
        setTimeout(() => {
          navigation.navigate('Login');  
        },3000);
    },[])

    return(
        <View style={styles.main_view}>
            <Image 
            style={styles.img} 
            source={require('../images/splash.png')}
            resizeMode="contain"/>
        </View>
    );
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        
        
    },
    img:{
        width:'100%',
        height:'100%'
    },
    // sub_view: {
    //     flexDirection: "row",
    //     marginTop:-20,
    // },
    // logo: {
    //     fontSize: 120,
    //     color: "#FFFFFF",
    //     fontStyle: "italic",
    //     fontWeight: "bold",
    //     textDecorationLine: "underline",
    //     position:"relative",
    // },
    // img: {
    //     height:30,
    //     width:30,
    //     transform: [{rotate: '45deg'}],
    //     position: "absolute",
    //     left: 75,
    //     top: 300,
    // },
    // text1: {
    //     fontSize: 50,
    //     color: "#618CFB",
    //     fontStyle: "italic",
    //     fontWeight: "bold",
    // },
    // text2: {
    //     fontSize: 50,
    //     color: "#FFFFFF",
    //     fontStyle: "italic",
    //     fontWeight: "bold",
    // }
});

export default Splash;