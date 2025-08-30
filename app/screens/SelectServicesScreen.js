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
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  title: { fontSize: 22, fontWeight: 'bold', margin: 20, textAlign: 'center', color: COLORS.secondary },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' },
  serviceCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', // Alinha verticalmente
    backgroundColor: COLORS.white, 
    padding: 20, 
    borderRadius: 8, 
    marginHorizontal: 20, 
    marginBottom: 15, 
    borderWidth: 2, 
    borderColor: '#ddd' 
  },
  selectedCard: { borderColor: COLORS.primary, backgroundColor: '#e8f0fe' },
  serviceName: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: COLORS.secondary,
    flex: 1, // Permite que o texto cresça e quebre a linha
    marginRight: 10, // Adiciona um espaço entre o nome e o preço
  },
  servicePrice: { 
    fontSize: 16, 
    color: COLORS.secondary,
    fontWeight: 'bold', // Deixa o preço em negrito para destaque
  },
  selectedText: { color: COLORS.primary },
  footer: { borderTopWidth: 1, borderColor: '#ddd', padding: 20, backgroundColor: COLORS.white },
  totalLabel: { fontSize: 18, color: '#666' },
  totalPrice: { fontSize: 28, fontWeight: 'bold', marginBottom: 15, color: COLORS.secondary },
  button: { height: 50, backgroundColor: COLORS.accent, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  disabledButton: { backgroundColor: COLORS.gray },
  buttonText: { color: COLORS.secondary, fontSize: 18, fontWeight: 'bold' },
});