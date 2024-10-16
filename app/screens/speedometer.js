import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { ThemeContext } from '../../App';

export default function Speedometer() {
  const { isDarkMode } = useContext(ThemeContext);
  const [speed, setSpeed] = useState(null);

  useEffect(() => {
    _requestPermissions();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _requestPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    _subscribe();
  };

  const _subscribe = () => {
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 500,
        distanceInterval: 0.1,
      },
      (location) => {
        setSpeed(location.coords.speed * 3.6);
      }
    );
  };

  const _unsubscribe = () => {
    Location.hasServicesEnabledAsync().then(enabled => {
      if (enabled) {
        Location.stopLocationUpdatesAsync();
      }
    });
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
        {speed !== null ? `${speed.toFixed(2)} km/h` : 'No Data'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  text: {
    fontSize: 48,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});
