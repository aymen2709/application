import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';





const MapPage = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    TaskManager.defineTask('YOUR_TASK_NAME', ({ data: { locations }, error }) => {
        if (error)
         { console.log(error)
          // check `error.message` for more details.
          return;
        }
        console.log('Received new locations', locations);
       });

       Location.startLocationUpdatesAsync('YOUR_TASK_NAME',{})

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}

                initialRegion={{
                    latitude: 35.820918,
                    longitude: 10.592252,
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
    map: {

        flex: 1,
        width: "100%",

        alignItems: 'center',
        justifyContent: 'center',

    },
});


export default MapPage;