// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 79.99,
        oldPrice: 99.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 2,
        name: "Men's T-Shirt",
        category: "clothing",
        price: 24.99,
        oldPrice: 34.99,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
    },
    {
        id: 3,
        name: "Smart Watch",
        category: "electronics",
        price: 149.99,
        oldPrice: 199.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
    },
    {
        id: 4,
        name: "Cooking Set",
        category: "home",
        price: 89.99,
        oldPrice: 129.99,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1585837073703-7d6e6b9c5897?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 5,
        name: "Face Cream",
        category: "beauty",
        price: 34.99,
        oldPrice: 44.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 6,
        name: "Running Shoes",
        category: "clothing",
        price: 69.99,
        oldPrice: 89.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 7,
        name: "Phone Stand",
        category: "electronics",
        price: 19.99,
        oldPrice: 29.99,
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 8,
        name: "Candle Set",
        category: "home",
        price: 29.99,
        oldPrice: 39.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1603006905393-c279c4378f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
        id: 9,
        name: "Leather Wallet",
        category: "accessories",
        price: 49.99,
        oldPrice: 69.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
    },
    {
        id: 10,
        name: "Coffee Maker",
        category: "home",
        price: 129.99,
        oldPrice: 159.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1520970519539-8c9eaad9e8fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 11,
        name: "Wireless Earbuds",
        category: "electronics",
        price: 89.99,
        oldPrice: 119.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 12,
        name: "Yoga Mat",
        category: "fitness",
        price: 39.99,
        oldPrice: 49.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 13,
        name: "Sunglasses",
        category: "accessories",
        price: 59.99,
        oldPrice: 79.99,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 14,
        name: "Backpack",
        category: "accessories",
        price: 79.99,
        oldPrice: 99.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 15,
        name: "Moisturizer",
        category: "beauty",
        price: 24.99,
        oldPrice: 34.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    },
    {
        id: 16,
        name: "Fitness Tracker",
        category: "electronics",
        price: 99.99,
        oldPrice: 129.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
]