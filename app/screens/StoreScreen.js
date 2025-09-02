// screens/StoreScreen.js
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { Alert, FlatList, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';
import { products } from '../data/mockData';

export default function StoreScreen() {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const navigation = useNavigation();

  const addToCart = (productToAdd) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === productToAdd.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
    Alert.alert('Produto Adicionado', `${productToAdd.name} foi adicionado ao seu carrinho.`);
  };
  
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsCartVisible(true)} style={{ marginRight: 15 }}>
          <Feather name="shopping-cart" size={24} color={COLORS.secondary} />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, cart]);

  // Função para finalizar a separação dos produtos
  const handleSeparateProducts = () => {
    if (cart.length === 0) {
      Alert.alert("Carrinho Vazio", "Adicione produtos ao carrinho antes de separar.");
      return;
    }

    Alert.alert(
      "Produtos Separados!",
      "Seus produtos estão sendo separados e estarão prontos para retirada na loja. Obrigado!",
      [{ text: "OK", onPress: () => {
        setCart([]); // Esvazia o carrinho após a separação
        setIsCartVisible(false); // Fecha o modal
      }}]
    );
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.cardContent}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.buyButton} onPress={() => addToCart(item)}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.quantity}x {item.name}</Text>
        <Text style={styles.cartItemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={products} renderItem={renderProductItem} keyExtractor={item => item.id} contentContainerStyle={styles.list} numColumns={2} />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCartVisible}
        onRequestClose={() => setIsCartVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsCartVisible(false)}>
          <Pressable style={styles.modalContent}>
            <Text style={styles.modalTitle}>Carrinho de Compras</Text>
            
            {/* Mensagem de instrução */}
            <Text style={styles.infoMessage}>
              Os produtos que você adicionou ao carrinho serão separados para retirada no estabelecimento, com pagamento separado do serviço do carro, caso tenha sido prestado.
            </Text>

            <FlatList
              data={cart}
              renderItem={renderCartItem}
              keyExtractor={item => item.id}
              ListEmptyComponent={<Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>}
              style={styles.cartList}
            />
            <View style={styles.separator} />
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>R$ {calculateTotal()}</Text>
            </View>
            <TouchableOpacity style={styles.separateButton} onPress={handleSeparateProducts}>
              <Text style={styles.buyButtonText}>Separar Produtos</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightAccent },
  list: { padding: 10 },
  card: { flex: 1, backgroundColor: COLORS.white, borderRadius: 8, margin: 5, elevation: 3 },
  productImage: { width: '100%', height: 120, resizeMode: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  cardContent: { padding: 10 },
  productName: { fontSize: 14, fontWeight: '600', marginBottom: 5, minHeight: 40, color: COLORS.secondary },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, marginBottom: 10 },
  buyButton: { backgroundColor: COLORS.accent, padding: 8, borderRadius: 5, alignItems: 'center' },
  buyButtonText: { color: COLORS.secondary, fontWeight: 'bold' },

  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    height: '60%', // Ocupa metade da tela
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 15,
    textAlign: 'center',
  },
  infoMessage: { // Novo estilo para a mensagem de instrução
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  cartList: { // Estilo para a lista de itens no carrinho
    flexGrow: 1, // Permite que a FlatList ocupe o espaço disponível
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center', // Alinha a imagem e o texto
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  cartItemImage: { // Estilo para a imagem do produto no carrinho
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
    resizeMode: 'cover',
  },
  cartItemDetails: { // Para envolver nome e preço e gerenciar o layout
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemName: { fontSize: 15, color: COLORS.secondary, flexShrink: 1, marginRight: 10 }, // FlexShrink para quebrar linha se necessário
  cartItemPrice: { fontSize: 15, fontWeight: 'bold', color: COLORS.primary },
  emptyCartText: { textAlign: 'center', color: COLORS.gray, fontSize: 16, marginTop: 30 },
  separator: { height: 1, backgroundColor: COLORS.lightGray, marginVertical: 15 },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  totalText: { fontSize: 18, fontWeight: '600', color: COLORS.secondary },
  totalPrice: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
  separateButton: { backgroundColor: COLORS.accent, padding: 15, borderRadius: 8, alignItems: 'center' }, // Novo botão "Separar"

  // Estilos do Ícone de Carrinho no Cabeçalho
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#dc3545',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});