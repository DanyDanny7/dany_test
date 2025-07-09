import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';

export default function NewsDetailScreen() {
  const params = useLocalSearchParams();
  
  // Parse the article data from params
  const article = params.article ? JSON.parse(params.article as string) : null;

  if (!article) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Articulo no encontrado</ThemedText>
      </ThemedView>
    );
  }

  const handleReadMore = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        {article.urlToImage && (
          <Image 
            source={{ uri: article.urlToImage }} 
            style={styles.image}
            contentFit="cover"
          />
        )}
        
        <ThemedView style={styles.textContent}>
          <ThemedText type="title" style={styles.title}>
            {article.title}
          </ThemedText>
          
          <ThemedView style={styles.metadata}>
            <ThemedText style={styles.source}>{article.source.name}</ThemedText>
            <ThemedText style={styles.date}>
              {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </ThemedText>
            {article.author && (
              <ThemedText style={styles.author}>Por: {article.author}</ThemedText>
            )}
          </ThemedView>

          {article.description && (
            <ThemedText style={styles.description}>
              {article.description}
            </ThemedText>
          )}

          {article.content && (          <ThemedText style={styles.articleContent}>
            {article.content.replace(/\[\+\d+ chars\]/, '')}
          </ThemedText>
          )}

          <TouchableOpacity onPress={handleReadMore} style={styles.readMoreButton}>
            <ThemedText style={styles.readMoreText}>
              Leer artículo completo
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  textContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 32,
  },
  metadata: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  source: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    opacity: 0.8,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    fontWeight: '500',
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 24,
  },
  readMoreButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  readMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
