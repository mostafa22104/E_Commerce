import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'ShopDB.db', location: 'default' },
  () => { console.log("Database opened"); },
  error => { console.log("Error: ", error); }
);

 const App_Service={
    initDatabase :async () => {
       await db.transaction(tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS products (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              price REAL NOT NULL,
              description TEXT,
              quantity INTEGER,
              image_url TEXT
            );`
          );
      
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS cart (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              product_id INTEGER NOT NULL,
              quantity INTEGER NOT NULL,
              FOREIGN KEY(product_id) REFERENCES products(id)
            );`
          );
          tx.executeSql(
            `SELECT COUNT(*) as count FROM products;`,
            [],
            (tx, results) => {
                console.log(results.rows)

                console.log(results.rows.item(0).count)
              if (results.rows.item(0).count === 0) {
               
                tx.executeSql(`INSERT INTO products (name, price, description, quantity, image_url) VALUES
                  ('Red Evening Dress', 59.99, 'Elegant red evening dress.', 10, 'dress0.jpeg'),
                  ('Blue Summer Dress', 45.50, 'Light and comfortable summer dress.', 15, 'dress1.jpeg'),
                  ('Green Casual Dress', 39.00, 'Casual cotton green dress.', 20, 'dress2.jpeg'),
                  ('Black Party Dress', 72.25, 'Stylish black dress for parties.', 12, 'dress3.jpeg'),
                  ('Floral Print Dress', 55.75, 'Colorful floral print dress.', 18, 'dress4.jpeg'),
                  ('White Wedding Dress', 120.00, 'Beautiful white dress for weddings.', 5, 'dress5.jpeg'),
                  ('Yellow Beach Dress', 35.99, 'Perfect light dress for the beach.', 25, 'dress6.jpeg'),
                  ('Pink Cocktail Dress', 64.00, 'Trendy pink cocktail dress.', 10, 'dress0.jpeg'),
                  ('Purple Long Dress', 70.50, 'Floor-length elegant dress.', 8, 'dress1.jpeg'),
                  ('Grey Office Dress', 48.30, 'Professional office dress.', 14, 'dress2.jpeg'),
                  ('Casual Linen Dress', 42.00, 'Light linen dress.', 17, 'dress3.jpeg'),
                  ('Boho Maxi Dress', 60.75, 'Bohemian style maxi dress.', 9, 'dress4.jpeg'),
                  ('Chic Black Dress', 80.50, 'Modern chic black dress.', 7, 'dress5.jpeg'),
                  ('Polka Dot Dress', 50.25, 'Playful polka dot design.', 16, 'dress6.jpeg'),
                  ('Orange Summer Dress', 46.10, 'Bright summer dress.', 19, 'dress0.jpeg'),
                  ('Denim Shirt Dress', 52.00, 'Stylish denim shirt dress.', 11, 'dress1.jpeg'),
                  ('Velvet Evening Dress', 95.99, 'Luxurious velvet dress.', 6, 'dress2.jpeg'),
                  ('Sequin Party Dress', 110.75, 'Sparkling sequin dress.', 4, 'dress3.jpeg'),
                  ('Mini Red Dress', 68.25, 'Short trendy red dress.', 13, 'dress4.jpeg'),
                  ('Wrap Green Dress', 58.40, 'Comfortable wrap style.', 15, 'dress5.jpeg');`
                );
      
                tx.executeSql(`INSERT INTO products (name, price, description, quantity, image_url) VALUES
                  ('Lace White Dress', 77.20, 'Delicate lace white dress.', 8, 'dress6.jpeg'),
                  ('Sleeveless Blue Dress', 62.10, 'Casual sleeveless summer dress.', 14, 'dress0.jpeg'),
                  ('Ruffle Pink Dress', 54.50, 'Trendy ruffle pink dress.', 10, 'dress1.jpeg'),
                  ('Classic Black Dress', 85.00, 'Elegant timeless black dress.', 7, 'dress2.jpeg'),
                  ('Silk Cocktail Dress', 98.30, 'Silky smooth cocktail wear.', 5, 'dress3.jpeg'),
                  ('Casual Day Dress', 40.20, 'Simple and comfy everyday dress.', 20, 'dress4.jpeg'),
                  ('Vintage Floral Dress', 66.80, 'Retro floral print dress.', 9, 'dress5.jpeg'),
                  ('Asymmetrical Red Dress', 74.25, 'Stylish asymmetrical hem.', 6, 'dress6.jpeg'),
                  ('Sporty Grey Dress', 45.50, 'Casual sporty design.', 12, 'dress0.jpeg'),
                  ('High Neck Black Dress', 89.40, 'Classy high neck design.', 4, 'dress1.jpeg'),
                  ('Elegant Purple Dress', 70.00, 'Graceful purple dress.', 8, 'dress2.jpeg'),
                  ('Printed Maxi Dress', 63.10, 'Colorful printed maxi.', 11, 'dress3.jpeg'),
                  ('Wrap Yellow Dress', 55.75, 'Sunny wrap style.', 14, 'dress4.jpeg'),
                  ('Bodycon Red Dress', 92.25, 'Slim-fit bodycon style.', 7, 'dress5.jpeg'),
                  ('Satin Green Dress', 100.90, 'Elegant satin material.', 6, 'dress6.jpeg'),
                  ('Casual Black Dress', 47.30, 'Everyday casual style.', 15, 'dress0.jpeg'),
                  ('Long White Dress', 78.20, 'Formal long white style.', 9, 'dress1.jpeg'),
                  ('Blue Evening Gown', 115.60, 'Luxury evening gown.', 3, 'dress2.jpeg'),
                  ('Tiered Pink Dress', 64.75, 'Layered tiered design.', 12, 'dress3.jpeg'),
                  ('Sleeveless Yellow Dress', 52.40, 'Perfect for hot days.', 16, 'dress4.jpeg'),
                  ('Bohemian Dress', 60.20, 'Flowy bohemian style.', 10, 'dress5.jpeg'),
                  ('Pleated Black Dress', 88.10, 'Sophisticated pleated design.', 5, 'dress6.jpeg'),
                  ('Casual Shirt Dress', 49.50, 'Relaxed shirt-dress style.', 14, 'dress0.jpeg'),
                  ('Ruffled Green Dress', 56.30, 'Chic ruffled look.', 13, 'dress1.jpeg'),
                  ('Trendy Mini Dress', 61.80, 'Trendy short mini.', 9, 'dress2.jpeg'),
                  ('Ball Gown Dress', 140.50, 'Formal ball gown.', 2, 'dress3.jpeg'),
                  ('Everyday Red Dress', 44.00, 'Simple casual red dress.', 20, 'dress4.jpeg'),
                  ('Cocktail Blue Dress', 68.70, 'Party cocktail blue.', 7, 'dress5.jpeg'),
                  ('Long Sleeve Dress', 59.90, 'Warm long-sleeve style.', 15, 'dress6.jpeg'),
                  ('Luxury Black Gown', 160.00, 'Premium luxury gown.', 2, 'dress0.jpeg');`
                );
      
                tx.executeSql(`INSERT INTO products (name, price, description, quantity, image_url) VALUES
                  ('Classic White T-Shirt', 19.99, 'Soft cotton classic white t-shirt.', 50, 'shert0.jpeg'),
                  ('Black V-Neck T-Shirt', 21.50, 'Casual black v-neck t-shirt.', 40, 'shert1.jpeg'),
                  ('Graphic Print Tee', 24.00, 'Trendy graphic printed t-shirt.', 35, 'shert2.jpeg'),
                  ('Blue Polo Shirt', 29.99, 'Smart casual blue polo shirt.', 25, 'shert3.jpeg'),
                  ('Striped T-Shirt', 22.75, 'Casual striped cotton t-shirt.', 30, 'shert4.jpeg'),
                  ('Red Sports Tee', 27.40, 'Breathable red sports t-shirt.', 20, 'shert5.jpeg'),
                  ('Green Casual Tee', 18.90, 'Everyday casual green tee.', 45, 'shert6.jpeg'),
                  ('Navy Henley T-Shirt', 26.99, 'Buttoned Henley-style navy tee.', 28, 'shert0.jpeg'),
                  ('Grey Pocket Tee', 20.25, 'Casual t-shirt with a chest pocket.', 33, 'shert1.jpeg'),
                  ('Yellow Summer T-Shirt', 23.10, 'Bright yellow summer tee.', 22, 'shert2.jpeg'),
                  ('Long Sleeve White Tee', 25.50, 'Warm long sleeve style.', 18, 'shert3.jpeg'),
                  ('Blue Striped Tee', 21.90, 'Casual striped design.', 26, 'shert4.jpeg'),
                  ('Black Oversized Tee', 28.75, 'Trendy oversized fit.', 14, 'shert5.jpeg'),
                  ('Vintage Band Tee', 32.00, 'Retro band graphic t-shirt.', 12, 'shert6.jpeg'),
                  ('Classic Grey Tee', 19.50, 'Simple grey cotton tee.', 35, 'shert0.jpeg'),
                  ('Green Polo Tee', 30.40, 'Smart casual polo.', 20, 'shert1.jpeg'),
                  ('White Henley Tee', 27.60, 'Henley-style white t-shirt.', 16, 'shert2.jpeg'),
                  ('Sport Blue Tee', 29.30, 'Sportswear breathable fabric.', 22, 'shert3.jpeg'),
                  ('Casual Black Tee', 20.90, 'Everyday casual wear.', 40, 'shert4.jpeg'),
                  ('Printed Red Tee', 26.70, 'Trendy red printed tee.', 18, 'shert5.jpeg');`
                );
      
                tx.executeSql(`INSERT INTO products (name, price, description, quantity, image_url) VALUES
                  ('Summer Yellow Tee', 24.50, 'Bright summer wear.', 23, 'shert6.jpeg'),
                  ('White Crew Neck Tee', 18.90, 'Classic crew neck.', 50, 'shert0.jpeg'),
                  ('Black Slim Tee', 22.40, 'Slim fit black tee.', 30, 'shert1.jpeg'),
                  ('Blue Casual Tee', 21.10, 'Comfortable blue casual tee.', 27, 'shert2.jpeg'),
                  ('Striped Polo Tee', 28.60, 'Smart striped polo.', 19, 'shert3.jpeg'),
                  ('Red Cotton Tee', 20.50, 'Soft red cotton fabric.', 25, 'shert4.jpeg'),
                  ('Grey Sports Tee', 29.00, 'Sports fit grey fabric.', 21, 'shert5.jpeg'),
                  ('Green V-Neck Tee', 23.10, 'Everyday green v-neck.', 30, 'shert6.jpeg'),
                  ('Classic Blue Tee', 20.75, 'Plain blue cotton tee.', 38, 'shert0.jpeg'),
                  ('Casual Polo Tee', 27.40, 'Smart casual polo style.', 15, 'shert1.jpeg'),
                  ('Trendy Black Tee', 31.20, 'Modern black streetwear.', 10, 'shert2.jpeg'),
                  ('Orange Summer Tee', 25.80, 'Bright summer orange.', 14, 'shert3.jpeg'),
                  ('Longline White Tee', 22.10, 'Trendy longline fit.', 18, 'shert4.jpeg'),
                  ('Purple Graphic Tee', 28.90, 'Cool purple graphic print.', 12, 'shert5.jpeg'),
                  ('Grey Everyday Tee', 19.40, 'Everyday grey design.', 40, 'shert6.jpeg'),
                  ('White Pocket Tee', 23.20, 'Pocket style cotton tee.', 25, 'shert0.jpeg'),
                  ('Blue Crew Neck Tee', 21.75, 'Casual crew neck.', 28, 'shert1.jpeg'),
                  ('Black Polo Tee', 29.40, 'Casual smart polo.', 19, 'shert2.jpeg'),
                  ('Yellow Graphic Tee', 26.50, 'Trendy yellow graphic.', 16, 'shert3.jpeg'),
                  ('Sports Red Tee', 28.20, 'Performance fabric.', 15, 'shert4.jpeg'),
                  ('Vintage Grey Tee', 30.00, 'Retro grey look.', 11, 'shert5.jpeg'),
                  ('Green Sports Tee', 25.40, 'Sporty green look.', 22, 'shert6.jpeg'),
                  ('Classic Navy Tee', 19.90, 'Navy classic design.', 35, 'shert0.jpeg'),
                  ('Oversized White Tee', 27.30, 'Relaxed oversized white.', 20, 'shert1.jpeg'),
                  ('Casual Black Polo', 32.50, 'Smart casual polo.', 10, 'shert2.jpeg'),
                  ('Graphic Blue Tee', 24.20, 'Printed graphic tee.', 18, 'shert3.jpeg'),
                  ('Striped Red Tee', 22.80, 'Striped casual red.', 15, 'shert4.jpeg'),
                  ('Modern Grey Tee', 26.90, 'Modern grey cut.', 17, 'shert5.jpeg'),
                  ('Sport White Tee', 28.60, 'Performance white shirt.', 21, 'shert6.jpeg'),
                  ('Everyday Black Tee', 23.70, 'Basic black cotton.', 29, 'shert0.jpeg');`
                );
      
                console.log('Products data inserted successfully!');
              } else {
                console.log('Products table already contains data, skipping insert.');
              }
            }
            )
        });

      
      },
      addToCart : async(product_id, quantity) => {
        db.transaction(tx => {
          tx.executeSql(
            "INSERT INTO cart (product_id, quantity) VALUES (?, ?);",
            [product_id, quantity],
            (txObj, resultSet) => console.log("Added to cart:", resultSet.insertId),
            (txObj, error) => console.log("Error adding to cart", error)
          );
        });
      },
      getProducts : async (Success, pageNumber = 1, pageSize = 10) => {
        const offset = (pageNumber - 1) * pageSize;
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM products LIMIT ? OFFSET ?;`,
            [pageSize, offset],
            (_, results) => {
              let rows = results.rows;
              let products = [];
              for (let i = 0; i < rows.length; i++) {
                products.push(rows.item(i));
              }
              Success(products);
            },
            (_, error) => {
              console.log("Error getting products", error);
            }
          );
        });
      },
      getCartItems :async (callback) => {
        db.transaction(tx => {
          tx.executeSql(
            `SELECT cart.id, products.name, products.price, cart.quantity, products.image_url
             FROM cart
             JOIN products ON cart.product_id = products.id;`,
            [],
            (txObj, { rows }) => callback(rows.raw()),
            (txObj, error) => console.log("Error fetching cart", error)
          );
        });
      },
      updateCartQuantity: async (product_id, quantity) => {
        db.transaction(tx => {
          if (quantity <= 0) {
            tx.executeSql(
              "DELETE FROM cart WHERE id = ?;",
              [product_id],
              (txObj, resultSet) => console.log("Item removed from cart:", product_id),
              (txObj, error) => console.log("Error removing from cart", error)
            );
          } else {
            tx.executeSql(
              "UPDATE cart SET quantity = ? WHERE id = ?;",
              [quantity, product_id],
              (txObj, resultSet) => console.log("Cart quantity updated:", product_id, "to", quantity),
              (txObj, error) => console.log("Error updating cart quantity", error)
            );
          }
        });
      },
      
      removeFromCart: async (product_id) => {
        db.transaction(tx => {
          tx.executeSql(
            "DELETE FROM cart WHERE id = ?;",
            [product_id],
            (txObj, resultSet) => console.log("Item removed from cart:", product_id),
            (txObj, error) => console.log("Error removing from cart", error)
          );
        });
      },
      
      getCartItemQuantity: async (product_id, callback) => {
        db.transaction(tx => {
          tx.executeSql(
            "SELECT quantity FROM cart WHERE id = ?;",
            [product_id],
            (txObj, resultSet) => {
              const quantity = resultSet.rows.length > 0 ? resultSet.rows.item(0).quantity : 0;
              console.log("Cart quantity for product", product_id, ":", quantity);
              if (callback) callback(quantity);
            },
            (txObj, error) => {
              console.log("Error getting cart quantity", error);
              if (callback) callback(0);
            }
          );
        });
      },
      getCartItemsCount :async (callback) => {
        db.transaction(tx => {
          tx.executeSql(
            `SELECT count(*) as count FROM cart`,
            [],
            (txObj, { rows }) => callback(rows.raw()),
            (txObj, error) => console.log("Error fetching cart", error)
          );
        });
      },
}

export default App_Service

