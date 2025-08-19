import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import productImages from '../constants/Images';
import App_Services from '../api/services';
import getStyles from './componentsStyles'
import { useTheme } from '../styles/ThemeContext';

const ProductDetailsModal = ({ visible, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState(0);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  if (!product) return null;

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['#888', '#333', '#000'];

  const handleAddToCart = async () => {
    try {
      await App_Services.addToCart(product.id, quantity);
    } catch (e) {
      console.log(e);
    }
    setQuantity(1);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imageContainer}>
            <Image
              source={productImages[product.image_url]}
              style={styles.image}
            />

            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Text>X</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.heartButton}>
              <Ionicons name="heart-outline" size={18} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{product.name}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Text style={styles.qtyText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyNumber}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.ratingContainer}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.rating}>
                {product.rating} ({product.reviewCount || '932 reviews'})
              </Text>
            </View>

            <Text style={styles.description}>
              {product.description ||
                'Its simple and elegant shape makes it perfect for those of you who like you who want minimalist clothes'}
            </Text>
            <TouchableOpacity>
              <Text style={styles.readMore}>Read More...</Text>
            </TouchableOpacity>

            {/* Size Selection */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Choose Size</Text>
              <View style={styles.sizeContainer}>
                {sizes.map(size => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeButton,
                      selectedSize === size && styles.sizeButtonSelected,
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        selectedSize === size && styles.sizeTextSelected,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Color</Text>
              <View style={styles.colorContainer}>
                {colors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorButton,
                      { backgroundColor: color },
                      selectedColor === index && styles.colorButtonSelected,
                    ]}
                    onPress={() => setSelectedColor(index)}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.cartBar}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <View style={styles.addButtonContent}>
              <Text style={styles.addButtonText}>
                Add to Cart | $
                {((product.price || 162.99) * quantity).toFixed(2)}
              </Text>
            </View>
            <Text style={styles.originalPrice}>
              ${((product.originalPrice || 190.99) * quantity).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductDetailsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    width: '93%',
    alignSelf: 'center',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 420,
    borderRadius: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
    color: '#000',
    fontWeight: '300',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartText: {
    fontSize: 20,
    color: '#000',
  },
  infoContainer: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  star: {
    fontSize: 16,
    color: '#FFD700',
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 4,
  },
  readMore: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginBottom: 24,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  sizeButtonSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  sizeText: {
    fontSize: 14,
    color: '#666',
  },
  sizeTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorButtonSelected: {
    borderColor: '#ddd',
  },
  cartBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  qtyText: {
    fontSize: 18,
    color: '#666',
  },
  qtyNumber: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  originalPrice: {
    color: '#999',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
});
