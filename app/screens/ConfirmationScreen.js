// screens/ConfirmationScreen.js
import { CommonActions } from '@react-navigation/native';
import { useState } from 'react'; // Importamos useState
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, DEPOSIT_VALUE } from '../constants/theme';
import { confirmedAppointments, userVehicles, vehicleTypeMultipliers } from '../data/mockData';

export default function ConfirmationScreen({ route, navigation }) {
  const { vehicleId, selectedServices, totalPrice, date, time } = route.params;
  const [notes, setNotes] = useState(''); // Novo estado para as observações
  const vehicle = userVehicles.find(v => v.id === vehicleId);
  const multiplier = vehicleTypeMultipliers[vehicle.type] || 1.0;
  const totalToPay = totalPrice + DEPOSIT_VALUE;

  const handlePayment = () => {
    const newAppointment = {
      id: `agendamento_${Math.random().toString()}`,
      vehicle: vehicle,
      services: selectedServices,
      date: date,
      time: time,
      totalPrice: totalPrice,
      deposit: DEPOSIT_VALUE,
      totalPaid: totalToPay,
      status: 'Agendado',
      notes: notes, // Salvamos as observações
    };
    confirmedAppointments.push(newAppointment);

    Alert.alert(
      "Agendamento Confirmado!",
      "Seu comprovante está disponível na tela 'Meus Agendamentos'.",
      [{
        text: "OK",
        onPress: () => navigation.dispatch( CommonActions.reset({ index: 0, routes: [{ name: 'Home' }], }) )
      }]
    );
  };

  const showTermsAndConfirm = () => {
    Alert.alert(
      "Termos e Condições",
      "Ao continuar, você concorda com nossa política de cancelamento...", // Mensagem completa dos termos
      [
        { text: "Cancelar", style: 'cancel' },
        { text: "Aceito e Continuar", onPress: handlePayment }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Resumo do Agendamento</Text>
        <View style={styles.section}><Text style={styles.sectionTitle}>Veículo</Text><Text style={styles.text}>{vehicle?.model} - {vehicle?.licensePlate}</Text></View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Serviços</Text>
          {selectedServices?.map(service => (
            <View key={service.id} style={styles.serviceItem}><Text style={styles.text}>{service.name}</Text><Text style={styles.text}>R$ {(service.price * multiplier).toFixed(2)}</Text></View>
          ))}
        </View>
        <View style={styles.section}><Text style={styles.sectionTitle}>Data e Hora</Text><Text style={styles.text}>{date?.split('-').reverse().join('/')} às {time}</Text></View>

        {/* NOVA SEÇÃO PARA OBSERVAÇÕES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observações (Opcional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Ex: Foco na limpeza das rodas, mancha no banco do carona..."
            placeholderTextColor={COLORS.gray}
            multiline={true}
            value={notes}
            onChangeText={setNotes}
          />
          <Text style={styles.notesHelpText}>Serviços adicionais solicitados aqui terão o custo avaliado e cobrado à parte no local.</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.priceDetails}><Text style={styles.detailLabel}>Valor dos Serviços:</Text><Text style={styles.detailPrice}>R$ {totalPrice.toFixed(2)}</Text></View>
        <View style={styles.priceDetails}><Text style={styles.detailLabel}>Valor da Caução:</Text><Text style={styles.detailPrice}>R$ {DEPOSIT_VALUE.toFixed(2)}</Text></View>
        <View style={styles.separator} />
        <Text style={styles.totalLabel}>Total a Pagar:</Text>
        <Text style={styles.totalPrice}>R$ {totalToPay.toFixed(2)}</Text>
        <TouchableOpacity style={styles.button} onPress={showTermsAndConfirm}>
          <Text style={styles.buttonText}>Continuar para Pagamento</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: COLORS.secondary },
  section: { backgroundColor: COLORS.white, padding: 15, borderRadius: 8, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5, color: COLORS.primary },
  text: { fontSize: 16, color: '#333' },
  serviceItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  footer: { borderTopWidth: 1, borderColor: '#ddd', padding: 20, backgroundColor: COLORS.white },
  priceDetails: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  detailLabel: { fontSize: 16, color: '#666' },
  detailPrice: { fontSize: 16, color: '#333' },
  separator: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  totalLabel: { fontSize: 18, color: '#666', fontWeight: 'bold' },
  totalPrice: { fontSize: 28, fontWeight: 'bold', marginBottom: 15, color: COLORS.secondary },
  button: { height: 50, backgroundColor: COLORS.accent, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: COLORS.secondary, fontSize: 18, fontWeight: 'bold' },
  // Estilos para o novo campo de observações
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  notesHelpText: {
    fontSize: 12,
    color: COLORS.gray,
    fontStyle: 'italic',
  },
});