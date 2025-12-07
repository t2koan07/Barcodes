import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function BarcodeScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Sovellus tarvitsee kameran käyttöoikeuden.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Anna lupa</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = ({
    data,
    type,
  }: {
    data?: string;
    type: string;
  }) => {
    if (!data) {
      return;
    }

    setIsScanning(false);
    setLastScannedCode(data);
  };

  const handleScanAgain = () => {
    setLastScannedCode(null);
    setIsScanning(true);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8"],
        }}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>Skannaa viivakoodi</Text>

        {lastScannedCode ? (
          <>
            <Text style={styles.label}>Viivakoodin numero:</Text>
            <Text style={styles.code}>{lastScannedCode}</Text>

            <TouchableOpacity style={styles.button} onPress={handleScanAgain}>
              <Text style={styles.buttonText}>Skannaa uudelleen</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.info}>Suuntaa kamera EAN-viivakoodiin.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 12,
  },
  permissionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#000",
    borderRadius: 4,
  },
  permissionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    color: "#fff",
    marginTop: 4,
  },
  code: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  info: {
    color: "#fff",
  },
  button: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
