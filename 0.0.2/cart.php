<?php
// cart.php

// Start the session
session_start();

// Include database connection details
include('db.php');

// Function to add a product to the cart
function addToCart($productId, $quantity = 1)
{
    // Initialize the cart if not already exists
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }

    // Add the product to the cart
    if (isset($_SESSION['cart'][$productId])) {
        $_SESSION['cart'][$productId] += $quantity;
    } else {
        $_SESSION['cart'][$productId] = $quantity;
    }
}

// Function to remove a product from the cart
function removeFromCart($productId)
{
    // Remove the product from the cart
    if (isset($_SESSION['cart'][$productId])) {
        unset($_SESSION['cart'][$productId]);
    }
}

// Function to display the cart
function displayCart()
{
    // Check if the cart is empty
    if (empty($_SESSION['cart'])) {
        echo "Your shopping cart is empty.";
    } else {
        // Display cart contents
        echo "<ul>";
        foreach ($_SESSION['cart'] as $productId => $quantity) {
            // Retrieve product details from the database
            $query = "SELECT * FROM products WHERE id = $productId";
            $result = mysqli_query($db, $query);
            $product = mysqli_fetch_assoc($result);

            // Display product information
            echo "<li>{$product['name']} - {$quantity} x {$product['price']} Kč</li>";
        }
        echo "</ul>";
    }
}

// Handle add to cart request
if (isset($_POST['action']) && $_POST['action'] == 'addToCart') {
    $productId = $_POST['productId'];
    addToCart($productId);
}

// Handle remove from cart request
if (isset($_GET['action']) && $_GET['action'] == 'removeFromCart') {
    $productId = $_GET['productId'];
    removeFromCart($productId);
}

?>
