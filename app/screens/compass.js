import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { ThemeContext } from '../../ThemeContext'; // Import the ThemeContext

export default function Compass() {
  const { isDarkMode } = useContext(ThemeContext);
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const angle = useState(new Animated.Value(0))[0];

  useEffect(() => {
    _subscribe();
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
    return angle >= 0 ? angle : angle + 360;
  };

  const rotate = angle.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

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
          {[0, 90, 180, 270].map((deg) => (
            <Text key={deg} style={[styles.degreeText, isDarkMode ? styles.darkText : styles.lightText, {
              transform: [
                { rotate: `${deg - 90}deg` },
                { translateX: 80 }, // Kleinere Translation für Gradangaben
                { rotate: `${90 - deg}deg` },
              ],
            }]}>
              {deg === 0 ? '0°' : `${deg}°`}
            </Text>
          ))}
        </View>
      </View>
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
    position: 'absolute',
    fontSize: 16,
    color: '#333',
  },
});
