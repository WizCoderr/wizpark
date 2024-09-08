import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ParkVehicle = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectLocation = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleSelectLocation}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Parking Location"
          />
        )}
      </MapView>
      <View style={styles.infoContainer}>
        {selectedLocation ? (
          <Text style={styles.infoText}>
            Location: {selectedLocation.latitude.toFixed(6)}, {selectedLocation.longitude.toFixed(6)}
          </Text>
        ) : (
          <Text style={styles.infoText}>Tap on the map to select a parking location</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
  infoContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
  },
});

export default ParkVehicle;
