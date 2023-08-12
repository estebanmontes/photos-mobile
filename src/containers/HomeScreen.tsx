import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDebounce } from 'use-debounce';
import { colorFilters, orientationFilters } from '../assets/filters';
import { Filter, Picture, Search } from '../components';
import { searchImages } from '../services/api';
import { IImage } from '../types';

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const [searchResults, setSearchResults] = useState<IImage[]>([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedOrientation, setSelectedOrientation] = useState<string>('');
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const fetchImages = async () => {
    try {
      setLoading(true);
      const results: any = await searchImages(
        debouncedSearchTerm,
        page,
        selectedColor,
        selectedOrientation
      );
      results.results.length >= 1 && page > 1
        ? setSearchResults((prevImages) => [...prevImages, ...results.results])
        : setSearchResults(results.results);
      setLoading(false);
    } catch (error) {
      setError(true);
      setSearchResults([]);
    }
  };
  const handleColorFilter = (color: any) => {
    setSelectedColor(color.value);
    setPage(1);
  };
  const handleOrientationFilter = (orientation: any) => {
    setSelectedOrientation(orientation.value);
    setPage(1);
  };
  useEffect(() => {
    if (debouncedSearchTerm) fetchImages();
    if (!debouncedSearchTerm) {
      console.log('no search term');
      setSelectedColor('');
      setSelectedOrientation('');
      setSearchResults([]);
      setPage(1);
    }
  }, [debouncedSearchTerm, page, selectedColor, selectedOrientation]);

  const renderItem = ({ item }: { item: IImage }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ImageDetailScreen', { image: item })}>
      <Picture url={item.urls.regular} title={item.alt_description} />
    </TouchableOpacity>
  );

  const handleEndReached = () => {
    if (!loading) setPage((prevPage) => prevPage + 1);
  };

  const memoizedRenderItem = useMemo(() => renderItem, [searchResults]);

  return (
    <View style={styles.container}>
      <Search handleChange={(text) => setSearchTerm(text)} searchTerm={searchTerm} />
      <>
        {searchResults.length >= 1 && (
          <Filter data={colorFilters} filter={selectedColor} handlePress={handleColorFilter} />
        )}
        {searchResults.length >= 1 && (
          <Filter
            data={orientationFilters}
            filter={selectedOrientation}
            handlePress={handleOrientationFilter}
          />
        )}
        {error && <Text>Something went wrong ...</Text>}
        <FlatList
          data={searchResults}
          renderItem={memoizedRenderItem}
          keyExtractor={(item) => item.id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={<Text style={styles.empty}>No results found :( </Text>}
        />
        {loading && (
          <View style={styles.footer}>
            <ActivityIndicator size={'large'} />
          </View>
        )}
      </>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#000',
    justifyItems: 'center',
    flex: 1,
  },
  footer: {
    paddingBottom: 26,
  },
  empty: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 12,
  },
});
export default HomeScreen;
