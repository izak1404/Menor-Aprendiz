import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function ChatEmpresasScreen() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mensagens com Empresas 💬</Text>
        <Text style={styles.headerSubtitle}>Contato direto com recrutadores parceiros.</Text>
      </View>

      {/* Lista de Mensagens */}
      <ScrollView contentContainerStyle={styles.chatScroll}>
        <View style={styles.messageReceived}>
          <Text style={styles.senderLabel}>Tech Solutions (Recrutamento)</Text>
          <Text style={styles.messageText}>Olá Izak! Vimos o seu desempenho excelente. Temos uma vaga de desafio aberta para ti.</Text>
          <Text style={styles.messageTime}>09:45</Text>
        </View>

        <View style={styles.messageSent}>
          <Text style={styles.messageText}>Olá! Muito obrigado, já estou focado em concluir os módulos práticos.</Text>
          <Text style={styles.messageTime}>09:48</Text>
        </View>
      </ScrollView>

      {/* Input de Envio */}
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Escreva para o recrutador..." 
          placeholderTextColor="#71717a"
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  headerTitle: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { color: '#a1a1aa', fontSize: 12, marginTop: 2 },
  chatScroll: { padding: 24, paddingBottom: 110 },
  messageReceived: { backgroundColor: '#121214', padding: 14, borderRadius: 16, borderWidth: 1, borderColor: '#27272a', alignSelf: 'flex-start', maxWidth: '85%', marginBottom: 16 },
  messageSent: { backgroundColor: '#0369a1', padding: 14, borderRadius: 16, alignSelf: 'flex-end', maxWidth: '85%', marginBottom: 16 },
  senderLabel: { color: '#38bdf8', fontSize: 10, fontWeight: 'bold', marginBottom: 4 },
  messageText: { color: '#f4f4f5', fontSize: 13, lineHeight: 18 },
  messageTime: { color: '#71717a', fontSize: 9, alignSelf: 'flex-end', marginTop: 4 },
  inputContainer: { flexDirection: 'row', padding: 16, backgroundColor: '#121214', borderTopWidth: 1, borderTopColor: '#27272a', position: 'absolute', bottom: 75, left: 0, right: 0 },
  textInput: { flex: 1, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a', borderRadius: 12, paddingHorizontal: 16, color: '#ffffff', fontSize: 13, height: 44 },
  sendButton: { backgroundColor: '#0ea5e9', justifyContent: 'center', paddingHorizontal: 20, borderRadius: 12, marginLeft: 10, height: 44 },
  sendButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 }
});