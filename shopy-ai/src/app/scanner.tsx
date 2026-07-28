import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState('');

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Camera Permission Required</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow Camera</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'code128', 'qr'],
        }}
        onBarcodeScanned={
          scanned
            ? undefined
            : ({ data }) => {
                setScanned(true);
                setBarcode(data);
              }
        }
      />

      <Text style={styles.result}>
        {barcode ? `Scanned: ${barcode}` : 'Scan a barcode'}
      </Text>

      {scanned && (
        <Pressable
          style={styles.button}
          onPress={() => {
            setScanned(false);
            setBarcode('');
          }}>
          <Text style={styles.buttonText}>Scan Again</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  camera: { flex: 1 },
  result: {
    padding: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#208AEF',
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
});