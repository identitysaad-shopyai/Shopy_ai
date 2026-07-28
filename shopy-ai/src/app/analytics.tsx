import { View, Text, StyleSheet } from 'react-native';

export default function AnalyticsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics</Text>
      <Text style={styles.text}>
        Growth trends and business analytics here.
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