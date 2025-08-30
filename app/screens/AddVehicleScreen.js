// screens/AddVehicleScreen.js
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';
import { userVehicles } from '../data/mockData';

export default function AddVehicleScreen({ navigation }) {
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [km, setKm] = useState('');
  const [type, setType] = useState('sedan');

  const handleSave = () => {
    if (!model || !plate || !year || !color || !km) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newVehicle = {
      id: `vehicle_${Math.random().toString()}`,
      model,
      licensePlate: plate,
      type,
      year,
      color,
      km,
    };

    userVehicles.push(newVehicle);

    // MUDANÇA AQUI: Apenas exibe o alerta e volta para a tela anterior.
    Alert.alert('Sucesso!', 'Veículo cadastrado.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Cadastrar Novo Veículo</Text>
        
        <TextInput style={styles.input} placeholder="Modelo (ex: Honda Civic)" value={model} onChangeText={setModel} placeholderTextColor={COLORS.gray}/>
        <TextInput style={styles.input} placeholder="Placa (ex: ABC-1234)" value={plate} onChangeText={setPlate} autoCapitalize="characters" placeholderTextColor={COLORS.gray}/>
        <TextInput style={styles.input} placeholder="Ano (ex: 2022)" value={year} onChangeText={setYear} keyboardType="numeric" placeholderTextColor={COLORS.gray}/>
        <TextInput style={styles.input} placeholder="Cor (ex: Preto)" value={color} onChangeText={setColor} placeholderTextColor={COLORS.gray}/>
        <TextInput style={styles.input} placeholder="Quilometragem (ex: 15000)" value={km} onChangeText={setKm} keyboardType="numeric" placeholderTextColor={COLORS.gray}/>

        <Text style={styles.typeLabel}>Tipo de Veículo:</Text>
        <View style={styles.typeContainer}>
          {['hatch', 'sedan', 'suv'].map(vehicleType => (
            <TouchableOpacity 
              key={vehicleType}
              style={[styles.typeButton, type === vehicleType && styles.selectedTypeButton]}
              onPress={() => setType(vehicleType)}
            >
              <Text style={[styles.typeButtonText, type === vehicleType && styles.selectedTypeText]}>{vehicleType.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar Veículo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  scrollContent: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 30, textAlign: 'center' },
  input: { width: '100%', height: 50, backgroundColor: COLORS.white, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: '#ddd', color: COLORS.secondary },
  typeLabel: { fontSize: 16, color: COLORS.secondary, fontWeight: '600', marginBottom: 10, marginTop: 5 },
  typeContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  typeButton: { paddingVertical: 10, paddingHorizontal: 20, borderWidth: 1, borderColor: COLORS.gray, borderRadius: 20 },
  selectedTypeButton: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  typeButtonText: { color: COLORS.secondary, fontWeight: '600' },
  selectedTypeText: { color: COLORS.white },
  button: { width: '100%', height: 50, backgroundColor: COLORS.accent, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  buttonText: { color: COLORS.secondary, fontSize: 18, fontWeight: 'bold' },
});