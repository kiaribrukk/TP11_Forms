import { useRegistrationContext } from "../src/context/RegistrationContext";
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CampoFormulario } from '../components/CampoFormulario';
import { TicketConfirmacion } from '../components/TicketConfirmacion';

const LAST_EMAIL_KEY = '@sonidosur_last_email';

export const InscripcionScreen = () => {
  const [datosInscripcion, setDatosInscripcion] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nombreCompleto: '',
      email: '',
      edad: '',
      tipoEntrada: '',
      telefono: '',
    },
  });

  useEffect(() => {
    const precargarEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem(LAST_EMAIL_KEY);
        if (savedEmail) {
          setValue('email', savedEmail, { shouldValidate: true });
        }
      } catch (e) {
        console.error('Error al cargar email desde AsyncStorage', e);
      }
    };
    precargarEmail();
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await AsyncStorage.setItem(LAST_EMAIL_KEY, data.email.trim());
    } catch (e) {
      console.error('Error al guardar en AsyncStorage', e);
    }

    setTimeout(() => {
      setLoading(false);
      setDatosInscripcion(data);
    }, 1000);
  };

  const handleReset = () => {
    setDatosInscripcion(null);
    reset({
      nombreCompleto: '',
      email: '',
      edad: '',
      tipoEntrada: '',
      telefono: '',
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!datosInscripcion ? (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Inscripción Sonido Sur</Text>

            {}
            <Controller
              control={control}
              name="nombreCompleto"
              rules={{
                required: 'Ingresá tu nombre completo',
                validate: (v) =>
                  (v && v.trim().length >= 3) || 'Ingresá tu nombre completo',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CampoFormulario
                  label="Nombre Completo *"
                  placeholder="Ej: Sofía Pérez"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.nombreCompleto?.message}
                />
              )}
            />

            {}
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Ingresá un email válido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Ingresá un email válido',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CampoFormulario
                  label="Email *"
                  placeholder="ejemplo@correo.com"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                />
              )}
            />

            {}
            <Controller
              control={control}
              name="edad"
              rules={{
                required: 'La edad tiene que ser mayor a 12',
                validate: (v) => {
                  const num = Number(v);
                  return (
                    (!isNaN(num) && num >= 12 && num <= 99) ||
                    'La edad tiene que ser mayor a 12'
                  );
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CampoFormulario
                  label="Edad *"
                  placeholder="Ej: 22"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.edad?.message}
                />
              )}
            />

            {}
            <View style={styles.pickerSection}>
              <Text style={styles.label}>Tipo de Entrada *</Text>
              <Controller
                control={control}
                name="tipoEntrada"
                rules={{ required: 'Elegí un tipo de entrada' }}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.selectorGroup}>
                    <TouchableOpacity
                      style={[
                        styles.optionBtn,
                        value === 'general' && styles.optionSelected,
                      ]}
                      onPress={() => onChange('general')}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          value === 'general' && styles.optionTextSelected,
                        ]}
                      >
                        General
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.optionBtn,
                        value === 'vip' && styles.optionSelected,
                      ]}
                      onPress={() => onChange('vip')}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          value === 'vip' && styles.optionTextSelected,
                        ]}
                      >
                        VIP ⭐
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.tipoEntrada ? (
                <Text style={styles.errorText}>{errors.tipoEntrada.message}</Text>
              ) : null}
            </View>

            {}
            <Controller
              control={control}
              name="telefono"
              rules={{
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Solo se permiten números',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CampoFormulario
                  label="Teléfono (Opcional)"
                  placeholder="Ej: 1112345678"
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.telefono?.message}
                />
              )}
            />

            {}
            <TouchableOpacity
              style={[
                styles.submitBtn,
                (!isValid || loading) && styles.submitBtnDisabled,
              ]}
              disabled={!isValid || loading}
              onPress={handleSubmit(onSubmit)}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.submitBtnText}>Confirmar inscripción</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <TicketConfirmacion datos={datosInscripcion} onReset={handleReset} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  formContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111',
    textAlign: 'center',
  },
  pickerSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  selectorGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  optionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  optionSelected: {
    backgroundColor: '#FF007A',
    borderColor: '#FF007A',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  optionTextSelected: {
    color: '#FFF',
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 12,
    marginTop: 4,
  },
  submitBtn: {
    backgroundColor: '#FF007A',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitBtnDisabled: {
    backgroundColor: '#A0A0A0',
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});