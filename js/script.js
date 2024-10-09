// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (username && email && password) {
                localStorage.setItem('user', JSON.stringify({ username, email, password }));
                document.getElementById('status').innerText = "Registration successful!";
                registerForm.reset();
                setTimeout(() => window.location.href = 'login.html', 2000);
            } else {
                document.getElementById('status').innerText = "Please fill out all fields.";
            }
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.username === username && user.password === password) {
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'catalog.html';
            } else {
                document.getElementById('loginStatus').innerText = "Invalid username or password!";
            }
        });
    }

    // Logout functionality
    const logoutLink = document.querySelector('a[href="logout.html"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', () => {
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html';
        });
    }

    // Redirect to login if not logged in
    const protectedPages = ['catalog.html', 'cart.html', 'checkout.html'];
    if (protectedPages.includes(window.location.pathname.split('/').pop())) {
        if (localStorage.getItem('loggedIn') !== 'true') {
            window.location.href = 'login.html';
        }
    }

    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('[data-product-id]');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const quantity = parseInt(button.previousElementSibling.value);
            if (quantity > 0) {
                addToCart(productId, quantity);
            }
        });
    });

    // Display products in catalog.html
    const productList = document.getElementById('product-list');
    if (productList) {
        const products = [
            { id: 1, name: "Apple", price: 1.00, img: "images/apple.jpeg" },
            { id: 2, name: "Banana", price: 0.50, img: "images/banana.jpeg" },
            { id: 3, name: "Orange", price: 0.75, img: "images/orange.jpeg" },
            { id: 4, name: "Milk", price: 1.20, img: "images/milk.jpeg" },
            { id: 5, name: "Bread", price: 2.00, img: "images/bread.jpeg" },
            { id: 6, name: "Eggs", price: 2.50, img: "images/eggs.jpeg" },
            { id: 7, name: "Chicken", price: 5.00, img: "images/chicken.jpeg" },
            { id: 8, name: "Rice", price: 3.00, img: "images/rice.jpeg" },
            { id: 9, name: "Cheese", price: 4.00, img: "images/cheese.jpeg" }
        ];

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <input type="number" min="1" value="1" data-product-id="${product.id}">
                <button data-product-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(productItem);
        });
    }

    // Display cart items in cart.html
    const cartTableBody = document.querySelector('#cartTable tbody');
    if (cartTableBody) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const products = [
            { id: 1, name: "Apple", price: 1.00 },
            { id: 2, name: "Banana", price: 0.50 },
            { id: 3, name: "Orange", price: 0.75 },
            { id: 4, name: "Milk", price: 1.20 },
            { id: 5, name: "Bread", price: 2.00 },
            { id: 6, name: "Eggs", price: 2.50 },
            { id: 7, name: "Chicken", price: 5.00 },
            { id: 8, name: "Rice", price: 3.00 },
            { id: 9, name: "Cheese", price: 4.00 }
        ];
        let total = 0;

        cartTableBody.innerHTML = ''; // Clear previous content
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>$${(product.price * item.quantity).toFixed(2)}</td>
                `;
                cartTableBody.appendChild(row);
                total += product.price * item.quantity;
            }
        });

        document.getElementById('cartTotal').innerText = `Total: $${total.toFixed(2)}`;
    }

    // Handle checkout (checkout.html)
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault();
            localStorage.removeItem('cart');
            alert('Thank you for your purchase!');
            window.location.href = 'index.html';
        });
    }
});

// Add to cart function with quantity
function addToCart(productId, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === parseInt(productId));
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ id: parseInt(productId), quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}
