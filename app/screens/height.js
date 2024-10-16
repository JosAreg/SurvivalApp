import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Barometer } from 'expo-sensors';
import { ThemeContext } from '../../App';

export default function Height() {
  const { isDarkMode } = useContext(ThemeContext);
  const [barometerData, setBarometerData] = useState([]);
  const [averageAltitude, setAverageAltitude] = useState(null);

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (barometerData.length > 0) {
      const avg = barometerData.reduce((sum, pressure) => sum + _pressureToAltitude(pressure), 0) / barometerData.length;
      setAverageAltitude(avg.toFixed(2));
    }
  }, [barometerData]);

  const _toggle = () => {
    if (barometerData.length) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    Barometer.setUpdateInterval(1000);
    Barometer.addListener((data) => {
      setBarometerData(prevData => {
        const updatedData = [...prevData, data.pressure];
        if (updatedData.length > 10) {
          updatedData.shift();
        }
        return updatedData;
      });
    });
  };

  const _unsubscribe = () => {
    Barometer.removeAllListeners();
  };

  const _pressureToAltitude = (pressure) => {
    return (1 - Math.pow(pressure / 1013.25, 0.190284)) * 145366.45 * 0.3048; // in meters
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
        {averageAltitude !== null ? `${averageAltitude} m` : 'No Data'}
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
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  text: {
    fontSize: 48,
  },
});
