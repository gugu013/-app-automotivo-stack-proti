// screens/LoginScreen.js
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView, Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../constants/theme';
import { users } from '../data/mockData';

const LOGO_URL = 'https://i.imgur.com/mZC7iOj.png'; 

export default function LoginScreen({ navigation }) {
  // Mudamos 'email' para 'identifier' para representar tanto e-mail quanto nome
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (!identifier || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const loginInput = identifier.toLowerCase();

    // LÓGICA DE VERIFICAÇÃO ATUALIZADA
    // Procura por um usuário onde o e-mail OU o nome (em minúsculas) correspondem ao input
    const user = users.find(
      u => (u.email.toLowerCase() === loginInput || u.name.toLowerCase() === loginInput) && u.password === password
    );

    if (user) {
      setIdentifier('');
      setPassword('');
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro de Login', 'Usuário ou senha inválidos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <View style={styles.logoContainer}>
              <Image 
                source={{ uri: LOGO_URL }} 
                style={styles.logo} 
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.subtitle}>Faça login ou cadastre-se</Text>
            
            <TextInput 
              style={styles.input} 
              placeholder="E-mail ou Nome de Usuário" // Placeholder atualizado
              placeholderTextColor={COLORS.gray}
              autoCapitalize="none"
              value={identifier}
              onChangeText={setIdentifier} // Atualiza o novo estado
            />
            
            <View style={styles.passwordContainer}>
              <TextInput 
                style={styles.inputField} 
                placeholder="Sua senha" 
                placeholderTextColor={COLORS.gray}
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Feather 
                  name={isPasswordVisible ? 'eye' : 'eye-off'} 
                  size={24} 
                  color={COLORS.gray}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },
  keyboardAvoidingContainer: { flex: 1 },
  scrollContentContainer: { flexGrow: 1, justifyContent: 'center' },
  innerContainer: { alignItems: 'center', padding: 20 },
  logoContainer: { width: 180, height: 180, borderRadius: 90, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center', marginBottom: 20, padding: 10, },
  logo: { width: '100%', height: '100%' },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.white, marginBottom: 10 },
  subtitle: { fontSize: 16, color: COLORS.lightGray, marginBottom: 40 },
  input: { width: '100%', height: 50, backgroundColor: COLORS.white, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: '#ddd', color: COLORS.secondary },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: COLORS.white, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 15 },
  inputField: { flex: 1, height: 50, paddingHorizontal: 15, fontSize: 16, color: COLORS.secondary },
  eyeIcon: { padding: 10 },
  button: { width: '100%', height: 50, backgroundColor: COLORS.accent, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  buttonText: { color: COLORS.secondary, fontSize: 18, fontWeight: 'bold' },
  linkText: { marginTop: 20, color: COLORS.lightAccent, fontSize: 16, fontWeight: '600' },
});