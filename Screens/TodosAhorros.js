import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { supabase } from '../supabase';

export default function TodosAhorros() {
  const [ahorros, setAhorros] = useState([]);

  useEffect(() => {
    obtenerAhorros();
  }, []);

  const obtenerAhorros = async () => {
    const { data, error } = await supabase.from('ahorros').select('*');
    if (!error) {
      setAhorros(data);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Todos los Ahorros</Text>
      <FlatList
        data={ahorros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.usuario} - ${item.monto}</Text>
        )}
      />
    </View>
  );
}
