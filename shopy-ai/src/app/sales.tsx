import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SalesScreen() {
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
const [paymentMethod, setPaymentMethod] = useState('Cash');
  const total =
    (Number(quantity) || 0) * (Number(price) || 0);
const saveSale = async () => {
  const saleData = {
    id: Date.now(),
    customerName,
    customerMobile,
    productName,
    quantity,
    price,
    total,
    paymentMethod,
    date: new Date().toLocaleString(),
  };

  try {
    const oldSales = await AsyncStorage.getItem('sales');

    const sales = oldSales ? JSON.parse(oldSales) : [];

    sales.push(saleData);

    await AsyncStorage.setItem(
      'sales',
      JSON.stringify(sales)
    );

    alert('Sale Saved Successfully');

    resetForm();

  } catch (error) {
    console.log(error);
    alert('Error saving sale');
  }
};

const resetForm = () => {
  setCustomerName('');
  setCustomerMobile('');
  setProductName('');
  setQuantity('');
  setPrice('');
  setPaymentMethod('Cash');
};
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sales Entry</Text>

      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
      />

      <TextInput
        style={styles.input}
        placeholder="Customer Mobile"
        keyboardType="phone-pad"
        value={customerMobile}
        onChangeText={setCustomerMobile}
      />

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.total}>
        Total: ₹{total}
      </Text>
      <Text style={styles.paymentTitle}>
  Payment Method
</Text>

<View style={styles.paymentRow}>

  {['Cash', 'UPI', 'Card'].map((method) => (
    <Pressable
      key={method}
      onPress={() => setPaymentMethod(method)}
      style={[
        styles.paymentButton,
        paymentMethod === method && styles.paymentActive
      ]}
    >
      <Text style={styles.paymentText}>
        {method}
      </Text>
    </Pressable>
  ))}

</View>

<Pressable
  style={styles.saveButton}
  onPress={saveSale}
>
  <Text style={styles.saveText}>
    Save Sale
  </Text>
</Pressable>

<Pressable
  style={styles.resetButton}
  onPress={resetForm}
>
  <Text style={styles.resetText}>
    Reset
  </Text>
</Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({  paymentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 20,
    marginBottom: 10,
  },

  paymentRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  paymentButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
  },

  paymentActive: {
    backgroundColor: '#0274DF',
  },

  paymentText: {
    fontWeight: '600',
    color: '#0F172A',
  },

  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  resetButton: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 30,
  },

  resetText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
    marginTop: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
  },

  total: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0274DF',
    marginTop: 20,
  },
});