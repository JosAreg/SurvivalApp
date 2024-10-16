import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LightSensor } from 'expo-sensors';
import { ThemeContext } from '../../App'; // Import the ThemeContext

export default function LightMeter() {
  const { isDarkMode } = useContext(ThemeContext); // Use the ThemeContext
  const [lightData, setLightData] = useState(null);

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (lightData) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    LightSensor.setUpdateInterval(1000);
    LightSensor.addListener(data => {
      setLightData(data.illuminance);
    });
  };

  const _unsubscribe = () => {
    LightSensor.removeAllListeners();
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
        {lightData !== null ? `${lightData.toFixed(2)} lx` : 'No Data'}
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
