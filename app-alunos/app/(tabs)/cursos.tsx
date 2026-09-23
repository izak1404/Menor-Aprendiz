import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Bot, X, Send } from 'lucide-react-native';
import { supabase } from '../../lib/supabase'; // Ajuste o caminho se a pasta lib estiver noutro sítio

export default function CursosScreen() {
  const [modalAberto, setModalAberto] = useState(false);
  const [cursos, setCursos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Buscar os cursos publicados pelas empresas no Supabase
  useEffect(() => {
    async function carregarCursos() {
      try {
        const { data, error } = await supabase.from('cursos').select('*');
        if (error) throw error;
        if (data) setCursos(data);
      } catch (error) {
        console.error("Erro ao carregar cursos do Supabase:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarCursos();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Trilhas & Material 📚</Text>
        <Text style={styles.headerSubtitle}>Estude os PDFs gerados pelas empresas e tire dúvidas com a IA.</Text>

        {carregando ? (
          <ActivityIndicator size="large" color="#38bdf8" style={{ marginTop: 40 }} />
        ) : cursos.length === 0 ? (
          <Text style={styles.emptyText}>Ainda não há cursos publicados pelas empresas.</Text>
        ) : (
          cursos.map((curso) => (
            <View key={curso.id} style={styles.featuredCard}>
              <View style={styles.badgeTop}>
                <Text style={styles.badgeText}>NOVO CURSO</Text>
              </View>
              <Text style={styles.companyName}>{curso.empresa}</Text>
              <Text style={styles.courseTitle}>{curso.titulo}</Text>
              <Text style={styles.courseDescText}>{curso.descricao || "Material de estudo gerado por IA."}</Text>
              
              <TouchableOpacity style={styles.pdfButton}>
                <Text style={styles.pdfButtonText}>📄 Baixar PDF do Conteúdo (IA)</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* BOTÃO FLUTUANTE DA IA */}
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => setModalAberto(true)}
        activeOpacity={0.8}
      >
        <Bot size={26} color="#ffffff" />
        <View style={styles.floatingBadge} />
      </TouchableOpacity>

      {/* JANELA FLUTUANTE DO CHAT DA IA */}
      {modalAberto && (
        <View style={styles.aiModal}>
          <View style={styles.aiHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Bot size={20} color="#38bdf8" />
              <Text style={styles.aiTitle}>Tutor IA (Focado no PDF)</Text>
            </View>
            <TouchableOpacity onPress={() => setModalAberto(false)}>
              <X size={20} color="#a1a1aa" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.aiChatScroll}>
            <View style={styles.messageAI}>
              <Text style={styles.messageText}>Olá! Estou a analisar o PDF ativo. Qual é a tua dúvida sobre a matéria?</Text>
            </View>
          </ScrollView>

          <View style={styles.aiInputContainer}>
            <TextInput 
              placeholder="Pergunta sobre o material..." 
              placeholderTextColor="#71717a"
              style={styles.aiInput}
            />
            <TouchableOpacity style={styles.aiSendBtn}>
              <Send size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  content: { padding: 24, paddingTop: 60, paddingBottom: 130 },
  headerTitle: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  headerSubtitle: { color: '#a1a1aa', fontSize: 13, marginBottom: 24 },
  emptyText: { color: '#71717a', fontSize: 13, textAlign: 'center', marginTop: 40 },
  featuredCard: { backgroundColor: '#121214', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#38bdf8', marginBottom: 20 },
  badgeTop: { alignSelf: 'flex-start', backgroundColor: 'rgba(56, 189, 248, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(56, 189, 248, 0.3)' },
  badgeText: { color: '#38bdf8', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  companyName: { color: '#71717a', fontSize: 10, fontWeight: 'bold', letterSpacing: 1, marginBottom: 4 },
  courseTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  courseDescText: { color: '#a1a1aa', fontSize: 12, lineHeight: 18, marginBottom: 16 },
  pdfButton: { backgroundColor: '#18181b', paddingVertical: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#27272a' },
  pdfButtonText: { color: '#f4f4f5', fontSize: 12, fontWeight: 'bold' },

  floatingButton: { position: 'absolute', bottom: 100, right: 24, width: 56, height: 56, backgroundColor: '#0ea5e9', borderRadius: 28, justifyContent: 'center', alignItems: 'center', shadowColor: '#0ea5e9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6, zIndex: 50 },
  floatingBadge: { position: 'absolute', top: 12, right: 12, width: 10, height: 10, backgroundColor: '#34d399', borderRadius: 5, borderWidth: 2, borderColor: '#0ea5e9' },

  aiModal: { position: 'absolute', bottom: 90, left: 16, right: 16, height: 380, backgroundColor: '#121214', borderRadius: 24, borderWidth: 1, borderColor: '#38bdf840', zIndex: 100, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 15 },
  aiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  aiTitle: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },
  aiChatScroll: { padding: 16 },
  messageAI: { backgroundColor: '#18181b', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#27272a', maxWidth: '90%' },
  messageText: { color: '#f4f4f5', fontSize: 12, lineHeight: 18 },
  aiInputContainer: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#27272a', backgroundColor: '#121214', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  aiInput: { flex: 1, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a', borderRadius: 10, paddingHorizontal: 12, color: '#ffffff', fontSize: 12, height: 38 },
  aiSendBtn: { backgroundColor: '#0ea5e9', justifyContent: 'center', alignItems: 'center', width: 38, height: 38, borderRadius: 10, marginLeft: 8 }
});