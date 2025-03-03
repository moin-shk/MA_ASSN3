import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FactScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [day, setDay] = useState("");
  const [fact, setFact] = useState("");

  useEffect(() => {
    const monthNum = parseInt(selectedMonth, 10);
    const dayNum = parseInt(day, 10);

    // Validate that month and day are within valid ranges
    if (
      !isNaN(monthNum) &&
      !isNaN(dayNum) &&
      monthNum >= 1 && monthNum <= 12 &&
      dayNum >= 1 && dayNum <= 31
    ) {
      // Make the API call automatically when both inputs are valid.
      fetch(`https://numbers1.p.rapidapi.com/${monthNum}/${dayNum}/date`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
          'X-RapidAPI-Host': 'numbers1.p.rapidapi.com',
        },
      })
        .then(response => response.text())
        .then(result => {
          setFact(result);
        })
        .catch(error => {
          console.error('Error fetching fact:', error);
          setFact('Error fetching fact. Please try again.');
        });
    } else {
      // Clear the fact if inputs are incomplete or invalid.
      setFact('');
    }
  }, [selectedMonth, day]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discover an Interesting Fact!</Text>
      <View style={styles.form}>
        {/* Month selection dropdown */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Month" value="" />
            <Picker.Item label="January" value="1" />
            <Picker.Item label="February" value="2" />
            <Picker.Item label="March" value="3" />
            <Picker.Item label="April" value="4" />
            <Picker.Item label="May" value="5" />
            <Picker.Item label="June" value="6" />
            <Picker.Item label="July" value="7" />
            <Picker.Item label="August" value="8" />
            <Picker.Item label="September" value="9" />
            <Picker.Item label="October" value="10" />
            <Picker.Item label="November" value="11" />
            <Picker.Item label="December" value="12" />
          </Picker>
        </View>
        {/* Day input */}
        <TextInput
          style={styles.input}
          placeholder="Day (1-31)"
          keyboardType="numeric"
          value={day}
          onChangeText={text => setDay(text)}
        />
      </View>
      {fact !== '' && (
        <View style={styles.factContainer}>
          <Text style={styles.factText}>{fact}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
    alignItems: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 5,
  },
  factContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  factText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FactScreen;
