import { StyleSheet } from 'react-native';

const getStyles  = theme => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      backgroundColor: theme.surface,
    },
    backButton: {
      fontSize: 28,
      color: theme.text,
      fontWeight: '300',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
    },
    menuButton: {
      fontSize: 20,
      color: theme.text,
      fontWeight: '300',
    },
    itemsContainer: {
      padding: 20,
    },
    itemCard: {
      flexDirection: 'row',
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    //   shadowColor: theme.shadow,
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.1,
    //   shadowRadius: 3,
    //   elevation: 3,
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    itemImage: {
      width: 70,
      height: 70,
      borderRadius: 8,
      marginRight: 16,
    },
    itemDetails: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    itemInfo: {},
    itemName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 4,
    },
    itemCategory: {
      fontSize: 14,
      color: theme.secondary,
      marginBottom: 4,
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
    },
    moreButton: {
      padding: 4,
    },
    moreText: {
      fontSize: 20,
      color: theme.secondary,
      transform: [{ rotate: '90deg' }],
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    qtyButton: {
      width: 32,
      height: 32,
      borderRadius: 6,
      borderWidth: 0.5,
      borderColor: theme.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.surface,
      marginTop: 10,
    },
    qtyText: {
      fontSize: 16,
      color: theme.secondary,
    },
    qtyNumber: {
      marginHorizontal: 16,
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    shippingSection: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: theme.background,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 16,
    },
    paymentCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 16,
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    visaContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    visaLogo: {
      backgroundColor: '#1A1F71',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginRight: 12,
    },
    visaText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'bold',
    },
    cardNumber: {
      fontSize: 14,
      color: theme.text,
    },
    dropdownIcon: {
      fontSize: 16,
      color: theme.secondary,
    },
    summarySection: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: theme.background,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    summaryLabel: {
      fontSize: 16,
      color: theme.text,
    },
    summaryValue: {
      fontSize: 16,
      color: theme.text,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 8,
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    totalValue: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
    },
    payButtonContainer: {
      padding: 20,
      paddingTop: 16,
      bottom: 45,
      backgroundColor: theme.background,
    },
    payButton: {
      backgroundColor: theme.primary,
      borderRadius: 50,
      paddingVertical: 16,
      alignItems: 'center',
    },
    payButtonText: {
      color: theme.background,
      fontSize: 16,
      fontWeight: '600',
    },
    itemCardDisabled: { 
      opacity: 0.6 
    },
    qtyButtonDisabled: { 
      opacity: 0.5 
    },
    payButtonDisabled: { 
      opacity: 0.6,
      backgroundColor: theme.buttonDisabled,
    },
    emptyCart: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    emptyCartText: { 
      fontSize: 18, 
      fontWeight: 'bold',
      color: theme.text,
    },
    emptyCartSubtext: { 
      fontSize: 14, 
      color: theme.secondary, 
      marginTop: 8 
    },
    removeButton: { 
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 8,
    },
    removeText: { 
      fontSize: 18, 
      color: theme.error,
    },
    itemActions: {
      alignItems: 'space-between',
    },
  });

export default getStyles;
