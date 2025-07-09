import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Article } from '../services/newsApi';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface NewsItemProps {
  article: Article;
  onPress: (article: Article) => void;
}

export const NewsItem: React.FC<NewsItemProps> = ({ article, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(article)} style={styles.container}>
      <ThemedView style={styles.card}>
        {article.urlToImage && (
          <Image 
            source={{ uri: article.urlToImage }} 
            style={styles.image}
            contentFit="cover"
          />
        )}
        <ThemedView style={styles.content}>
          <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={2}>
            {article.title}
          </ThemedText>
          {article.description && (
            <ThemedText style={styles.description} numberOfLines={3}>
              {article.description}
            </ThemedText>
          )}
          <ThemedView style={styles.footer}>
            <ThemedText style={styles.source}>{article.source.name}</ThemedText>
            <ThemedText style={styles.date}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8,
  },
  date: {
    fontSize: 12,
    opacity: 0.6,
  },
});
