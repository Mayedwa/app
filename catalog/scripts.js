// Sample product data
const products = [
    { name: "Nike Air Max", category: "men", price: 2500, img: "/images/men's sneakers.jpeg" },
    { name: "Adidas Ultraboost", category: "men", price: 3000, img: "/images/men's sneakers.jpeg" },
    { name: "Puma RS-X", category: "men", price: 2200, img: "/images/men's sneakers.jpeg" },
    { name: "Reebok Classic", category: "women", price: 1800, img: "/images/men's sneakers.jpeg" },
    { name: "Nike Free Run", category: "women", price: 2500, img: "/images/men's sneakers.jpeg" },
    { name: "Adidas Superstars", category: "women", price: 2000, img: "/images/men's sneakers.jpeg" },
    { name: "New Balance 574", category: "kids", price: 1500, img: "/images/men's sneakers.jpeg" },
    { name: "Nike Air Force 1", category: "kids", price: 1800, img: "/images/men's sneakers.jpeg" },
    { name: "Vans Old Skool", category: "kids", price: 1300, img: "/images/men's sneakers.jpeg" },
    { name: "Adidas NMD", category: "men", price: 2700, img: "/images/kids sneakers.jpg" },
    { name: "Converse Chuck Taylor", category: "men", price: 1600, img: "/images/women's sneakers.jpeg" },
    { name: "Nike ZoomX", category: "women", price: 2800, img: "/images/men's sneakers.jpeg" },
    { name: "Adidas NMD", category: "men", price: 2700, img: "/images/kids sneakers.jpg" },
    { name: "Fila Disruptor", category: "women", price: 1900, img: "/images/women's sneakers.jpeg" },
    { name: "Reebok Pump", category: "men", price: 3500, img: "/images/women's sneakers.jpeg" },
    { name: "Adidas Yeezy", category: "men", price: 4500, img: "/images/women's sneakers.jpeg" },
    { name: "Under Armour Curry", category: "men", price: 3200, img: "https://via.placeholder.com/300x200?text=Under+Armour+Curry" },
    { name: "Nike Blazer Mid", category: "women", price: 2200, img: "https://via.placeholder.com/300x200?text=Nike+Blazer+Mid" },
    { name: "Puma Future Rider", category: "kids", price: 1500, img: "https://via.placeholder.com/300x200?text=Puma+Future+Rider" },
    { name: "Vans Sk8-Hi", category: "women", price: 1600, img: "https://via.placeholder.com/300x200?text=Vans+Sk8-Hi" },
    { name: "Asics Gel Lyte", category: "men", price: 2000, img: "https://via.placeholder.com/300x200?text=Asics+Gel+Lyte" },
];

let currentPage = 1;
const itemsPerPage = 4;
let filteredProducts = products;



// Add product to cart function
function addToCart(productId, productName, productPrice) {
    if (isUserLoggedIn()) {
        // Get the current cart from localStorage, or create an empty array if it doesn't exist
        let cart = JSON.parse(localStorage.getItem('myCart')) || [];

        // Create a new product object
        const newProduct = {
            id: productId,
            name: productName,
            price: productPrice
        };

        // Add the new product to the cart array
        cart.push(newProduct);

        // Save the updated cart back to localStorage
        localStorage.setItem('myCart', JSON.stringify(cart));

        alert('Item added to cart!');
    } else {
        // If not logged in, redirect the user to the login page
        alert('Please log in first!');
        window.location.href = '/login/Login.html';
    }
}

// Display products based on filters and pagination
function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleProducts = filteredProducts.slice(startIndex, endIndex);

    visibleProducts.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">R${product.price}</p>
            <button onclick="addToCart(${index}, '${product.name}', ${product.price})">Add to Cart</button>
        `;
        productGrid.appendChild(productDiv);
    });

    document.getElementById('page-number').textContent = `Page ${currentPage}`;
}

// Filter products based on selected category and search term
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const searchFilter = document.getElementById('search-filter').value.toLowerCase();

    filteredProducts = products.filter(product => {
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchFilter);
        return matchesCategory && matchesSearch;
    });

    currentPage = 1; // Reset to first page after filtering
    displayProducts();
}

// Handle pagination buttons
document.getElementById('next-btn').addEventListener('click', () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts();
    }
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
});

document.getElementById('apply-filters-btn').addEventListener('click', filterProducts);

// Initialize page
displayProducts();

