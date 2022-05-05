
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';






const LoginPage = props => {

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);


  // Test if the user is logged in
  // If the user is already logged in, go to MapPage
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        props.navigation.navigate('MapPage');
      }
    })
  }, []);
  

  /**
   * Sign in with Firebase
   * @param {*} email 
   * @param {*} password 
   */
  function signIn(email, password) {
    const auth = getAuth();
    setErrorMsg('');
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Success
      const userId = userCredential.user.uid;
      props.navigation.navigate('MapPage');
      setLoading(false);
    }).catch(err => {
      //error
      setErrorMsg(err.message);
      setLoading(false);
    });
  }



  return (

    // KeyboardAwareScrollView is used to make the view scrollable and behave nicely when the keyboard is open
    <KeyboardAwareScrollView contentContainerStyle={styles.container}
      keyboardShouldPersistTaps='handled'>

      <Text style={styles.welcome}>Houmti Ndhifa</Text>
      <StatusBar style="auto" />

      <TextInput style={styles.inputEmail}
        placeholder="Email"
        keyboardType='email-address'
        onChangeText={userEmail => setUserEmail(userEmail)}
      />

      <TextInput style={styles.inputPassword}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={password => setPassword(password)} />

      {/* Show an error when errorMsg is not empty */}
      {errorMsg != '' &&
        <Text style={styles.error}>{errorMsg}</Text>}

      <View style={styles.btnContainer}>

        <TouchableOpacity style={styles.UserBtn}>
          <Text style={styles.btnTxt}
            onPress={() => { signIn(userEmail, password) }} >Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.UserBtn}>
          <Text style={styles.btnTxt}
            onPress={() => { props.navigation.navigate('SignUpPage') }}>Signup</Text>
        </TouchableOpacity>
      </View>

      {/* Show loading indicator when loading is true */}
      {loading &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#008000" />
        </View>}


      <Image source={require('../assets/img2.png')}></Image>
    </KeyboardAwareScrollView>
  );
}

LoginPage.navigationOptions = {
  headerShown: false,
};





const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcome: {
    fontSize: 45,
    textAlign: 'center',
    margin: 10,
    color: "#008000",
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginVertical: 10,
  },

  inputEmail: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 50,

  },

  inputPassword: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 300,
    borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    marginTop: 40,
  },

  error: {
    color: '#d8392b',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600'
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },

  UserBtn: {
    backgroundColor: "#008000",
    padding: 15,
    width: "45%",
    borderRadius: 26,
    justifyContent: 'center',
  },

  btnTxt: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  Image: {
    width: 400,
    height: 200,
    marginVertical: 10,
  },

  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    zIndex: 3,
    elevation: 3,
    backgroundColor: '#ffffffc0'
  }



});

export default LoginPage; 