import {  View, StyleSheet  } from 'react-native';

import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

const MapPage = () => {
    
    return (
        <View style={styles.container}>
            <MapView 
            style={styles.map}
            
                Region={{
                    latitude: 35.820918,
                    longitude:  10.592252,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                     provider={PROVIDER_DEFAULT}>
        <MapView.UrlTile
          urlTemplate={"http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          shouldReplaceMapContent={true}
        />
    
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