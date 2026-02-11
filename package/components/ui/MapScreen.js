import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";

const MapScreen = () => {
    const region = {
        latitude: 8.9486,
        longitude: 125.5406,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={null} // ✅ disables Google Maps SDK
                initialRegion={region}
            >
                {/* ✅ Use UrlTile for OpenStreetMap tiles */}
                <UrlTile
                    urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                    flipY={false}
                    zIndex={-1}
                />

                {/* Example marker */}
                <Marker coordinate={{ latitude: 8.9486, longitude: 125.5406 }} title="My Location" />
            </MapView>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});
