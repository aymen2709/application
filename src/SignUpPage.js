

import {StatusBar} from 'expo-status-bar';
import {Text,View,StyleSheet,TextInput,TouchableOpacity} from'react-native';


const SignUpPage=  props => {
  
    
    return(
    <View style={ styles.container}>


        <Text style={styles.test} >Create Account</Text>
        <StatusBar style ="auto"/>  
        <TextInput style={styles.FirstName}
          placeholder="First name" 

          />
          
        <TextInput style={styles.LastName}
         placeholder="Last name" />

         <TextInput style={styles.Email}
          placeholder="Email " />

         <TextInput style={styles.Password}
          placeholder="Password " 
           secureTextEntry={true}/>


    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.UserBtn}>
      <Text style={styles.btnTxt} 
      onPress={() => {props.navigation.navigate('LoginPage')} }>CREATE </Text>
      </TouchableOpacity>



        </View>
        </View>
    )



}


SignUpPage.navigationOptions= {

    headerShown : false ,
} ; 

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
    


    

},
test:{ 

fontSize:40,
textAlign:'center',
marginVertical:15,

fontWeight: 'bold',
color:"#008000",







},
FirstName:{

    backgroundColor:"#fff",
    padding:10,
    marginBottom:5,
    alignItems:'center',
    
    
    height: 50,
    width: 300,
    borderWidth: 2,
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 50,
    
    
    },

    LastName:{

        backgroundColor:"#fff",
        padding:15,
        marginBottom:5,
        alignItems:'center',
        
        
        height: 50,
        width: 300,
        borderWidth: 2,
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 50,
    },


    Email:{

        backgroundColor:"#fff",
        padding:15,
        marginBottom:5,
        alignItems:'center',
        
        
        height: 50,
        width: 300,
        borderWidth: 2,
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 50,
        
        },


        Password:{

            backgroundColor:"#fff",
            padding:15,
            marginBottom:5,
            alignItems:'center',
            
            
            height: 50,
            width: 300,
            borderWidth: 2,
            borderRadius: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            marginTop: 50,
            
            },
            btnContainer:{

                flexDirection:"row",
                justifyContent:"center",
                width:"100%",
                marginVertical:10,
                
                },
                UserBtn:{
                backgroundColor:"#008000",
                padding:15,
                width:"50%",
                borderRadius: 30,
                justifyContent: 'center',
                
                
                
                },
                btnTxt:{
                fontSize:18,
                textAlign:"center",
                color:"white",
                fontWeight:"bold",
                textTransform:"uppercase",
                },
        
                
                



});

export default SignUpPage ;