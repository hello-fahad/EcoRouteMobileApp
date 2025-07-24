import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

export default function InputScreen() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleFindRoutes = async () => {
    setLoading(true);
    setError('');
    try {
      // Simulate network delay
      await new Promise((res) => setTimeout(res, 1000));
      router.push({ pathname: '/(tabs)/results', params: { from, to } });
    } catch (e) {
      setError('Failed to fetch routes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.label}>From</Text>
          <TextInput
            style={styles.input}
            value={from}
            onChangeText={setFrom}
            placeholder="Enter starting address"
            placeholderTextColor="#888"
            accessibilityLabel="From address"
            accessibilityHint="Enter the starting address"
          />
          <Text style={styles.label}>To</Text>
          <TextInput
            style={styles.input}
            value={to}
            onChangeText={setTo}
            placeholder="Enter destination address"
            placeholderTextColor="#888"
            accessibilityLabel="To address"
            accessibilityHint="Enter the destination address"
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Finding routes...</Text>
            </View>
          ) : (
            <View style={styles.buttonWrapper}>
              <Button
                title="Find Routes"
                onPress={handleFindRoutes}
                disabled={!from || !to}
                color={(!from || !to) ? '#ccc' : '#007AFF'}
                accessibilityLabel="Find Routes"
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16, // Increased for better touch target
    fontSize: 18, // Improved typography
    marginBottom: 12,
    minHeight: 48, // Ensures touch target
  },
  buttonWrapper: {
    marginTop: 24,
    minHeight: 48,
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    minHeight: 48,
  },
  loadingText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#007AFF',
  },
  error: {
    color: 'red',
    marginVertical: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
