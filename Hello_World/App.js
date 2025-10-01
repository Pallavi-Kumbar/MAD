import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3e8da3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize:40,
    fontStyle:"italic",
    color:"#972d16ff",
    fontWeight: "bold",
  }
});
