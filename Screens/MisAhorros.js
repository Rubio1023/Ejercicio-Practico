import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../supabase';

export default function MisAhorros({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [monto, setMonto] = useState('');

  const guardarAhorro = async () => {
    if (!usuario || !monto) {
      Alert.alert("Error", "Debes ingresar usuario y monto");
      return;
    }

    const { data, error } = await supabase
      .from('ahorros')
      .insert([{ usuario, monto: parseFloat(monto) }]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Éxito", "Ahorro guardado");
      setUsuario('');
      setMonto('');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Usuario:</Text>
      <TextInput
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Ingresa tu usuario"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Text>Monto:</Text>
      <TextInput
        value={monto}
        onChangeText={setMonto}
        placeholder="Ingresa el monto"
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Guardar Ahorro" onPress={guardarAhorro} />
      <Button title="Ver Todos los Ahorros" onPress={() => navigation.navigate("TodosAhorros")} />
    </View>
  );
}
