import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
type Sale = {
  id: number;
  customerName: string;
  productName: string;
  quantity: string;
  price: string;
  total: number;
  paymentMethod: string;
  date: string;
};
export default function ReportsScreen() {
  const [sales, setSales] = useState<Sale[]>([]);

useEffect(() => {
  loadSales();
}, []);

const loadSales = async () => {
  const data = await AsyncStorage.getItem('sales');
  if (data) {
    setSales(JSON.parse(data));
  }
};
  return (
    <View style={styles.container}>
  <Text style={styles.title}>Sales Reports</Text>

  <FlatList
    data={sales}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View
        style={{
          backgroundColor: "#F8FAFC",
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontWeight: "700" }}>
          {item.customerName}
        </Text>

        <Text>{item.productName}</Text>

        <Text>Total: ₹{item.total}</Text>

        <Text>{item.paymentMethod}</Text>

        <Text>{item.date}</Text>
      </View>
    )}
    ListEmptyComponent={
      <Text style={styles.text}>
        No sales found.
      </Text>
    }
  />
</View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:'#fff'
  },
  title:{
    fontSize:28,
    fontWeight:'700',
    marginTop:40
  },
  text:{
    marginTop:15,
    fontSize:16
  }
});