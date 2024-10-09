// auth.js

document.addEventListener('DOMContentLoaded', () => {
    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simple mock registration logic
            localStorage.setItem('user', JSON.stringify({ username, email, password }));
            document.getElementById('status').innerText = "Registration successful!";
            registerForm.reset();
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
                localStorage.setItem('loggedIn', true);
                window.location.href = 'catalog.html';
            } else {
                document.getElementById('loginStatus').innerText = "Invalid username or password!";
            }
        });
    }

    // Logout
    const logoutLink = document.querySelector('a[href="logout.html"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', () => {
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html';
        });
    }

    // Redirect to login if not logged in
    if (!localStorage.getItem('loggedIn')) {
        const protectedPages = ['catalog.html', 'cart.html', 'checkout.html'];
        if (protectedPages.includes(window.location.pathname.split('/').pop())) {
            window.location.href = 'login.html';
        }
    }
});
