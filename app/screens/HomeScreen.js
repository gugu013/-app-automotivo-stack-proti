// screens/HomeScreen.js
import { Feather } from '@expo/vector-icons'; // Importa o pacote de ícones
import { CommonActions } from '@react-navigation/native'; // Importa as ações de navegação
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';

export default function HomeScreen({ navigation }) {

  const handleLogout = () => {
    // Esta ação reseta o histórico de navegação e volta para a tela de Login
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Olá, Usuário!</Text>
          <Text style={styles.headerSubtitle}>O que você gostaria de fazer hoje?</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Feather name="log-out" size={26} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('NewAppointment')}>
          <Text style={styles.menuButtonText}>Novo Agendimento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('MyAppointments')}>
          <Text style={styles.menuButtonText}>Meus Agendamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('MyVehicles')}>
          <Text style={styles.menuButtonText}>Meus Veículos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Store')}>
          <Text style={styles.menuButtonText}>Loja de Produtos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary // ALTERADO AQUI
  },
  header: {
    padding: 20,
    paddingTop: 30, // Um pouco mais de espaço no topo
    backgroundColor: COLORS.primary,
    flexDirection: 'row', // Alinha o título e o ícone na mesma linha
    justifyContent: 'space-between', // Joga cada item para uma ponta
    alignItems: 'center', // Centraliza verticalmente
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 5
  },
  menuContainer: {
    padding: 20
  },
  menuButton: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.secondary
  },
});