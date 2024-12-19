import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button, Alert, Vibration } from 'react-native';
import Sound from 'react-native-sound';
import DocumentPicker from 'react-native-document-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const CounterApp = () => {
  const [count, setCount] = useState(0);
  const [selectedSound, setSelectedSound] = useState<string | null>(null); // Sound file state
  const [settingsVisible, setSettingsVisible] = useState(false); // Settings modal state

  // Function to request permission for reading external storage
  const requestPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (result === RESULTS.GRANTED) {
        console.log('Permission granted');
      } else {
        Alert.alert('Permission denied', 'Please allow access to media files');
      }
    } catch (error) {
      console.error('Permission request failed:', error);
    }
  };

  // Function to handle the sound selection
  const handleSelectSound = async () => {
    try {
      // Request permission before accessing files
      await requestPermission();

      // Open file picker to select a sound file
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      // Set the selected sound file path
      setSelectedSound(res.uri);
      console.log('Selected sound file:', res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled sound selection');
      } else {
        console.error('Failed to pick a sound:', err);
      }
    }
  };

  // Play the selected sound if available
  const playSound = () => {
    if (selectedSound) {
      const sound = new Sound(selectedSound, Sound.MAIN_BUNDLE, (error: Error | null) => {
        if (error) {
          console.error('Failed to load sound', error);
        } else {
          sound.play();
        }
      });
    } else {
      Alert.alert('No sound selected', 'Please select a tap sound first');
    }
  };

  // Increment count and play sound
  const incrementCount = () => {
    setCount(count + 1);
    playSound();
  };

  const handleSettingsTap = () => {
    setSettingsVisible(true); // Show settings modal
  };

  // Decrement count
  const decrementCount = () => {
    setCount(Math.max(0, count - 1));
    Vibration.vibrate(200); // Vibrate on decrement
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter: {count}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={incrementCount} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decrementCount} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettingsTap} style={styles.button}>
          <Text style={styles.buttonText}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsVisible}
        onRequestClose={() => setSettingsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Tap Sound</Text>
            <Button title="Choose Sound" onPress={handleSelectSound} />
            <Button title="Close" onPress={() => setSettingsVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 10,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 20,
    borderRadius: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CounterApp;
