import routesData from '@/assets/routes.json';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const modeIcons = {
  driving: '🚗',
  bicycling: '🚲',
  transit: '🚌',
  walking: '🚶',
};

export default function ResultsScreen() {
  const { from, to } = useLocalSearchParams();
  const router = useRouter();
  // Sort by score ascending and take top 3
  const routes = [...routesData].sort((a, b) => a.score - b.score).slice(0, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top 3 Routes</Text>
      <Text style={styles.subheader}>{from} → {to}</Text>
      {routes.length === 0 ? (
        <Text style={styles.empty}>No routes found.</Text>
      ) : (
        <FlatList
          data={routes}
          keyExtractor={(item) => item.mode}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {/* TODO: Navigate to map preview */}}
              activeOpacity={0.8}
              accessibilityLabel={`View details for ${item.mode} route`}
            >
              <Text style={styles.icon}>{modeIcons[item.mode as keyof typeof modeIcons]}</Text>
              <View style={styles.info}>
                <Text style={styles.mode}>{item.mode.toUpperCase()}</Text>
                <Text style={styles.detail}>Distance: <Text style={styles.value}>{item.distance_km} km</Text></Text>
                <Text style={styles.detail}>Time: <Text style={styles.value}>{item.time_min} min</Text></Text>
                <Text style={styles.detail}>CO₂: <Text style={styles.value}>{item.co2_g} g</Text></Text>
              </View>
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreText}>{item.score}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20, // Increased for better touch target
    borderRadius: 16,
    backgroundColor: '#f2f2f2',
    marginBottom: 16,
    elevation: 2,
    minHeight: 56, // Ensures touch target
  },
  icon: {
    fontSize: 36, // Larger icon for clarity
    marginRight: 20,
    minWidth: 48,
    textAlign: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  mode: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  detail: {
    fontSize: 15,
    marginBottom: 2,
    color: '#333',
  },
  value: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  scoreBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
    marginTop: 32,
  },
}); 