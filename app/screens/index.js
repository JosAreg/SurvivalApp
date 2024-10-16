import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../App';

export default function Home() {
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Compass')}>
        <Text style={styles.buttonText}>Compass</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Height')}>
        <Text style={styles.buttonText}>Height</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LightMeter')}>
        <Text style={styles.buttonText}>Light Meter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Speedometer')}>
        <Text style={styles.buttonText}>Speedometer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: 'purple',
    padding: 15,
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});
