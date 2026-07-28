import { View, Text, StyleSheet } from 'react-native';

export default function ReportsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sales Reports</Text>
      <Text style={styles.text}>
        View sales, profit and business reports here.
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