import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Vibration, Alert } from 'react-native';
import Sound from 'react-native-sound';
import SettingsPage from './src/screens/settings';

const CounterApp = () => {
  const [count, setCount] = useState(0);
  const [countLimit, setCountLimit] = useState<number | null>(null); // State for count limit
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [inputValue, setInputValue] = useState(''); // State for input field
  const [settingsVisible, setSettingsVisible] = useState(false); // State for settings modal visibility
  const [selectedSound, setSelectedSound] = useState('tap.mp3'); // Default sound file

  // Load sound for the selected sound
  const loadSound = (soundFile: string) => {
    return new Sound(soundFile, Sound.MAIN_BUNDLE, (error: Error | null) => {
      if (error) {
        console.error('Failed to load sound', error);
      }
    });
  };

  // Increment function with count limit check
  const incrementCount = () => {
    if (countLimit === null || count < countLimit) {
      setCount(count + 1);
    }

    const sound = loadSound(selectedSound);
    sound.play(); // Play the selected sound when tapping
  };

  const handleSettingsTap = () => {
    setSettingsVisible(true); // Show settings modal
  };

  // Decrement function
  const decreementCount = () => {
    setCount((prevCount) => Math.max(0, prevCount - 1));
    Vibration.vibrate(200); // Stronger vibration for settings
    const sound = loadSound(selectedSound);
    sound.play(); // Play sound for settings button
  };

  // Reset function
  const resetCount = () => {
    setCount(0);
  };

  // Function to handle count limit submission with error feedback
  const handleSetLimit = () => {
    const limit = parseInt(inputValue, 10);
    if (isNaN(limit) || limit < 0) {
      Alert.alert('Invalid input', 'Please enter a valid positive number for the count limit');
    } else {
      setCountLimit(limit);
      setModalVisible(false); // Close the modal
    }
  };

  // Close the settings modal and apply selected sound
  const closeSettingsModal = (isVibrationEnabled: boolean, isSoundEnabled: boolean, selectedSound: string) => {
    setSettingsVisible(false); // Close settings modal
    setSelectedSound(selectedSound); // Update the selected sound
    console.log('Vibration Enabled:', isVibrationEnabled, 'Sound Enabled:', isSoundEnabled, 'Selected Sound:', selectedSound);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableContainer}
        onPress={incrementCount}
        onLongPress={resetCount}
        delayLongPress={500} // Optional long press delay
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.subtitle}>Counter</Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.counter}>{count}</Text>
          {countLimit !== null && (
            <Text style={styles.limitText}>Limit: {countLimit}</Text>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={incrementCount} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)} // Open the modal
          style={styles.button}
        >
          <Text style={styles.buttonText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettingsTap} style={styles.button}>
          <Text style={styles.buttonText}>⚙</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decreementCount} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Page Modal - Half-Card Style */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsVisible}
        onRequestClose={() => setSettingsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SettingsPage onSaveSettings={closeSettingsModal} />
          </View>
        </View>
      </Modal>

      {/* Modal for setting the count limit */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Count Limit</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter count limit"
              keyboardType="numeric"
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Set" onPress={handleSetLimit} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles for Half-Card Modal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00a4de',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
  },
  counter: {
    fontSize: 100,
    fontWeight: '200',
    color: '#fff',
    marginVertical: 20,
  },
  limitText: {
    fontSize: 16,
    color: '#ffb74d',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '50%', // Make modal take half the screen height
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default CounterApp;
