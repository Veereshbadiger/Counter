import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CounterApp = () => {
  const [count, setCount] = useState(0);

  // Function to increment count
  const incrementCount = () => {
    setCount(count + 1);
  };
  const decreementCount = () => {
    setCount(count - 1);
    if(count <= 0){
      setCount(0);
    }
  };

  // Function to reset count on long press
  const resetCount = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableContainer}
        onPress={incrementCount}
        onLongPress={resetCount}
        delayLongPress={500} // Optional long press delay
      >
        <View style={[{alignItems: 'center'},{marginBottom: 20}]}>
        <Text >New Group</Text>
          <Text style={styles.subtitle}>New Counter</Text>
          </View>
        <View style={styles.innerContainer}>
          
          <Text style={styles.counter}>{count}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={incrementCount} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Menu Pressed')} style={styles.button}>
          <Text style={styles.buttonText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Settings Pressed')} style={styles.button}>
          <Text style={styles.buttonText}>⚙</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decreementCount} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default CounterApp;
