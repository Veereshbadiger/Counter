import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

// Settings Component
interface SettingsPageProps {
  onSaveSettings: (isVibrationEnabled: boolean, isSoundEnabled: boolean, selectedSound: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onSaveSettings }) => {
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [selectedSound, setSelectedSound] = useState('tap.mp3'); // Default sound file

  // Load sound for the default selected sound
  const loadSound = (soundFile: string) => {
    return new Sound(soundFile, Sound.MAIN_BUNDLE, (error: Error | null) => {
      if (error) {
        console.error('Failed to load sound', error);
      }
    });
  };

  const handleVibrationChange = (value: boolean) => {
    setIsVibrationEnabled(value);
  };

  const handleSoundChange = (value: boolean) => {
    setIsSoundEnabled(value);
  };

  const handleSaveSettings = () => {
    onSaveSettings(isVibrationEnabled, isSoundEnabled, selectedSound);
  };

  const handleSoundSelection = (soundFile: string) => {
    setSelectedSound(soundFile);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Enable Vibration</Text>
        <Switch value={isVibrationEnabled} onValueChange={handleVibrationChange} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Enable Sound</Text>
        <Switch value={isSoundEnabled} onValueChange={handleSoundChange} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Select Tap Sound</Text>
        {/* You can replace this with a file picker */}
        <TouchableOpacity onPress={() => handleSoundSelection('tap.mp3')} style={styles.soundOption}>
          <Text style={styles.soundOptionText}>Tap Sound 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSoundSelection('tap2.mp3')} style={styles.soundOption}>
          <Text style={styles.soundOptionText}>Tap Sound 2</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSaveSettings} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 18,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#00a4de',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  soundOption: {
    marginVertical: 5,
  },
  soundOptionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SettingsPage;
