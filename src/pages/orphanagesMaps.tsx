import React,{ useEffect,useState } from 'react';
import MapView,{ Callout,Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet,Text,View,Dimensions,TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Nunito_600SemiBold,Nunito_700Bold,Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import mapMarker from '../img/mapMarker.png';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
}
export default function OrphanageMaps() {
    const [orphanages,setOrphanages] = useState<Orphanage[]>([]);

    useFocusEffect(() => {
        api.get('orphanages').then(resp => {
            setOrphanages(resp.data);
        })
    });

    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_800ExtraBold
    });

    if (!fontsLoaded) {
        return null;
    }


    function handleNavigateToOrphanageDetail(id: number) {
        console.log(id)
        navigation.navigate('OrphanageDetail',{ id });
    }
    function handleNavigateToOrphanageCreate() {
        navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
            <MapView provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: orphanages.length > 0 ? orphanages[0].latitude : -20.4735487,
                    longitude: orphanages.length > 0 ? orphanages[0].longitude : -54.6280488,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {orphanages.map((orphanage) => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.8,
                            }}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude,
                            }}
                        >
                            <Callout
                                tooltip
                                onPress={() => handleNavigateToOrphanageDetail(orphanage.id)}
                            >
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                                </View>
                            </Callout>

                        </Marker>
                    )
                }
                )}

            </MapView>

            <View style={styles.footer} >
                <Text style={styles.footerText}>{`${orphanages.length} orfanato${orphanages.length > 1 && 's'} encontrado${orphanages.length > 1 && 's'}`}</Text>
                <RectButton
                    style={styles.orphanageCreate}
                    onPress={() => { handleNavigateToOrphanageCreate() }}>
                    <Feather name="plus" size={20} color='#fff' />
                </RectButton>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",

    },
    calloutText: {
        color: '#0089a5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#fff',
        borderRadius: 20,
        height: 46,
        paddingLeft: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3,
    },
    footerText: {
        color: '#8fa7d3',
        fontFamily: 'Nunito_700Bold',
    },
    orphanageCreate: {
        width: 46,
        height: 46,
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
})