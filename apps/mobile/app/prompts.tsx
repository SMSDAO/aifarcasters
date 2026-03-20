import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';

export default function PromptsScreen() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(`Optimized: ${input}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Prompt Optimizer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your prompt..."
        placeholderTextColor="#71717a"
        value={input}
        onChangeText={setInput}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleOptimize} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Optimizing...' : 'Optimize Prompt'}</Text>
      </TouchableOpacity>
      {result && (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>Result</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 24 },
  input: { backgroundColor: '#111', borderRadius: 12, padding: 16, color: '#fff', borderWidth: 1, borderColor: '#27272a', marginBottom: 16, fontSize: 15, minHeight: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#9333ea', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 24 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  result: { backgroundColor: '#111', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#27272a' },
  resultLabel: { fontSize: 12, color: '#a1a1aa', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  resultText: { color: '#fff', fontSize: 15, lineHeight: 22 },
});
