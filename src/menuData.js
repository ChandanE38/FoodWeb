// menuData.js
const categoryImages = {
  Pizza: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500",
  Burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  Pasta: "https://images.unsplash.com/photo-1645112290557-1a6c2a0e0d1d?w=500",
  Chinese: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500",
  Starters: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500",
  Dessert: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
};

export const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic tomato sauce, mozzarella, and fresh basil",
    price: 299,
    mrp: 399,
    img: categoryImages.Pizza,
    category: "Pizza"
  },
  {
    id: 2,
    name: "Chicken Burger",
    description: "Grilled chicken patty with fresh vegetables",
    price: 199,
    mrp: 249,
    img: categoryImages.Burger,
    category: "Burger"
  },
  {
    id: 3,
    name: "Pasta Alfredo",
    description: "Creamy white sauce pasta with parmesan",
    price: 249,
    mrp: 299,
    img: categoryImages.Pasta,
    category: "Pasta"
  },
  {
    id: 4,
    name: "Veg Noodles",
    description: "Stir-fried noodles with mixed vegetables",
    price: 179,
    mrp: 229,
    img: categoryImages.Chinese,
    category: "Chinese"
  },
  {
    id: 5,
    name: "Chicken Wings",
    description: "Spicy fried chicken wings with dipping sauce",
    price: 349,
    mrp: 399,
    img: categoryImages.Starters,
    category: "Starters"
  },
  {
    id: 6,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with ganache",
    price: 149,
    mrp: 199,
    img: categoryImages.Dessert,
    category: "Dessert"
  },
  // 100 more items
  ...Array.from({ length: 100 }, (_, i) => {
    const categories = ["Pizza", "Burger", "Pasta", "Chinese", "Starters", "Dessert"];
    const cat = categories[i % categories.length];
    return {
      id: 7 + i,
      name: `${cat} Special ${i + 1}`,
      description: `Delicious ${cat.toLowerCase()} item number ${i + 1}`,
      price: 100 + ((i * 13) % 300),
      mrp: 120 + ((i * 17) % 350),
      img: categoryImages[cat],
      category: cat
    };
  })
]; 