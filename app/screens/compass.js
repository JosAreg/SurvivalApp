import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { ThemeContext } from '../../ThemeContext'; // Import the ThemeContext

export default function Compass() {
  const { isDarkMode } = useContext(ThemeContext);
  const [magnetometerData, setMagnetometerData] = useState(null);
  const angle = useState(new Animated.Value(0))[0];

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (magnetometerData) {
      const newAngle = -_degree(magnetometerData);
      Animated.timing(angle, {
        toValue: newAngle,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [magnetometerData]);

  const _toggle = () => {
    if (magnetometerData) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    Magnetometer.setUpdateInterval(1000);
    Magnetometer.addListener((data) => {
      setMagnetometerData(data);
    });
  };

  const _unsubscribe = () => {
    Magnetometer.removeAllListeners();
  };

  const _degree = (magnetometer) => {
    let { x, y } = magnetometer;
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = angle -90; // 90 Grad hinzufügen, um die Ausrichtung anzupassen

    // Sicherstellen, dass der Winkel zwischen 0 und 360 Grad bleibt
    if (angle > 360) {
      angle = angle - 360;
    } else if (angle < 0) {
      angle = angle + 360;
    }

    return angle;
  };

  const rotate = angle.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  // Aktuelle Gradzahl berechnen
  const currentDegree = magnetometerData ? _degree(magnetometerData).toFixed(2) : 'Keine Daten';

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.heading, isDarkMode ? styles.darkText : styles.lightText]}>Compass</Text>
      <View style={styles.compassContainer}>
        <Animated.Image
          source={isDarkMode ? require('../../assets/compass_needle_dark.png') : require('../../assets/compass_needle.png')}
          style={[styles.needle, { transform: [{ rotate }] }]}
        />
        <View style={styles.compassDirection}>
          <Text style={[styles.directionText, styles.north, isDarkMode ? styles.darkText : styles.lightText]}>N</Text>
          <Text style={[styles.directionText, styles.east, isDarkMode ? styles.darkText : styles.lightText]}>E</Text>
          <Text style={[styles.directionText, styles.south, isDarkMode ? styles.darkText : styles.lightText]}>S</Text>
          <Text style={[styles.directionText, styles.west, isDarkMode ? styles.darkText : styles.lightText]}>W</Text>
        </View>
      </View>

      {/* Gradposition unterhalb des Kompasses anzeigen */}
      <Text style={[styles.degreeText, isDarkMode ? styles.darkText : styles.lightText]}>
        Aktuelle Gradposition: {currentDegree}°
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
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  compassContainer: {
    position: 'relative',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  needle: {
    position: 'absolute',
    width: 200,
    height: 200,
  },
  compassDirection: {
    position: 'absolute',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionText: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
  },
  north: { top: 10 },
  east: { right: 10 },
  south: { bottom: 10 },
  west: { left: 10 },
  degreeText: {
    fontSize: 18,
    marginTop: 20,  // Abstand zum Kompass
  },
});
