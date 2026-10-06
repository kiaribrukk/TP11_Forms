import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  useRegistrationContext,
} from '../src/context/RegistrationContext';

export const ResumenInscripcion = () => {
  const {
    registrationData,
  } = useRegistrationContext();

  if (!registrationData) {
    return null;
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Datos guardados con Context
      </Text>

      <Text style={styles.text}>
        Nombre: {registrationData.nombreCompleto}
      </Text>

      <Text style={styles.text}>
        Email: {registrationData.email}
      </Text>

      <Text style={styles.text}>
        Edad: {registrationData.edad}
      </Text>

      <Text style={styles.text}>
        Entrada: {registrationData.tipoEntrada}
      </Text>

      <Text style={styles.text}>
        Teléfono: {registrationData.telefono || 'No ingresado'}
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111',
  },

  text: {
    fontSize: 15,
    marginBottom: 6,
    color: '#333',
  },
});