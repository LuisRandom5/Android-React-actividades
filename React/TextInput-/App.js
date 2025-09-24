import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Dimensions } from 'react-native';
import React, {useState} from 'react';

export default function App() {
  // Estados para usuario, contraseña y mensaje final
  const [usuario, setUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [colorMensaje, setColorMensaje] = useState('black')

  // Credenciales predeterminadas
  const USUARIO_CORRECTO = 'admin'
  const CONTRASEÑA_CORRECTA = '1234'

  // Verificar las credenciales
  const verificarLogin = () => {
    if (usuario === USUARIO_CORRECTO && contraseña === CONTRASEÑA_CORRECTA) {
      // Login exitoso - texto verde
      setMensaje('ACCESO PERMITIDO')
      setColorMensaje('green')
    } else {
      // Login fallido - texto rojo
      setMensaje('ACCESO DENEGADO')
      setColorMensaje('red')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview} contentContainerStyle={styles.scrollContent}>
        
        {/* Título de la app */}
        <Text style={styles.titulo}>LOGIN </Text>
        
        {/* Instrucciones (se muestran en pantalla) */}
        <Text style={styles.instrucciones}>
          Usuario: admin{'\n'}
          Contraseña: 1234
        </Text>

        {/* Campo de usuario */}
        <Text style={styles.etiqueta}>Usuario:</Text>
        <TextInput 
          style={styles.input}
          placeholder='Ingresa tu usuario'
          value={usuario}
          onChangeText={setUsuario}
        />

        {/* Campo de contraseña  (con la contraseña oculta)*/}
        <Text style={styles.etiqueta}>Contraseña:</Text>
        <TextInput 
          style={styles.input}
          placeholder='Ingresa tu contraseña'
          value={contraseña}
          onChangeText={setContraseña}
          secureTextEntry={true} // Oculta la contraseña
        />

        {/* Botón de login */}
        <Button 
          title='INICIAR SESIÓN'
          onPress={verificarLogin}
        />

        {/* Mensaje de resultado (verde o rojo según el caso) */}
        {mensaje !== '' && (
          <Text style={[styles.mensaje, {color: colorMensaje}]}>
            {mensaje}
          </Text>
        )}

      </ScrollView>
    </View>
  );
}
// Estilos de fondo y letras 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview: {
    width: Dimensions.get('window').width,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Dimensions.get('window').height - 100,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  instrucciones: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 15,
    marginBottom: 5,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  mensaje: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  }
});