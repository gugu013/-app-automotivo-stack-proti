// screens/EditVehicleScreen.js
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';
import { userVehicles } from '../data/mockData';

export default function EditVehicleScreen({ route, navigation }) {
  // Recebe o veículo que foi enviado da tela anterior
  const { vehicle } = route.params;

  // Inicia o estado do formulário com os dados atuais do veículo
  const [model, setModel] = useState(vehicle.model);
  const [plate, setPlate] = useState(vehicle.licensePlate);
  const [year, setYear] = useState(vehicle.year);
  const [color, setColor] = useState(vehicle.color);
  const [km, setKm] = useState(vehicle.km);
  const [type, setType] = useState(vehicle.type);

  const handleSave = () => {
    if (!model || !plate || !year || !color || !km) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Encontra o índice do veículo que estamos editando no array original
    const vehicleIndex = userVehicles.findIndex(v => v.id === vehicle.id);

    // Se o veículo for encontrado, atualiza seus dados
    if (vehicleIndex > -1) {
      userVehicles[vehicleIndex] = {
        ...userVehicles[vehicleIndex], // Mantém o ID e outras propriedades não editadas
        model,
        licensePlate: plate,
        type,
        year,
        color,
        km,
      };
    }

    Alert.alert('Sucesso!', 'Veículo atualizado.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Editar Veículo</Text>
        
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
          <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Os estilos são os mesmos da tela AddVehicleScreen para manter a consistência
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.secondary
  },
  scrollContent: { 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: COLORS.white,
    marginBottom: 30, 
    textAlign: 'center' 
  },
  input: { 
    width: '100%', 
    height: 50, 
    backgroundColor: COLORS.primary,
    borderRadius: 8, 
    paddingHorizontal: 15, 
    fontSize: 16, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: COLORS.gray,
    color: COLORS.white
  },
  typeLabel: { 
    fontSize: 16, 
    color: COLORS.white,
    fontWeight: '600', 
    marginBottom: 10, 
    marginTop: 5 
  },
  typeContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: 30 
  },
  typeButton: { 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderWidth: 1, 
    borderColor: COLORS.gray, 
    borderRadius: 20,
    backgroundColor: COLORS.primary
  },
  selectedTypeButton: { 
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent
  },
  typeButtonText: { 
    color: COLORS.white,
    fontWeight: '600' 
  },
  selectedTypeText: { 
    color: COLORS.secondary
  },
  button: { 
    width: '100%', 
    height: 50, 
    backgroundColor: COLORS.accent, 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 10 
  },
  buttonText: { 
    color: COLORS.secondary, 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});