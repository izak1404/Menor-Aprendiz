import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function VagasScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Mural de Vagas 💼</Text>
      <Text style={styles.headerSubtitle}>Oportunidades alinhadas ao seu desempenho e tags.</Text>

      {/* Card de Vaga 1 - Compatível */}
      <View style={styles.vagaCard}>
        <View style={styles.vagaHeader}>
          <View>
            <Text style={styles.vagaCompany}>TECH SOLUTIONS</Text>
            <Text style={styles.vagaTitle}>Organização de Planilhas</Text>
          </View>
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>98% Match</Text>
          </View>
        </View>
        <Text style={styles.vagaSalary}>💰 R$ 150,00 / desafio</Text>
        <Text style={styles.vagaReq}>Requisito: Curso de Fundamentos concluído</Text>

        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Candidatar-se Agora</Text>
        </TouchableOpacity>
      </View>

      {/* Card de Vaga 2 - Bloqueada por Curso */}
      <View style={[styles.vagaCard, { opacity: 0.75 }]}>
        <View style={styles.vagaHeader}>
          <View>
            <Text style={styles.vagaCompany}>HOST CORP</Text>
            <Text style={styles.vagaTitle}>Suporte Nível 1 (Chat)</Text>
          </View>
          <View style={styles.lockBadge}>
            <Text style={styles.lockText}>🔒 Bloqueado</Text>
          </View>
        </View>
        <Text style={styles.vagaSalary}>💰 R$ 450,00 / mês</Text>
        <Text style={styles.vagaReq}>Requisito: Terminar trilha de Atendimento</Text>

        <TouchableOpacity style={styles.lockedButton}>
          <Text style={styles.lockedButtonText}>Estudar para Desbloquear</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  content: { padding: 24, paddingTop: 60, paddingBottom: 110 },
  headerTitle: { color: '#ffffff', fontSize: 26, fontWeight: 'bold', marginBottom: 4 },
  headerSubtitle: { color: '#a1a1aa', fontSize: 13, marginBottom: 24 },
  vagaCard: { backgroundColor: '#121214', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#27272a', marginBottom: 16 },
  vagaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  vagaCompany: { color: '#71717a', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  vagaTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginTop: 2 },
  matchBadge: { backgroundColor: 'rgba(52, 211, 153, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(52, 211, 153, 0.2)' },
  matchText: { color: '#34d399', fontSize: 10, fontWeight: 'bold' },
  lockBadge: { backgroundColor: 'rgba(113, 113, 122, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#27272a' },
  lockText: { color: '#a1a1aa', fontSize: 10, fontWeight: 'bold' },
  vagaSalary: { color: '#38bdf8', fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  vagaReq: { color: '#71717a', fontSize: 11, marginBottom: 16 },
  applyButton: { backgroundColor: '#0ea5e9', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  applyButtonText: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' },
  lockedButton: { backgroundColor: '#18181b', paddingVertical: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#27272a' },
  lockedButtonText: { color: '#a1a1aa', fontSize: 13, fontWeight: 'bold' }
});