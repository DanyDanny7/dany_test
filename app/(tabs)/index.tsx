import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet } from 'react-native';

import { NewsItem } from '@/components/NewsItem';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Article, getTopHeadlines } from '@/services/newsApi';

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadNews = async (pageNumber: number = 1, isRefresh: boolean = false) => {
    if ((loading || loadingMore) && !isRefresh) return;
    
    if (isRefresh) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const response = await getTopHeadlines(pageNumber, 20);
      
      if (isRefresh) {
        setArticles(response.articles);
        setPage(2);
        setHasMore(response.articles.length === 20);
      } else {
        setArticles(prev => [...prev, ...response.articles]);
        setPage(pageNumber + 1);
        setHasMore(response.articles.length === 20);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las noticias');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews(1, true);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    loadNews(1, true);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading && !loadingMore && articles.length > 0) {
      loadNews(page);
    }
  };

  const handleNewsPress = (article: Article) => {
    router.push({
      pathname: '/news-detail',
      params: { article: JSON.stringify(article) }
    });
  };

  const renderNewsItem = ({ item }: { item: Article }) => (
    <NewsItem article={item} onPress={handleNewsPress} />
  );

  const renderFooter = () => {
    if (!loadingMore || !hasMore) return null;
    return (
      <ThemedView style={styles.loadingFooter}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>Cargando más noticias...</ThemedText>
      </ThemedView>
    );
  };

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <ThemedView style={styles.emptyContainer}>
          <ActivityIndicator size="large" />
          <ThemedText style={styles.emptyText}>Cargando noticias...</ThemedText>
        </ThemedView>
      );
    }
    
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>No hay noticias disponibles</ThemedText>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Noticias</ThemedText>
        </ThemedView>
        
        <FlatList
          data={articles}
          renderItem={renderNewsItem}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          style={styles.newsList}
          contentContainerStyle={styles.newsListContent}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          windowSize={10}
        />
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  newsList: {
    flex: 1,
    marginTop: 20,
  },
  newsListContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  loadingFooter: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    opacity: 0.7,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 10,
    opacity: 0.7,
    textAlign: 'center',
  },
});
