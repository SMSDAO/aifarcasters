import { View, Text, StyleSheet, FlatList } from 'react-native';

const PLACEHOLDER_FEED = [
  { id: '1', content: 'Just optimized my first AI prompt with AiFarcaster! 🤖', likes: 42, recasts: 12 },
  { id: '2', content: 'Web3 + AI = the future of social media. Building on Farcaster now.', likes: 87, recasts: 23 },
  { id: '3', content: 'Farcaster frames are incredible. AiFarcaster makes them even better.', likes: 31, recasts: 8 },
];

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>
      <FlatList
        data={PLACEHOLDER_FEED}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.actions}>
              <Text style={styles.action}>❤️ {item.likes}</Text>
              <Text style={styles.action}>🔄 {item.recasts}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', paddingHorizontal: 24, marginBottom: 16 },
  list: { paddingHorizontal: 24, paddingBottom: 24 },
  card: { backgroundColor: '#111', borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#27272a' },
  content: { color: '#fff', fontSize: 15, lineHeight: 22, marginBottom: 12 },
  actions: { flexDirection: 'row', gap: 16 },
  action: { color: '#a1a1aa', fontSize: 14 },
});
