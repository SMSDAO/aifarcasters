import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Welcome back!</Text>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Prompts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Tokens Used</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>Free</Text>
          <Text style={styles.statLabel}>Plan</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#a1a1aa', marginBottom: 32 },
  statsRow: { flexDirection: 'row', gap: 12 },
  stat: { flex: 1, backgroundColor: '#111', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#27272a', alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#9333ea', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#a1a1aa' },
});
