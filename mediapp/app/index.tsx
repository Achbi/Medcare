import {View , Text , StyleSheet ,Animated } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useEffect,useRef } from "react";
import { useRouter } from "expo-router";
import AuthScreen from "./auth";

export default function SplashScreen(){
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const router = useRouter(); 

    useEffect(()=>{
      Animated.parallel([
         Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }),
        Animated.spring(scaleAnim,{
            toValue: 1,
            tension: 1000,
            friction:2,
            useNativeDriver: true,
        }),
      ]).start();
      
      const timer = setTimeout(() =>{
         router.replace('/auth')
      },2000)

      return () => clearTimeout(timer);


    },[])

    return(
        <View style = {styles.container}>

            <Animated.View style = {[
                styles.iconContainer,
                {
                opacity:fadeAnim,
                transform:[{scale:scaleAnim}],
            },
            ]}
            >
                <Ionicons name= "medical" size={100} color="white"/>
            
          
            </Animated.View>
            <Text>Med remind</Text>
    
        </View>
    )
}

const styles = StyleSheet.create({
       container:{
        flex:1,
        backgroundColor:'#4CAF50', 
        alignItems:'center',
        justifyContent:'center',
       },
       iconContainer:{
        color:'white',
        fontSize: 32,
        fontWeight:"bold",
        marginTop:20,
        letterSpacing:1,
       },
       appName:{
        color:'white',
        fontSize:20,
        fontWeight:"bold",
        marginTop:20,
        letterSpacing:1,
       }
});