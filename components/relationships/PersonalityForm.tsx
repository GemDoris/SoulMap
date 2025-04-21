import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, SegmentedButtons, Menu } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PersonalityInfo, MBTIType } from '../../types/relationships';

interface PersonalityFormProps {
  onSubmit: (info: PersonalityInfo) => void;
  title: string;
}

const MBTI_TYPES: MBTIType[] = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

export default function PersonalityForm({ onSubmit, title }: PersonalityFormProps) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showMBTIMenu, setShowMBTIMenu] = useState(false);
  const [mbti, setMBTI] = useState<MBTIType>();
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleSubmit = () => {
    onSubmit({
      mbti,
      birthInfo: {
        date: date.toISOString().split('T')[0],
        time: date.toTimeString().split(' ')[0],
        location,
        latitude,
        longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={title}
        value={title}
        disabled
        style={styles.input}
      />

      <Menu
        visible={showMBTIMenu}
        onDismiss={() => setShowMBTIMenu(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setShowMBTIMenu(true)}
            style={styles.input}
          >
            {mbti || '选择MBTI类型'}
          </Button>
        }
      >
        {MBTI_TYPES.map((type) => (
          <Menu.Item
            key={type}
            onPress={() => {
              setMBTI(type);
              setShowMBTIMenu(false);
            }}
            title={type}
          />
        ))}
      </Menu>

      <Button
        mode="outlined"
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        {date.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </Button>

      <Button
        mode="outlined"
        onPress={() => setShowTimePicker(true)}
        style={styles.input}
      >
        {date.toLocaleTimeString('zh-CN', {
          hour: 'numeric',
          minute: 'numeric'
        })}
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
        确认信息
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
    height: 48,
  },
}); 