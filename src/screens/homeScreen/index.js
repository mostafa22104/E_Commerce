import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../styles/ThemeContext';
import App_Services from '../../api/services';
import productImages from '../../constants/Images';
import ProductDetailsModal from '../../components/ProductDetailsModal';
import getStyles from './styles';
const categories = ['All Items', 'Dress', 'T-Shirt'];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { theme, isDark, setIsDark } = useTheme();
  const styles = getStyles(theme);
  useEffect(() => {
    loadProducts(1, true);
  }, []);

  const loadProducts = async (page, reset = false) => {
    if (loading) return;
    setLoading(true);

    const Success = result => {
      if (result.length > 0) {
        result.forEach(el => (el.rating = 4.9));

        if (reset) {
          setProducts(result);
        } else {
          setProducts(prev => [...prev, ...result]);
        }
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    };

    await App_Services.getProducts(Success, page, 16);
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);
      loadProducts(nextPage);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedProduct(item);
          setModalVisible(true);
        }}
        style={styles.card}
      >
        <View>
          <Image
            source={productImages[item.image_url]}
            style={styles.productImage}
          />
          <TouchableOpacity style={styles.heartBtn}>
            <Ionicons name="heart-outline" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productFooter}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="gold" />
            <Text>{item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Welcome 👋</Text>
          <Text style={styles.username}>Mostafa</Text>
        </View>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search clothes..."
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setIsDark(!isDark)}>
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={33}
            color={theme.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => {
              setActiveCategory(cat);
              setPageNumber(1);
              loadProducts(1, true);
            }}
            style={[
              styles.category,
              activeCategory === cat && styles.categoryActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Products */}
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color="black" /> : null
        }
      />
      <ProductDetailsModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
