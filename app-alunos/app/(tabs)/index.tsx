import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function InicioScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bem-vindo de volta,</Text>
          <Text style={styles.name}>Izak</Text>
        </View>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>3 dias</Text>
        </View>
      </View>

      {/* Card de XP (Estilo Black/Indigo) */}
      <View style={styles.xpCard}>
        <View style={styles.xpCardHeader}>
          <View>
            <Text style={styles.xpLabel}>NÍVEL ATUAL</Text>
            <Text style={styles.xpLevel}>Explorador</Text>
          </View>
          <View>
            <Text style={styles.xpPoints}>350 XP</Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressTextRow}>
            <Text style={styles.progressText}>Progresso</Text>
            <Text style={styles.progressText}>Faltam 150 XP</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
        </View>
      </View>

      {/* Continuar Aprendendo */}
      <Text style={styles.sectionTitle}>CONTINUAR APRENDENDO</Text>
      
      <TouchableOpacity style={styles.courseCard} activeOpacity={0.8}>
        <View style={styles.courseIconContainer}>
           <Text style={styles.courseIcon}>{'</>'}</Text>
        </View>
        <View style={styles.courseInfo}>
          <Text style={styles.courseCompany}>TECH CORP SA</Text>
          <Text style={styles.courseName}>Fundamentos Web</Text>
          <View style={styles.courseProgressRow}>
            <View style={styles.courseProgressBarBg}>
              <View style={styles.courseProgressBarFill} />
            </View>
            <Text style={styles.courseProgressText}>33%</Text>
          </View>
        </View>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

// Aqui é onde aplicamos as cores do Tailwind (Zinc, Indigo)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#18181b' }, // zinc-900
  content: { padding: 24, paddingTop: 60, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  greeting: { color: '#a1a1aa', fontSize: 12, fontWeight: '500' }, // zinc-400
  name: { color: '#ffffff', fontSize: 24, fontWeight: 'bold' },
  streakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(39, 39, 42, 0.8)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: '#3f3f46' },
  streakEmoji: { fontSize: 16, marginRight: 4 },
  streakText: { color: '#d4d4d8', fontSize: 14, fontWeight: 'bold' },
  xpCard: { backgroundColor: '#312e81', borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.3)' }, // indigo-900
  xpCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
  xpLabel: { color: '#818cf8', fontSize: 10, fontWeight: 'bold', marginBottom: 4 },
  xpLevel: { color: '#ffffff', fontSize: 24, fontWeight: '900' },
  xpPoints: { color: '#fbbf24', fontSize: 20, fontWeight: '900' }, // amber-400
  progressContainer: { marginTop: 8 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressText: { color: '#a5b4fc', fontSize: 10, fontWeight: '600' },
  progressBarBg: { height: 8, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 4 },
  progressBarFill: { width: '70%', height: '100%', backgroundColor: '#6366f1', borderRadius: 4 }, // indigo-500
  sectionTitle: { color: '#d4d4d8', fontSize: 12, fontWeight: 'bold', marginBottom: 16, letterSpacing: 1 },
  courseCard: { flexDirection: 'row', backgroundColor: 'rgba(39, 39, 42, 0.5)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(63, 63, 70, 0.5)', alignItems: 'center' },
  courseIconContainer: { width: 48, height: 48, backgroundColor: '#18181b', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#3f3f46', marginRight: 16 },
  courseIcon: { color: '#818cf8', fontSize: 16, fontWeight: 'bold' },
  courseInfo: { flex: 1 },
  courseCompany: { color: '#71717a', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  courseName: { color: '#e4e4e7', fontSize: 14, fontWeight: 'bold', marginTop: 2 },
  courseProgressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  courseProgressBarBg: { flex: 1, height: 6, backgroundColor: '#3f3f46', borderRadius: 3, marginRight: 12 },
  courseProgressBarFill: { width: '33%', height: '100%', backgroundColor: '#6366f1', borderRadius: 3 },
  courseProgressText: { color: '#a1a1aa', fontSize: 10, fontWeight: 'bold' }
});