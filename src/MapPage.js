import {  View,Text,  StyleSheet  } from 'react-native';

import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

 





const MapPage = () => {
    ComponentDidMount=()=> {
        this._getLocationAsync();
        }
      
       
      
       _getLocationAsync = async () => {
         let { status } = await Permissions.askAsync(Permissions.LOCATION);
         if (status !== 'granted') {
           this.setState({
             locationResult: 'Permission to access location was denied',
             location,
           });
         }
      
         let location = await Location.getCurrentPositionAsync({});
      console.Log("MYLIVELOCATION",""+JSON.stringify(location));
       };
    
    return (
        <View style={styles.container}>
            <MapView 
            style={styles.map}
            
                initialRegion={{
                    latitude: 35.820918,
                    longitude:  10.592252,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                
                
                provider={PROVIDER_DEFAULT}>
                <MapView.UrlTile
                  urlTemplate={"http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                  shouldReplaceMapContent={true}>
            </MapView.UrlTile>
                
               <Marker
                coordinate={{
                    latitude: 35.820918,
                longitude: 10.592252,     
                }}    
            ></Marker>
            

              
             

             </MapView>
            
             
            

                
        </View>
          
    )
}

    



MapPage.navigationOptions = {

    headerShown: false,
};

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        backgroundColor: '#ffffff00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map:{
        
        flex: 1,
        width:"100%",
        
        alignItems: 'center',
        justifyContent: 'center',

    },
});


export default MapPage;