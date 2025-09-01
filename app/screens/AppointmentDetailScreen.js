// screens/AppointmentDetailScreen.js
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

export default function AppointmentDetailScreen({ route }) {
  const { appointment } = route.params;

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Erro: Agendamento não encontrado.</Text>
      </SafeAreaView>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Comprovante de Agendamento</Text>
        <Text style={styles.appointmentId}>ID: {appointment.id}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          <Text style={[styles.statusText, styles.statusScheduled]}>{appointment.status}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Veículo</Text>
          <Text style={styles.text}>{appointment.vehicle.model} - {appointment.vehicle.licensePlate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Serviços</Text>
          {appointment.services?.map(service => (
            <View key={service.id} style={styles.serviceItem}>
              <Text style={styles.text}>{service.name}</Text>
            </View>
          ))}
        </View>

        {/* EXIBINDO A OBSERVAÇÃO, SE ELA EXISTIR */}
        {appointment.notes ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Observações do Cliente</Text>
            <Text style={styles.notesText}>{appointment.notes}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data e Hora</Text>
          <Text style={styles.text}>{formatDate(appointment.date)} às {appointment.time}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo Financeiro</Text>
          <View style={styles.priceItem}>
            <Text style={styles.text}>Valor dos Serviços:</Text>
            <Text style={styles.text}>R$ {appointment.totalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.priceItem}>
            <Text style={styles.text}>Valor da Caução:</Text>
            <Text style={styles.text}>R$ {appointment.deposit.toFixed(2)}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.priceItem}>
            <Text style={styles.totalText}>Total Pago:</Text>
            <Text style={styles.totalText}>R$ {appointment.totalPaid.toFixed(2)}</Text>
          </View>
        </View>

      <View style={styles.policyBox}>
          <Text style={styles.policyTitle}>Política de Agendamento</Text>
          <Text style={styles.policyText}>
            Para garantir a exclusividade do seu horário, solicitamos uma caução de R$ 20,00. O pagamento pelos serviços será realizado diretamente no estabelecimento.
            {'\n\n'}
            A caução é reembolsável integralmente caso o cancelamento seja solicitado em até 2 horas após a confirmação do pagamento. Passado este prazo, o valor da caução não será devolvido. Agradecemos a sua compreensão.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, color: COLORS.secondary },
  appointmentId: { fontSize: 12, textAlign: 'center', color: COLORS.gray, marginBottom: 20 },
  section: { backgroundColor: COLORS.white, padding: 15, borderRadius: 8, marginBottom: 15, elevation: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5, color: COLORS.primary },
  text: { fontSize: 16, color: '#333' },
  serviceItem: { marginBottom: 5 },
  priceItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  separator: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  totalText: { fontSize: 18, fontWeight: 'bold', color: COLORS.secondary },
  statusText: { fontSize: 18, fontWeight: 'bold' },
  statusScheduled: { color: COLORS.primary },
  notesText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  policyBox: {
    backgroundColor: '#e8f0fe',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
    marginTop: 10,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  policyText: {
    fontSize: 14,
    color: COLORS.secondary,
    lineHeight: 20,
  },
});