import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import BarcodeScannerScreen from "./src/screens/BarcodeScannerScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BarcodeScannerScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
