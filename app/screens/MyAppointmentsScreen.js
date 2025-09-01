// screens/MyAppointmentsScreen.js
import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';
import { confirmedAppointments } from '../data/mockData';

export default function MyAppointmentsScreen({ navigation }) {
  const [appointments, setAppointments] = useState(confirmedAppointments);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setAppointments([...confirmedAppointments]);
    }
  }, [isFocused]);

  // LÓGICA DE CANCELAMENTO ATUALIZADA COM AS NOVAS REGRAS
  const handleCancel = (appointmentToCancel) => {
    const appointmentDateTime = new Date(`${appointmentToCancel.date}T${appointmentToCancel.time}:00`);
    const now = new Date();
    const hoursDifference = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    // LÓGICA INVERTIDA CONFORME SEU PEDIDO
    // O estorno só acontece se a diferença for MENOR que 2 horas (e maior que 0)
    const isServiceFeeRefundable = hoursDifference < 2 && hoursDifference > 0;
    
    // Mensagens de alerta também invertidas
    const alertMessage = isServiceFeeRefundable
      ? 'O cancelamento está dentro do prazo de 2 horas. O valor do serviço será estornado, mas a caução não é reembolsável.'
      : 'O cancelamento está fora do prazo para reembolso. O valor do serviço e da caução não serão estornados.';
    
    Alert.alert(
      'Confirmar Cancelamento',
      `Você tem certeza que deseja cancelar este agendamento?\n\n${alertMessage}`,
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, cancelar',
          style: 'destructive',
          onPress: () => {
            const updatedList = confirmedAppointments.filter(app => app.id !== appointmentToCancel.id);
            confirmedAppointments.length = 0;
            Array.prototype.push.apply(confirmedAppointments, updatedList);
            setAppointments(updatedList);
          },
        },
      ]
    );
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardClickable} onPress={() => navigation.navigate('AppointmentDetail', { appointment: item })}>
        <Text style={styles.cardTitle}>{item.vehicle.model} ({item.vehicle.licensePlate})</Text>
        {item.services?.map(s => <Text key={s.id} style={styles.cardSubtitle}>- {s.name}</Text>)}
        <View style={styles.separator} />
        <Text style={styles.cardText}>Data: {item.date?.split('-').reverse().join('/')} às {item.time}</Text>
        <Text style={styles.cardText}>
          Total Pago: R$ {Number(20).toFixed(2)}
        </Text>
        <View style={styles.statusContainer}>
          <Text style={styles.cardText}>Status: </Text>
          <Text style={[styles.statusText, styles.statusScheduled]}>{item.status}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel(item)}>
        <Feather name="trash-2" size={16} color={COLORS.white} />
        <Text style={styles.cancelButtonText}>Cancelar Agendamento</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Você ainda não possui agendamentos.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.secondary
  },
  list: { 
    padding: 20 
  },
  card: { 
    backgroundColor: COLORS.white, 
    borderRadius: 8, 
    marginBottom: 15, 
    elevation: 3 
  },
  cardClickable: {
    padding: 20,
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: COLORS.secondary 
  },
  cardSubtitle: { 
    fontSize: 16, 
    color: COLORS.secondary,
    marginLeft: 10 
  },
  separator: { 
    height: 1, 
    backgroundColor: '#eee', 
    marginVertical: 10 
  },
  cardText: { 
    fontSize: 16, 
    color: COLORS.secondary,
    marginBottom: 5 
  },
  statusContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  statusText: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  statusScheduled: { 
    color: COLORS.primary 
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 10,
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyContainer: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  emptyText: { 
    fontSize: 18, 
    color: COLORS.white
  },
});