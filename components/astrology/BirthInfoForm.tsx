import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BirthInfo } from '../../types/astrology';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface BirthInfoFormProps {
  onSubmit: (info: BirthInfo) => void;
}

export default function BirthInfoForm({ onSubmit }: BirthInfoFormProps) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleSubmit = () => {
    onSubmit({
      date: date.toISOString().split('T')[0],
      time: date.toTimeString().split(' ')[0],
      latitude,
      longitude,
      location,
    });
  };

  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        {date.toLocaleDateString()}
      </Button>

      <Button
        mode="outlined"
        onPress={() => setShowTimePicker(true)}
        style={styles.input}
      >
        {date.toLocaleTimeString()}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          onChange={(event, selectedDate) => {
            setShowTimePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <GooglePlacesAutocomplete
        placeholder="输入出生地点"
        onPress={(data, details) => {
          if (details) {
            setLocation(data.description);
            setLatitude(details.geometry.location.lat);
            setLongitude(details.geometry.location.lng);
          }
        }}
        query={{
          key: 'YOUR_GOOGLE_PLACES_API_KEY',
          language: 'zh-CN',
        }}
        styles={{
          container: styles.placesContainer,
          textInput: styles.placesInput,
        }}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
      >
        生成星盘
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  placesContainer: {
    flex: 0,
    marginBottom: 16,
  },
  placesInput: {
    fontSize: 16,
  },
}); 