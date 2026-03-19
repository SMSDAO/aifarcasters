import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.logo}>🤖</Text>
        <Text style={styles.title}>AiFarcaster</Text>
        <Text style={styles.subtitle}>AI-Powered Farcaster Tools</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Optimize Prompts</Text>
        <Text style={styles.cardText}>Use AI to craft better Farcaster content.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Track Analytics</Text>
        <Text style={styles.cardText}>Monitor your cast performance in real time.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Web3 Native</Text>
        <Text style={styles.cardText}>Connect your wallet and sign in with Ethereum.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 24, paddingTop: 60 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#a1a1aa', textAlign: 'center' },
  card: { backgroundColor: '#111', borderRadius: 14, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#27272a' },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 6 },
  cardText: { fontSize: 14, color: '#a1a1aa' },
});
