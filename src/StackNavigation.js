
import { createStackNavigator } from 'react-navigation-stack';

import {createAppContainer} from 'react-navigation' ;
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import MapPage from './MapPage';





const PageNavigator = createStackNavigator({


    LoginPage : {screen: LoginPage}  , 
    SignUpPage :{screen : SignUpPage} ,
    MapPage :{screen : MapPage},
    
    
    
    
    
}) ; 

export default createAppContainer(PageNavigator) ; 