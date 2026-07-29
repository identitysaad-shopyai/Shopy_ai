import { View, Text, StyleSheet } from 'react-native';

export default function InventoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      <Text style={styles.subtitle}>
        Manage your shop stock here
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>📦 Products</Text>
        <Text style={styles.cardText}>➕ Add Product</Text>
        <Text style={styles.cardText}>📊 Stock Report</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#64748B',
  },
  card: {
    marginTop: 30,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#F5F3FF',
    gap: 15,
  },
  cardText: {
    fontSize: 18,
  },
});