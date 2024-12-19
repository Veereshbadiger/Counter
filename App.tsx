import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';

const CounterApp = () => {
  const [count, setCount] = useState(0);
  const [countLimit, setCountLimit] = useState(null); // State for count limit
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [inputValue, setInputValue] = useState(''); // State for input field

  // Increment function with count limit check
  const incrementCount = () => {
    if (countLimit === null || count < countLimit) {
      setCount(count + 1);
    }
  };

  // Decrement function
  const decreementCount = () => {
    setCount((prevCount) => Math.max(0, prevCount - 1));
  };

  // Reset function
  const resetCount = () => {
    setCount(0);
  };

  // Function to handle count limit submission
  const handleSetLimit = () => {
    const limit = parseInt(inputValue, 10);
    if (!isNaN(limit) && limit >= 0) {
      setCountLimit(limit);
    }
    setModalVisible(false); // Close the modal
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
        <TouchableOpacity onPress={() => console.log('Menu Pressed')} style={styles.button}>
          <Text style={styles.buttonText}>⚙</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decreementCount} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

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

// Styles
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
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
