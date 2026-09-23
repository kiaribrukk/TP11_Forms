import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const TicketConfirmacion = ({ datos, onReset }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>🎟️ SONIDO SUR</Text>
      <Text style={styles.subHeader}>¡Inscripción Confirmada!</Text>
      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{datos.nombreCompleto}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{datos.email}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.value}>{datos.edad} años</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Entrada:</Text>
        <Text style={[styles.badge, datos.tipoEntrada === 'vip' ? styles.vip : styles.general]}>
          {datos.tipoEntrada ? datos.tipoEntrada.toUpperCase() : ''}
        </Text>
      </View>

      {datos.telefono ? (
        <View style={styles.row}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.value}>{datos.telefono}</Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text style={styles.buttonText}>Volver a inscribir a otra persona</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF007A',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 16,
    color: '#A6ADC8',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#313244',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 6,
  },
  label: {
    color: '#BAC2DE',
    fontSize: 14,
  },
  value: {
    color: '#CDD6F4',
    fontSize: 14,
    fontWeight: '600',
  },
  badge: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  general: {
    backgroundColor: '#89B4FA',
    color: '#11111B',
  },
  vip: {
    backgroundColor: '#F9E2AF',
    color: '#11111B',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#FF007A',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});