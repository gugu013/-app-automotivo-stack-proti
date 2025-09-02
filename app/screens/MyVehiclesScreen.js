// screens/MyVehiclesScreen.js
import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';
import { userVehicles } from '../data/mockData';

export default function MyVehiclesScreen({ navigation }) {
  const [vehicles, setVehicles] = useState(userVehicles);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setVehicles([...userVehicles]);
    }
  }, [isFocused]);

  const handleDelete = (vehicleToDelete) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja apagar o veículo ${vehicleToDelete.model}?`,
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, apagar',
          style: 'destructive',
          onPress: () => {
            const updatedList = userVehicles.filter(v => v.id !== vehicleToDelete.id);
            userVehicles.length = 0;
            Array.prototype.push.apply(userVehicles, updatedList);
            setVehicles(updatedList);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.model} ({item.year})</Text>
        <Text style={styles.cardText}>{item.licensePlate} • {item.color}</Text>
        <Text style={styles.cardText}>{item.km} km</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditVehicle', { vehicle: item })}>
          <Feather name="edit-2" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item)}>
          <Feather name="trash-2" size={24} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddVehicle')}>
            <Text style={styles.addButtonText}>+ Cadastrar Novo Veículo</Text>
          </TouchableOpacity>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Você ainda não possui veículos cadastrados.</Text>
          </View>
        }
      />
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
  addButton: {
    backgroundColor: COLORS.accent,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 20,
  },
  addButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 20,
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: COLORS.secondary 
  },
  cardText: { 
    fontSize: 16, 
    color: COLORS.secondary,
    marginTop: 5 
  },
  emptyContainer: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: 50 
  },
  emptyText: { 
    fontSize: 18, 
    color: COLORS.white
  },
});