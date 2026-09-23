import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function PerfilScreen() {
  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.coverPhoto} />

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarBox}>
             <Text style={styles.avatarPlaceholder}>IZ</Text>
          </View>
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.name}>Izak</Text>
          <Text style={styles.location}>Uberlândia, MG</Text>
        </View>

        <View style={styles.cvCard}>
          <Text style={styles.cvTitle}>Meu Currículo</Text>
          <Text style={styles.cvDescription}>Seu perfil foi formatado automaticamente nos padrões empresariais.</Text>
          
          <View style={styles.cvButtonsRow}>
            <TouchableOpacity style={styles.pdfButton}>
              <Text style={styles.pdfButtonText}>Baixar PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wordButton}>
              <Text style={styles.wordButtonText}>Editar Word</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>STACK & SKILLS</Text>
        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <View style={[styles.tagDot, { backgroundColor: '#22d3ee' }]} />
            <Text style={styles.tagText}>Tailwind CSS</Text>
          </View>
          <View style={styles.tag}>
            <View style={[styles.tagDot, { backgroundColor: '#3b82f6' }]} />
            <Text style={styles.tagText}>Python</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#18181b' },
  coverPhoto: { height: 140, backgroundColor: '#312e81', borderBottomWidth: 1, borderBottomColor: '#27272a' },
  content: { paddingHorizontal: 24, paddingBottom: 100 },
  avatarContainer: { marginTop: -40, marginBottom: 16 },
  avatarBox: { width: 88, height: 88, backgroundColor: '#3f3f46', borderRadius: 20, borderWidth: 4, borderColor: '#18181b', justifyContent: 'center', alignItems: 'center' },
  avatarPlaceholder: { color: '#a1a1aa', fontSize: 28, fontWeight: 'bold' },
  headerInfo: { marginBottom: 24 },
  name: { color: '#ffffff', fontSize: 24, fontWeight: 'bold' },
  location: { color: '#818cf8', fontSize: 14, fontWeight: '500', marginTop: 4 },
  cvCard: { backgroundColor: 'rgba(79, 70, 229, 0.1)', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)', borderRadius: 16, padding: 20, marginBottom: 32 },
  cvTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  cvDescription: { color: '#a1a1aa', fontSize: 12, lineHeight: 18, marginBottom: 20 },
  cvButtonsRow: { flexDirection: 'row', gap: 12 },
  pdfButton: { flex: 1, backgroundColor: '#27272a', paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: '#3f3f46', alignItems: 'center' },
  pdfButtonText: { color: '#f4f4f5', fontSize: 12, fontWeight: 'bold' },
  wordButton: { flex: 1, backgroundColor: '#4f46e5', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  wordButtonText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  sectionTitle: { color: '#d4d4d8', fontSize: 12, fontWeight: 'bold', marginBottom: 16, letterSpacing: 1 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 32 },
  tag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#27272a', borderWidth: 1, borderColor: '#3f3f46', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginRight: 8, marginBottom: 8 },
  tagDot: { width: 6, height: 6, borderRadius: 3, marginRight: 8 },
  tagText: { color: '#d4d4d8', fontSize: 12, fontWeight: '600' }
});