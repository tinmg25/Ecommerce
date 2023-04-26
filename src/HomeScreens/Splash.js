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
                <Text style={styles.logo}>HL      </Text>
                <Image style={styles.img} source={require('../images/square.png')}/>
                <View style={styles.sub_view}>
                    <Text style={styles.text1}>Eco</Text>
                    <Text style={styles.text2}>mmerce</Text>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        justifyContent: "center",
        padding:50,
        alignItems: "flex-start",
        backgroundColor: "#04144F"
        
    },
    sub_view: {
        flexDirection: "row",
        marginTop:-20,
    },
    logo: {
        fontSize: 120,
        color: "#FFFFFF",
        fontStyle: "italic",
        fontWeight: "bold",
        textDecorationLine: "underline",
        position:"relative",
    },
    img: {
        height:30,
        width:30,
        transform: [{rotate: '45deg'}],
        position: "absolute",
        left: 75,
        top: 300,
    },
    text1: {
        fontSize: 50,
        color: "#618CFB",
        fontStyle: "italic",
        fontWeight: "bold",
    },
    text2: {
        fontSize: 50,
        color: "#FFFFFF",
        fontStyle: "italic",
        fontWeight: "bold",
    }
});

export default Splash;