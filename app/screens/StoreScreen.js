// screens/StoreScreen.js
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';
import { products } from '../data/mockData';

export default function StoreScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.cardContent}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.buyButton} onPress={() => Alert.alert('Produto Adicionado', `${item.name} foi adicionado ao seu carrinho.`)}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={products} renderItem={renderItem} keyExtractor={item => item.id} contentContainerStyle={styles.list} numColumns={2} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.lightAccent // ALTERADO AQUI
  },
  list: { 
    padding: 10 
  },
  card: { 
    flex: 1, 
    backgroundColor: COLORS.white, 
    borderRadius: 8, 
    margin: 5, 
    elevation: 3, 
    overflow: 'hidden' 
  },
  productImage: { 
    width: '100%', 
    height: 120, 
    resizeMode: 'cover', 
    backgroundColor: '#eee' 
  },
  cardContent: { 
    padding: 10 
  },
  productName: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 5, 
    minHeight: 40, 
    color: COLORS.secondary 
  },
  productPrice: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: COLORS.primary, 
    marginBottom: 10 
  },
  buyButton: { 
    backgroundColor: COLORS.accent, 
    padding: 8, 
    borderRadius: 5, 
    alignItems: 'center' 
  },
  buyButtonText: { 
    color: COLORS.secondary, 
    fontWeight: 'bold' 
  },
});