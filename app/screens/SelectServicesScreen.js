// screens/SelectServicesScreen.js
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';
import { services, userVehicles, vehicleTypeMultipliers } from '../data/mockData';

export default function SelectServicesScreen({ route, navigation }) {
  const { vehicleId } = route.params;
  const [selectedServices, setSelectedServices] = useState([]);
  const selectedVehicle = userVehicles.find(v => v.id === vehicleId);

  const toggleService = (service) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const multiplier = vehicleTypeMultipliers[selectedVehicle.type] || 1.0;
  const baseTotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalPrice = baseTotal * multiplier;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Passo 2: Escolha os Serviços</Text>
        <Text style={styles.subtitle}>Para o veículo: {selectedVehicle.model}</Text>
        {services.map((service) => {
          const isSelected = selectedServices.find(s => s.id === service.id);
          return (
            <TouchableOpacity key={service.id} style={[styles.serviceCard, isSelected ? styles.selectedCard : null]} onPress={() => toggleService(service)}>
              <Text style={[styles.serviceName, isSelected ? styles.selectedText : null]}>{service.name}</Text>
              <Text style={[styles.servicePrice, isSelected ? styles.selectedText : null]}>R$ {service.price.toFixed(2)}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>R$ {totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={[styles.button, selectedServices.length === 0 ? styles.disabledButton : null]} disabled={selectedServices.length === 0} onPress={() => navigation.navigate('SelectDateTime', { vehicleId: vehicleId, selectedServices: selectedServices, totalPrice: totalPrice })}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.secondary // ALTERADO AQUI
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    margin: 20, 
    textAlign: 'center', 
    color: COLORS.white // ALTERADO AQUI
  },
  subtitle: { 
    fontSize: 16, 
    color: COLORS.lightGray, // ALTERADO AQUI
    marginBottom: 20, 
    textAlign: 'center' 
  },
  serviceCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: COLORS.primary, // ALTERADO AQUI
    padding: 20, 
    borderRadius: 8, 
    marginHorizontal: 20, 
    marginBottom: 15, 
    borderWidth: 2, 
    borderColor: COLORS.gray // ALTERADO AQUI
  },
  selectedCard: { 
    borderColor: COLORS.accent, // ALTERADO AQUI
    backgroundColor: COLORS.primary // Mantém o fundo escuro na seleção
  },
  serviceName: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: COLORS.white, // ALTERADO AQUI
    flex: 1,
    marginRight: 10,
  },
  servicePrice: { 
    fontSize: 16, 
    color: COLORS.white, // ALTERADO AQUI
    fontWeight: 'bold',
  },
  selectedText: { 
    color: COLORS.accent // ALTERADO AQUI
  },
  footer: { 
    borderTopWidth: 1, 
    borderColor: COLORS.primary, // ALTERADO AQUI
    padding: 20, 
    backgroundColor: 'transparent' // ALTERADO AQUI
  },
  totalLabel: { 
    fontSize: 18, 
    color: COLORS.lightGray // ALTERADO AQUI
  },
  totalPrice: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    color: COLORS.white // ALTERADO AQUI
  },
  button: { 
    height: 50, 
    backgroundColor: COLORS.accent, 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  disabledButton: { 
    backgroundColor: COLORS.gray 
  },
  buttonText: { 
    color: COLORS.secondary, 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});