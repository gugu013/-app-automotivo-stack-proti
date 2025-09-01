// screens/NewAppointmentScreen.js
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';
import { userVehicles } from '../data/mockData';

export default function NewAppointmentScreen({ navigation }) {
  const [vehicles, setVehicles] = useState(userVehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const isFocused = useIsFocused();

  // Garante que a lista de veículos seja sempre a mais atual
  useEffect(() => {
    if (isFocused) {
      setVehicles([...userVehicles]);
    }
  }, [isFocused]);

  const renderVehicleItem = ({ item }) => {
    const isSelected = item.id === selectedVehicleId;
    return (
      <TouchableOpacity style={[styles.vehicleCard, isSelected ? styles.selectedVehicleCard : null]} onPress={() => setSelectedVehicleId(item.id)}>
        <Text style={[styles.vehicleModel, isSelected ? styles.selectedText : null]}>{item.model} {item.year}</Text>
        <Text style={[styles.vehicleInfo, isSelected ? styles.selectedText : null]}>{item.licensePlate} • {item.color}</Text>
        <Text style={[styles.vehicleInfo, isSelected ? styles.selectedText : null]}>{item.km} km</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Passo 1: Selecione o Veículo</Text>

      {/* Botão para ir para a tela de cadastro */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddVehicle')}>
        <Text style={styles.addButtonText}>+ Adicionar Novo Veículo</Text>
      </TouchableOpacity>
      
      <FlatList 
        data={vehicles} 
        renderItem={renderVehicleItem} 
        keyExtractor={(item) => item.id} 
        style={styles.list} 
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum veículo cadastrado.</Text>
          </View>
        }
      />
      
      <TouchableOpacity style={[styles.button, !selectedVehicleId ? styles.disabledButton : null]} disabled={!selectedVehicleId} onPress={() => navigation.navigate('SelectServices', { vehicleId: selectedVehicleId })}>
        <Text style={styles.buttonText}>Continuar para Serviços</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.secondary,
    alignItems: 'center' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginVertical: 20, 
    color: COLORS.white 
  },
  list: { 
    width: '100%', 
    paddingHorizontal: 20 
  },
  addButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
  },
  addButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehicleCard: { 
    backgroundColor: COLORS.primary, // ALTERADO AQUI
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 15, 
    borderWidth: 2, 
    borderColor: COLORS.gray 
  },
  selectedVehicleCard: { 
    borderColor: COLORS.accent, 
    backgroundColor: '#FFFBEA' 
  },
  vehicleModel: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: COLORS.white // ALTERADO AQUI
  },
  vehicleInfo: { 
    fontSize: 15, 
    color: COLORS.white, // ALTERADO AQUI
    marginTop: 5 
  },
  selectedText: { 
    color: COLORS.primary 
  },
  emptyContainer: { 
    alignItems: 'center', 
    marginTop: 50 
  },
  emptyText: { 
    textAlign: 'center', 
    fontSize: 16, 
    color: COLORS.white,
    marginBottom: 20 
  },
  button: { 
    width: '90%', 
    height: 50, 
    backgroundColor: COLORS.accent, 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 10, 
    marginBottom: 20 
  },
  disabledButton: { 
    backgroundColor: COLORS.gray 
  },
  buttonText: { 
    color: COLORS.secondary, 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});