import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';

const buttons = [
  ['C', '(', ')', '%'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['+/-', '0', '.', '+'],
  ['='],
];

export default function App() {
  const [currentInput, setCurrentInput] = useState("0");

  const handlePress = (btn) => {
    if (btn === 'C') {
      setCurrentInput("0");
    } else if (btn === '=') {
      try {
        let evalResult = eval(currentInput);
        setCurrentInput(evalResult.toString());
      } catch (error) {
        setCurrentInput("Error");
      }
    } else if (btn === '+/-') {
      if (currentInput.startsWith('-')) {
        setCurrentInput(currentInput.slice(1));
      } else {
        setCurrentInput('-' + currentInput);
      }
    } else {
      setCurrentInput((prev) =>
        prev === "0" ? btn : prev + btn
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{currentInput}</Text>
      </View>
      <View style={styles.buttoncontainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={[
                  styles.button,
                  btn === '=' && { backgroundColor: '#674b1dff' },
                  btn === 'C' && { backgroundColor: '#712820ff' }
                ]}
                onPress={() => handlePress(btn)}
              >
                <Text style={[styles.buttonText, btn === '=' && { fontSize: 28 }]}>
                  {btn}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3a577bff',
    justifyContent: 'space-between',
  },
  resultContainer: {
    minHeight: 240,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    paddingBottom:20,
    backgroundColor: '#25334bff',
  },
  resultText: {
    fontSize: 50,
    color: '#92662aff',
  },
  buttoncontainer: {
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  button: {
    backgroundColor: '#25334bff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: 70,
    borderRadius: 35,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});
