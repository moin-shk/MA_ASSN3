import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FactScreen = () => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [fact, setFact] = useState('');

  useEffect(() => {
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);

    // Only make the API call if both inputs are valid numbers within range.
    if (
      !isNaN(monthNum) &&
      !isNaN(dayNum) &&
      monthNum >= 1 && monthNum <= 12 &&
      dayNum >= 1 && dayNum <= 31
    ) {
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
      // Clear the fact if the inputs are incomplete or invalid.
      setFact('');
    }
  }, [month, day]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discover an Interesting Fact!</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Month (1-12)"
          keyboardType="numeric"
          value={month}
          onChangeText={text => setMonth(text)}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 5,
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
