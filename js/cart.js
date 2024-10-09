<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FreshMart - Cart</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <img src="images/logo.png" alt="FreshMart Logo">
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="catalog.html">Products</a></li>
                <li><a href="cart.html">Cart</a></li>
                <li><a href="customer-support.html">Customer Support</a></li>
                <li><a href="logout.html">Logout</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>Your Cart</h1>
        <table id="cartTable">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        <p id="cartTotal">Total: $0.00</p>
        <button id="checkoutButton">Proceed to Checkout</button>
    </main>

    <footer>
        <p>&copy; 2024 FreshMart</p>
    </footer>
    <script src="js/script.js"></script>
</body>
</html>
