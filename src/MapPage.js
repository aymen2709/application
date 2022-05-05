import { View, Text, StyleSheet } from 'react-native';
import MapView, { Polyline, PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, push, serverTimestamp, set, ref } from "firebase/database";
const containers = require('./null.json');



/** Calculate distance in Km between two coordianate points (lat1, lon1) and (lat2, lon2) */
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}



const MapPage = props => {
    const [location, setLocation] = useState(null);
    const [initRegion, setInitRegion] = useState(null);
    const [path, setPath] = useState([]);
    const [oldLat, setOldLat] = useState(null);
    const [oldLong, setOldLong] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            // Move map view to the current user position
            setInitRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            });
        })();
    }, []);


    /**
     * Logout and go back to login page
     */
    function logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            props.navigation.navigate('LoginPage');
        });
    }


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initRegion}
                showsUserLocation={true}

                onUserLocationChange={(event) => {
                    const lat = event.nativeEvent.coordinate.latitude;
                    const long = event.nativeEvent.coordinate.longitude;
                    const speed = event.nativeEvent.coordinate.speed;

                    // Do not send coordinate unless the user travel more than 5m
                    if (oldLat != null && oldLong != null) {
                        const distanceInKm = getDistanceFromLatLonInKm(lat, long, oldLat, oldLong);
                        if (distanceInKm > 0.005) {
                            console.log('distanceInKm=', distanceInKm, 'greater than 5m -->',
                                'saving new GPS coordinate into Firebase:',
                                { lat: lat, long: long, speed: speed });
                            setPath(path => [...path, { latitude: lat, longitude: long }]);
                            setOldLat(lat);
                            setOldLong(long);

                            // Send coordinate to Firebase
                            const auth = getAuth();
                            const user = auth.currentUser;
                            if (user) {
                                const db = getDatabase();
                                const gpsRef = ref(db, 'gps/' + user.uid);
                                const newGpsRef = push(gpsRef);
                                set(newGpsRef, {
                                    'lat': lat,
                                    'long': long,
                                    'speed': speed,
                                    'timestamp': serverTimestamp()
                                }).catch(e => {
                                    console.error(e);
                                });
                            } else {
                                console.error('User is not signed in')
                            }
                        }
                    } else {
                        setOldLat(lat);
                        setOldLong(long);
                    }
                }}

                provider={PROVIDER_DEFAULT}>

                <MapView.UrlTile
                    urlTemplate={"http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    shouldReplaceMapContent={true}>
                </MapView.UrlTile>

                {/* Markers */}
                {containers.container.map(container => {
                    if (container.lat != null && container.long != null) {
                        return <Marker
                            coordinate={{ latitude: container.lat, longitude: container.long }}
                            key={container.id}
                            title={container.id}
                            description={container.address}>
                        </Marker>
                    }
                    return <span></span>
                })}

                {/** User route */}
                <Polyline coordinates={path} strokeWidth={5} strokeColor={'#0404bd77'}></Polyline>

            </MapView>

            <TouchableOpacity style={styles.logoutBtn} onPress={() => { logout() }}>
                <Text style={styles.btnTxt} >Log Out</Text>
            </TouchableOpacity>
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
        zIndex: -1,
        elevation: -1,

    },

    logoutBtn: {
        position: 'absolute',
        bottom: 38,
        left: 16,
        zIndex: 10,
        elevation: 10,
        backgroundColor: '#008000',
        borderRadius: 26,
        padding: 10
    },

    btnTxt: {
        fontSize: 12,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase",
    },
});


export default MapPage;