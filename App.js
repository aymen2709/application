

import LoginPage from "./src/LoginPage";
import SignUpPage from "./src/SignUpPage";
import MapPage from "./src/MapPage";
import StackNavigation from "./src/StackNavigation";
import { initializeApp } from 'firebase/app';


// Important!!
// Don't forget to change this to your Firebase Project config
const firebaseConfig = {
  apiKey: "AIzaSyCZmc_bWSzHPClO0FTIbGeALasuGJdP7Uk",
  authDomain: "houmti-ndhifa.firebaseapp.com",
  projectId: "houmti-ndhifa",
  storageBucket: "houmti-ndhifa.appspot.com",
  messagingSenderId: "421661986639",
  appId: "1:421661986639:web:aab3cbb3661937ac1d3f3a"
};




export default function App (){
  initializeApp(firebaseConfig);

    return( 
      <StackNavigation></StackNavigation>
    );

}
      