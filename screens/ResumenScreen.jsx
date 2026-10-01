import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useRegistrationContext } from "../src/context/RegistrationContext";

export function ResumenScreen() {
  const { registrationData } = useRegistrationContext();

  if (!registrationData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          No hay una inscripción registrada.
        </Text>

        <Text style={styles.text}>
          Completá el formulario para ver tus datos.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Resumen de inscripción
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>
          {registrationData.nombre}
        </Text>

        <Text style={styles.label}>Apellido</Text>
        <Text style={styles.value}>
          {registrationData.apellido}
        </Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>
          {registrationData.email}
        </Text>

        <Text style={styles.label}>DNI</Text>
        <Text style={styles.value}>
          {registrationData.dni}
        </Text>

        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.value}>
          {registrationData.telefono}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
  },

  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#f2f2f2",
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },

  value: {
    fontSize: 16,
    marginTop: 4,
  },
});