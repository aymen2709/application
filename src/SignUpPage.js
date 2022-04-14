

import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database';


const SignUpPage = props => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);


    /**
     * Sign up and add account to Firebase
     * @param {*} firstName 
     * @param {*} lastName 
     * @param {*} email 
     * @param {*} password 
     * @returns 
     */
    function signUp(firstName, lastName, email, password) {
        // Show error msg when first name or last name are empty
        if (firstName.trim() == '' || lastName.trim() == '') {
            setErrorMsg('Please tell us your first and last name');
            return;
        }
        setErrorMsg('');
        setLoading(true);
        const auth = getAuth();
        const db = getDatabase();
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Sign up succeded
            const userId = userCredential.user.uid;
            // Create new user entry in the realtime database
            set(ref(db, 'users/' + userId), {
                firstName: firstName,
                lastName: lastName,
                email: email
            }).then(() => {
                // All is good, go to map view
                props.navigation.navigate('MapPage');
                setLoading(false);
            }).catch(e => {
                // Create new user entry failed
                console.error(e);
                setLoading(false);
                setErrorMsg('An unexpected error occurred, please try again later');
            });
        }).catch(err => {
            // Sign up failed
            console.error(err);
            setErrorMsg(err.message);
            setLoading(false);
        });
    }


    return (

        // KeyboardAwareScrollView is used to make the view scrollable and behave nicely when the keyboard is open
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>

            <Text style={styles.test} >Create Account</Text>
            <StatusBar style="auto" />

            <TextInput style={styles.FirstName}
                placeholder="First name"
                keyboardType='name-phone-pad'
                onChangeText={firstName => setFirstName(firstName)} />

            <TextInput style={styles.LastName}
                placeholder="Last name"
                keyboardType='name-phone-pad'
                onChangeText={lastName => setLastName(lastName)} />

            <TextInput style={styles.Email}
                placeholder="Email"
                keyboardType='email-address'
                onChangeText={email => setEmail(email)} />

            <TextInput style={styles.Password}
                placeholder="Password"
                
                secureTextEntry={true}
                onChangeText={password => setPassword(password)} />

            {errorMsg != '' &&
                <Text style={styles.error}>{errorMsg}</Text>}

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.UserBtn}>
                    <Text style={styles.btnTxt}
                        onPress={() => { signUp(firstName, lastName, email, password) }}>CREATE </Text>
                </TouchableOpacity>
            </View>

            {loading &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#008000" />
                </View>}

        </KeyboardAwareScrollView>
    )



}


SignUpPage.navigationOptions = {
    headerShown: false,
};


const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    test: {
        fontSize: 40,
        textAlign: 'center',
        marginVertical: 15,
        fontWeight: 'bold',
        color: "#008000",
    },

    FirstName: {
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 5,
        alignItems: 'center',
        height: 50,
        width: 300,
        borderWidth: 2,
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 50,
    },

    LastName: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 5,
        alignItems: 'center',
        height: 50,
        width: 300,
        borderWidth: 2,
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 50,
    },

    Email: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 5,
        alignItems: 'center',
        height: 50,
        width: 300,
        borderWidth: 2,
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 50,
    },

    Password: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 5,
        alignItems: 'center',
        height: 50,
        width: 300,
        borderWidth: 2,
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 50,

    },

    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginVertical: 10,

    },

    UserBtn: {
        backgroundColor: "#008000",
        padding: 15,
        width: "50%",
        borderRadius: 30,
        justifyContent: 'center',
    },

    btnTxt: {
        fontSize: 18,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase",
    },

    error: {
        color: '#d8392b',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '600'
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

export default SignUpPage;