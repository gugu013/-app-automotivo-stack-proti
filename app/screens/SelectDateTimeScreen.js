// screens/SelectDateTimeScreen.js
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { COLORS } from '../constants/theme';

LocaleConfig.locales['pt-br'] = { monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'], monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dez.'], dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'], dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'], today: 'Hoje' };
LocaleConfig.defaultLocale = 'pt-br';

export default function SelectDateTimeScreen({ route, navigation }) {
  const { vehicleId, selectedServices, totalPrice } = route.params;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Passo 3: Escolha a Data e Hora</Text>
        <Calendar
          style={styles.calendar}
          onDayPress={(day) => { setSelectedDate(day.dateString); setSelectedTime(''); }}
          markedDates={{ [selectedDate]: { selected: true, disableTouchEvent: true }, }}
          minDate={today}
          theme={{
            calendarBackground: COLORS.primary,
            arrowColor: COLORS.accent,
            todayTextColor: COLORS.accent,
            selectedDayBackgroundColor: COLORS.accent,
            selectedDayTextColor: COLORS.secondary,
            monthTextColor: COLORS.white,
            dayTextColor: COLORS.white,
            textDisabledColor: COLORS.gray,
            textSectionTitleColor: COLORS.lightGray,
          }}
        />
        {selectedDate && (
          <View style={styles.timeContainer}>
            <Text style={styles.subtitle}>Horários disponíveis para {selectedDate.split('-').reverse().join('/')}:</Text>
            <View style={styles.timeButtonsWrapper}>
              {availableTimes.map((time) => (
                <TouchableOpacity key={time} style={[styles.timeButton, selectedTime === time ? styles.selectedTimeButton : null]} onPress={() => setSelectedTime(time)}>
                  <Text style={[styles.timeText, selectedTime === time ? styles.selectedTimeText : null]}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, (!selectedDate || !selectedTime) ? styles.disabledButton : null]} disabled={!selectedDate || !selectedTime} onPress={() => navigation.navigate('Confirmation', { vehicleId, selectedServices, totalPrice, date: selectedDate, time: selectedTime })}>
          <Text style={styles.buttonText}>Confirmar Agendamento</Text>
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
    fontWeight: '600', 
    marginTop: 20, 
    marginBottom: 10, 
    textAlign: 'center', 
    color: COLORS.white // ALTERADO AQUI
  },
  calendar: { 
    borderWidth: 1, 
    borderColor: COLORS.gray, // ALTERADO AQUI
    borderRadius: 8, 
    marginHorizontal: 10 
  },
  timeContainer: { 
    marginTop: 10, 
    paddingHorizontal: 20 
  },
  timeButtonsWrapper: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    gap: 10 
  },
  timeButton: { 
    borderWidth: 1, 
    borderColor: COLORS.gray, // ALTERADO AQUI
    borderRadius: 8, 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    backgroundColor: COLORS.primary // ALTERADO AQUI
  },
  selectedTimeButton: { 
    backgroundColor: COLORS.accent, // ALTERADO AQUI
    borderColor: COLORS.accent // ALTERADO AQUI
  },
  timeText: { 
    fontSize: 16, 
    color: COLORS.white // ALTERADO AQUI
  },
  selectedTimeText: { 
    color: COLORS.secondary // ALTERADO AQUI
  },
  footer: { 
    borderTopWidth: 1, 
    borderColor: COLORS.primary, // ALTERADO AQUI
    padding: 20, 
    backgroundColor: 'transparent' // ALTERADO AQUI
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