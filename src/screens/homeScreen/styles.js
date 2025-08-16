import { StyleSheet } from "react-native";


  const getStyles = theme => StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: theme.background 
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      alignItems: 'center',
      backgroundColor: theme.surface,
    },
    greeting: { 
      color: theme.secondary 
    },
    username: { 
      fontSize: 18, 
      fontWeight: 'bold',
      color: theme.text 
    },
    avatar: { 
      width: 40, 
      height: 40, 
      borderRadius: 20,
      borderWidth: 2,
      borderColor: theme.border,
    },
    searchRow: { 
      flexDirection: 'row', 
      paddingHorizontal: 16, 
      marginTop: 8,
      justifyContent:'center',
      alignItems:'center'
    },
    searchBox: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.card,
      paddingLeft: 4,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      height:40,
    },
    searchInput: { 
      flex: 1, 
      marginLeft: 8,
      color: theme.text,
    },
    filterBtn: {
      marginLeft: 8,
    //   backgroundColor: theme.primary,
      padding: 10,
    //   borderRadius: 12,
    },
    categories: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginTop: 16,
      marginBottom: 16,
    },
    category: {
      paddingVertical: 6,
      paddingHorizontal: 14,
      backgroundColor: theme.card,
      borderRadius: 12,
      marginRight: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    categoryActive: { 
      backgroundColor: theme.primary 
    },
    categoryText: { 
      color: theme.text 
    },
    categoryTextActive: { 
      color: theme.background 
    },
    productList: { 
      paddingHorizontal: 16, 
      paddingTop: 20, 
      paddingBottom: 70 
    },
    card: { 
      marginBottom: 16, 
      width: '48%',
      backgroundColor: theme.surface,
      borderRadius: 16,
    //   shadowColor: theme.shadow,
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.1,
    //   shadowRadius: 4,
    //   elevation: 3,
    },
    productImage: {
      width: '100%',
      height: 250,
      borderRadius: 16,
    },
    heartBtn: {
      position: 'absolute',
      top: 8,
      right: 8,
    //   backgroundColor: theme.surface,
      padding: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.border,
    },
    productName: { 
      marginTop: 8, 
      fontWeight: '600',
      color: theme.text,
      paddingHorizontal: 8,
    },
    productFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 4,
      paddingHorizontal: 8,
      paddingBottom: 8,
    },
    price: { 
      fontWeight: 'bold',
      color: theme.text,
    },
    rating: { 
      flexDirection: 'row', 
      alignItems: 'center' 
    },
    ThemeSwitch:{
        marginLeft: 8,
        // backgroundColor: theme.primary,
        paddingTop: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.border,
      }
  });

  export default getStyles