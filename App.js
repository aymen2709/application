

import LoginPage from "./src/LoginPage";
import SignUpPage from "./src/SignUpPage";
import MapPage from "./src/MapPage";
import StackNavigation from "./src/StackNavigation";
import { initializeApp } from 'firebase/app';


// Important!!
// Don't forget to change this to your Firebase Project config
const firebaseConfig = {
  apiKey: "AIzaSyBRw2HTtcCdBDJempPaoxPDhkgieKyWKBU",
  authDomain: "houmti-ndhifa-455d7.firebaseapp.com",
  projectId: "houmti-ndhifa-455d7",
  storageBucket: "houmti-ndhifa-455d7.appspot.com",
  messagingSenderId: "988507420523",
  appId: "1:988507420523:web:d7735ef576b3bc5bd9fe2e"
};



export default function App (){
  initializeApp(firebaseConfig);

    return( 
      <StackNavigation></StackNavigation>
    );

}
      