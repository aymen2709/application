
import {StatusBar} from 'expo-status-bar';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Image} from'react-native';





const   LoginPage = props => {


    

    return(

 <View style={ styles.container}>
   <Text style={styles.welcome}>Houmti Ndhifa</Text>
   <StatusBar style ="auto"/>  

   <TextInput style={styles.inputEmail}
       placeholder="Email" 
 
 
    />
   <TextInput style={styles.inputPassword}
    placeholder="password"
    secureTextEntry={true}/>
   <View style={styles.btnContainer}>

    <TouchableOpacity style={styles.UserBtn}>
      <Text style={styles.btnTxt}  
      onPress={() => {props.navigation.navigate('MapPage')}} >Login</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.UserBtn}>
      <Text style={styles.btnTxt } 
      onPress={() => {props.navigation.navigate('SignUpPage')}}>Signup</Text>
    </TouchableOpacity>

     </View>
     <Image source={require('../assets/img2.png')}></Image>

 </View>
); 
}

LoginPage.navigationOptions= {

    headerShown : false ,
} ; 





const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent:'center',



},
welcome:{ 

fontSize:45,
textAlign:'center',
margin:10,
color:"#008000",
fontWeight: 'bold',
fontStyle: 'italic',
marginVertical:10,





},
inputEmail:{

backgroundColor:"#fff",
padding:15,
marginBottom:10,
alignItems:'center',


height: 50,
width: 300,
borderWidth: 1,
borderRadius: 20,
borderTopRightRadius: 20,
borderTopLeftRadius: 20,
marginTop: 50,

},
inputPassword:{

backgroundColor:"#fff",
padding:15,
marginBottom:10,
alignItems:'center',

justifyContent: 'center',
height: 50,
width: 300,
borderRadius: 20,
borderTopRightRadius: 20,
borderTopLeftRadius: 20,
borderWidth: 1,
marginTop: 40,
},

btnContainer:{

flexDirection:"row",
justifyContent:"space-between",
width:"90%",

},
UserBtn:{
backgroundColor:"#008000",
padding:15,
width:"45%",
borderRadius: 26,
justifyContent: 'center',



},
btnTxt:{
fontSize:18,
textAlign:"center",
color:"white",
fontWeight:"bold",
textTransform:"uppercase",
},
Image:{
width:400,
height:200,
marginVertical:10,

}



});

export default LoginPage ; 