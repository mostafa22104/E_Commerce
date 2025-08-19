import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import App_Services from '../../api/services';
import getStyles from './styles';
import { useTheme } from '../../styles/ThemeContext';
import productImages from '../../constants/Images';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CartScreen() {
  const [items, setItems] = useState([]);
  const [shippingFee, setShippingFee] = useState(0.0);
  const [discount, setDiscount] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const styles = getStyles(theme);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const loadProducts = async () => {
    const Success = result => {
      console.log('Cart items loaded:', result);
      if (result.length > 0) {
        setItems(result);
      } else {
        setItems([]);
      }
    };

    await App_Services.getCartItems(Success);
  };

  const updateQuantity =useCallback( async (cartId, productId, change) => {
    const currentItem = items.find(item => (item.cart_id || item.id) === cartId);
    if (!currentItem) return;

    const newQuantity = Math.max(0, currentItem.quantity + change);
    
    // setLoading(true);
    
    try {
      await App_Services.updateCartQuantity(productId, newQuantity);
      
      if (newQuantity === 0) {
        setItems(items.filter(item => (item.cart_id || item.id) !== cartId));
      } else {
        setItems(
          items.map(item =>
            (item.cart_id || item.id) === cartId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'Failed to update quantity. Please try again.');
    } finally {
      // setLoading(false);
    }
  })

  const removeItem =useCallback( async (cartId, productId) => {
    const currentItem = items.find(item => (item.cart_id || item.id) === cartId);
    if (!currentItem) return;

    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            // setLoading(true);
            try {
              // Remove from database using product_id (your DB function expects product_id)
              await App_Services.removeFromCart(productId);
              
              // Update local state
              setItems(items.filter(item => (item.cart_id || item.id) !== cartId));
            } catch (error) {
              console.error('Error removing item:', error);
              Alert.alert('Error', 'Failed to remove item. Please try again.');
            } finally {
              // setLoading(false);
            }
          },
        },
      ]
    );
  });

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const total = useMemo(() => calculateTotal(), [items]);
  const subTotal = useMemo(
    () => total + shippingFee - discount,
    [total, shippingFee, discount],
  );

  const renderCartItem = ({ item }) => {
    // Get the correct cart ID - could be cart_id from JOIN or just id
    const cartId = item.cart_id || item.id;
    const productId = item.product_id || item.id;
    
    return (
      <View style={[styles.itemCard, loading && styles.itemCardDisabled]}>
        <Image source={productImages[item.image_url]} style={styles.itemImage} />

        <View style={styles.itemDetails}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>
              ${item.price.toFixed(2)}
            </Text>
          </View>

        
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeItem(cartId, productId)}
              disabled={loading}
            >
              <Ionicons name="trash" size={18} color={theme.primary} />
            </TouchableOpacity>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[styles.qtyButton, loading && styles.qtyButtonDisabled]}
                onPress={() => updateQuantity(cartId, productId, -1)}
                disabled={loading}
              >
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNumber}>{item.quantity}</Text>
              <TouchableOpacity
                style={[styles.qtyButton, loading && styles.qtyButtonDisabled]}
                onPress={() => updateQuantity(cartId, productId, 1)}
                disabled={loading}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View> 
        </View>
      </View>
    );
  };

  const renderFooter = () => (
    <>
      <View style={styles.shippingSection}>
        <Text style={styles.sectionTitle}>Shipping Information</Text>

        <TouchableOpacity style={styles.paymentCard}>
          <View style={styles.visaContainer}>
            <View style={styles.visaLogo}>
              <Text style={styles.visaText}>VISA</Text>
            </View>
            <Text style={styles.cardNumber}>**** **** **** 2143</Text>
          </View>
          <Text style={styles.dropdownIcon}>⌄</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summarySection}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Total ({getTotalItems()} items)
          </Text>
          <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping Fee</Text>
          <Text style={styles.summaryValue}>${shippingFee.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount</Text>
          <Text style={styles.summaryValue}>${discount.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Sub Total</Text>
          <Text style={styles.totalValue}>${subTotal.toFixed(2)}</Text>
        </View>
      </View>
    </>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyCart}>
      <Text style={styles.emptyCartText}>Your cart is empty</Text>
      <Text style={styles.emptyCartSubtext}>Add some items to get started</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <TouchableOpacity>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => (item.cart_id || item.id).toString()}
            renderItem={renderCartItem}
            contentContainerStyle={styles.itemsContainer}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
          />

          <View style={styles.payButtonContainer}>
            <TouchableOpacity 
              style={[styles.payButton, loading && styles.payButtonDisabled]}
              disabled={loading}
            >
              <Text style={styles.payButtonText}>
                {loading ? 'Updating...' : 'Pay'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}