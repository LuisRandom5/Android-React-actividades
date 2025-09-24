import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Texto = (props) =>{
 const {children, style} = props
   return(
     <Text style={[styles.red,style]}>{children}</Text>
)
}

export default function App() {
  return (
    <View style={styles.container}>
    <Text style={styles.titulo}>sexo777</Text>
    <Text>texto 2</Text>
    <Text>texto 3</Text>
    <Text style= {styles.red}> If Jesus is real, i belive</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
    color: '#f00',
  },
  titulo: {
    fontSize: 100,
    color:"#00f",
  },
});
