import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet } from 'react-native';

export default function Index() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [fact, setFact] = useState('');

  useEffect(() => {
    async function fetchFact() {
      const monthNum = parseInt(month, 10);
      const dayNum = parseInt(day, 10);
      if (!isNaN(monthNum) && !isNaN(dayNum) && monthNum >= 1 && monthNum <= 12 && dayNum >= 1 && dayNum <= 31) {
        try {
          const response = await fetch(`https://numbersapi.p.rapidapi.com/6/21/date`, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'cfd2fdb1f1msh5b9c04f88069952p1daff8jsn8f5d05e584b7',
              'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com',
            }
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.text();
          setFact(result);
        } catch (error) {
          console.error('Error fetching fact:', error);
          setFact('Error fetching fact. Please try again.');
        }
      } else {
        setFact('');
      }
    }
    fetchFact();
  }, [month, day]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Discover an Interesting Fact!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Month (1-12)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={month}
          onChangeText={setMonth}
        />
        <TextInput
          style={styles.input}
          placeholder="Day (1-31)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={day}
          onChangeText={setDay}
        />
      </View>
      {fact !== '' && (
        <View style={styles.factContainer}>
          <Text style={styles.factText}>{fact}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    width: '45%',
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  factContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  factText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});
