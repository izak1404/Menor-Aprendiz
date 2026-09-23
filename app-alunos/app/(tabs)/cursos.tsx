import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert, Modal } from 'react-native';
import { Bot, X, Send, CheckCircle } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';

export default function CursosScreen() {
  const [modalAberto, setModalAberto] = useState(false);
  const [cursos, setCursos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Novos Estados para o "Modo de Estudo"
  const [cursoAtivo, setCursoAtivo] = useState<any>(null);
  const [moduloAtual, setModuloAtual] = useState(0);
  const [cursoConcluido, setCursoConcluido] = useState(false);

  useEffect(() => {
    async function carregarCursos() {
      try {
        const { data, error } = await supabase.from('cursos').select('*');
        if (error) throw error;
        if (data) setCursos(data);
      } catch (error: any) {
        console.error("Erro ao carregar:", error);
        setErro("Não foi possível carregar os cursos. Verifica a ligação ao Supabase.");
      } finally {
        setCarregando(false);
      }
    }
    carregarCursos();
  }, []);

  // Funções do Modo de Estudo
  const iniciarCurso = (curso: any) => {
    if (!curso.conteudo || curso.conteudo.length === 0) {
      Alert.alert("Ops", "Este curso ainda não tem conteúdo gerado.");
      return;
    }
    setCursoAtivo(curso);
    setModuloAtual(0);
    setCursoConcluido(false);
  };

  const responderQuiz = (opcaoSelecionada: string, respostaCorreta: string) => {
    if (opcaoSelecionada !== respostaCorreta) {
      Alert.alert("Quase lá!", "Resposta incorreta. Lê a explicação novamente com atenção!");
      return;
    }

    // Se acertou, avança para o próximo ou conclui o curso
    if (moduloAtual < cursoAtivo.conteudo.length - 1) {
      setModuloAtual(moduloAtual + 1);
    } else {
      setCursoConcluido(true);
    }
  };

  const fecharCurso = () => {
    setCursoAtivo(null);
    setCursoConcluido(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Trilhas & Material</Text>
        <Text style={styles.headerSubtitle}>Estude o material interativo e desbloqueie novas vagas.</Text>

        {carregando ? (
          <ActivityIndicator size="large" color="#38bdf8" style={{ marginTop: 40 }} />
        ) : erro ? (
          <Text style={styles.errorText}>{erro}</Text>
        ) : cursos.length === 0 ? (
          <Text style={styles.emptyText}>Ainda não há cursos publicados pelas empresas.</Text>
        ) : (
          cursos.map((curso) => (
            <View key={curso.id} style={styles.featuredCard}>
              <View style={styles.badgeTop}>
                <Text style={styles.badgeText}>+{curso.xp || 150} XP</Text>
              </View>
              <Text style={styles.companyName}>{curso.empresa}</Text>
              <Text style={styles.courseTitle}>{curso.titulo}</Text>
              <Text style={styles.courseDescText}>{curso.descricao || "Material de estudo gerado por IA."}</Text>
              
              {/* O Botão agora tem AÇÃO e abre o Quiz */}
              <TouchableOpacity style={styles.studyButton} onPress={() => iniciarCurso(curso)}>
                <Text style={styles.studyButtonText}> Começar a Estudar Agora</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* MODAL DO CURSO INTERATIVO (QUIZ) */}
      <Modal visible={!!cursoAtivo} animationType="slide" transparent={false}>
        {cursoAtivo && (
          <View style={styles.studyContainer}>
            <View style={styles.studyHeader}>
              <Text style={styles.studyHeaderTitle}>{cursoAtivo.titulo}</Text>
              <TouchableOpacity onPress={fecharCurso} style={styles.closeBtn}>
                <X size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {cursoConcluido ? (
              <View style={styles.successContainer}>
                <CheckCircle size={80} color="#10b981" />
                <Text style={styles.successTitle}>Trilha Concluída!</Text>
                <Text style={styles.successDesc}>Parabéns! Dominaste este assunto e desbloqueaste as vagas que exigem este conhecimento.</Text>
                <TouchableOpacity style={styles.studyButton} onPress={fecharCurso}>
                  <Text style={styles.studyButtonText}>Voltar ao Mural</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
                <Text style={styles.moduleCounter}>
                  Módulo {moduloAtual + 1} de {cursoAtivo.conteudo.length}
                </Text>
                
                <View style={styles.explanationBox}>
                  <Text style={styles.explanationText}>
                    {cursoAtivo.conteudo[moduloAtual].texto_explicativo}
                  </Text>
                </View>

                <Text style={styles.questionText}>
                  {cursoAtivo.conteudo[moduloAtual].pergunta}
                </Text>

                {cursoAtivo.conteudo[moduloAtual].opcoes.map((opcao: string, index: number) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.optionButton}
                    onPress={() => responderQuiz(opcao, cursoAtivo.conteudo[moduloAtual].resposta_correta)}
                  >
                    <Text style={styles.optionText}>{opcao}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </Modal>

      {/* Botão flutuante da IA (Mantido igual) */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => setModalAberto(true)} activeOpacity={0.8}>
        <Bot size={26} color="#ffffff" />
        <View style={styles.floatingBadge} />
      </TouchableOpacity>

      {/* Modal da IA do Aluno (Mantido igual) */}
      {modalAberto && (
        <View style={styles.aiModal}>
          <View style={styles.aiHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Bot size={20} color="#38bdf8" />
              <Text style={styles.aiTitle}>Tutor IA (Dúvidas)</Text>
            </View>
            <TouchableOpacity onPress={() => setModalAberto(false)}>
              <X size={20} color="#a1a1aa" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.aiChatScroll}>
            <View style={styles.messageAI}>
              <Text style={styles.messageText}>Olá, Izak! Estou aqui para te ajudar com os estudos. O que não compreendeste na matéria?</Text>
            </View>
          </ScrollView>
          <View style={styles.aiInputContainer}>
            <TextInput placeholder="Pergunta sobre o material..." placeholderTextColor="#71717a" style={styles.aiInput} />
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
  errorText: { color: '#ef4444', fontSize: 13, textAlign: 'center', marginTop: 40 },
  featuredCard: { backgroundColor: '#121214', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#38bdf8', marginBottom: 20 },
  badgeTop: { alignSelf: 'flex-start', backgroundColor: 'rgba(56, 189, 248, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(56, 189, 248, 0.3)' },
  badgeText: { color: '#38bdf8', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  companyName: { color: '#71717a', fontSize: 10, fontWeight: 'bold', letterSpacing: 1, marginBottom: 4 },
  courseTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  courseDescText: { color: '#a1a1aa', fontSize: 12, lineHeight: 18, marginBottom: 16 },
  
  studyButton: { backgroundColor: '#0ea5e9', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  studyButtonText: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },

  // Estilos do Modal de Estudo
  studyContainer: { flex: 1, backgroundColor: '#09090b' },
  studyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, paddingTop: 60, backgroundColor: '#18181b', borderBottomWidth: 1, borderBottomColor: '#27272a' },
  studyHeaderTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', flex: 1 },
  closeBtn: { padding: 8, backgroundColor: '#27272a', borderRadius: 20, marginLeft: 16 },
  
  moduleCounter: { color: '#0ea5e9', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 16, marginTop: 10 },
  explanationBox: { backgroundColor: '#18181b', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#27272a', marginBottom: 32 },
  explanationText: { color: '#e4e4e7', fontSize: 15, lineHeight: 24 },
  
  questionText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  optionButton: { backgroundColor: '#18181b', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#27272a', marginBottom: 12 },
  optionText: { color: '#e4e4e7', fontSize: 14 },
  
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  successTitle: { color: '#ffffff', fontSize: 28, fontWeight: 'bold', marginTop: 24, marginBottom: 12 },
  successDesc: { color: '#a1a1aa', fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 40 },

  // Estilos da IA (Inalterados)
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