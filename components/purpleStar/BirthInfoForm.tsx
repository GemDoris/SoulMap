import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PurpleStarBirthInfo } from '../../types/purpleStar';

interface PurpleStarBirthInfoFormProps {
  onSubmit: (info: PurpleStarBirthInfo) => void;
}

export default function PurpleStarBirthInfoForm({ onSubmit }: PurpleStarBirthInfoFormProps) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const handleSubmit = () => {
    onSubmit({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      gender,
    });
  };

  return (
    <View style={styles.container}>
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

      <SegmentedButtons
        value={gender}
        onValueChange={value => setGender(value as 'male' | 'female')}
        buttons={[
          { value: 'male', label: '男' },
          { value: 'female', label: '女' }
        ]}
        style={styles.gender}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
      >
        生成命盘
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
  gender: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
}); 