import { View, Text, StyleSheet } from 'react-native';

export default function PaymentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payments</Text>
      <Text style={styles.text}>
        Track income and expenses here.
      </Text>
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