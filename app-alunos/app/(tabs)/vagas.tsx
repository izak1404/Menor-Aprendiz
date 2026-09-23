import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function VagasScreen() {
  const [vagas, setVagas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarVagas();
  }, []);

  const carregarVagas = async () => {
    try {
      // Puxa as vagas reais e o nome do curso exigido (caso exista)
      const { data, error } = await supabase.from('vagas').select('*, cursos!curso_obrigatorio_id(titulo)');
      if (error) throw error;
      setVagas(data || []);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    } finally {
      setCarregando(false);
    }
  };

  const handleCandidatar = (vagaId: string) => {
    // Na próxima etapa, vamos ligar isto à nova tabela de candidaturas!
    alert("Função de candidatura será ativada na próxima etapa.");
  };

  if (carregando) {
    return (
      <View style={{ flex: 1, backgroundColor: '#09090b', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#09090b' }} contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginRight: 8 }}>
          Mural de Vagas
        </Text>
        <Text style={{ fontSize: 24 }}>💼</Text>
      </View>
      
      <Text style={{ color: '#a1a1aa', fontSize: 14, marginBottom: 24 }}>
        Oportunidades alinhadas ao seu desempenho e tags.
      </Text>

      {vagas.length === 0 ? (
        <Text style={{ color: '#71717a', textAlign: 'center', marginTop: 40 }}>
          Ainda não há vagas disponíveis na plataforma.
        </Text>
      ) : (
        vagas.map((vaga) => (
          <View key={vaga.id} style={{ backgroundColor: '#18181b', padding: 20, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#27272a' }}>
            <Text style={{ color: '#71717a', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8 }}>
              {vaga.empresa}
            </Text>
            
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              {vaga.titulo}
            </Text>
            
            <Text style={{ color: '#a1a1aa', fontSize: 14, marginBottom: 16, lineHeight: 20 }}>
              {vaga.descricao}
            </Text>

            {/* Lógica de Bloqueio baseada na exigência de curso */}
            {vaga.cursos ? (
              <View style={{ marginBottom: 16, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#fbbf24', fontSize: 12 }}>
                  🔒 Requisito: Concluir trilha de {vaga.cursos.titulo}
                </Text>
              </View>
            ) : (
              <View style={{ marginBottom: 16, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#10b981', fontSize: 12 }}>
                  🔓 Vaga de Acesso Livre
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => handleCandidatar(vaga.id)}
              disabled={!!vaga.cursos} // Se tiver curso obrigatório, o botão fica desativado
              style={{
                backgroundColor: vaga.cursos ? '#27272a' : '#0ea5e9',
                padding: 14,
                borderRadius: 12,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: vaga.cursos ? '#71717a' : 'white', fontWeight: 'bold' }}>
                {vaga.cursos ? 'Estudar para Desbloquear' : 'Candidatar-se Agora'}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}