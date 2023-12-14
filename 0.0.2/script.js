document.addEventListener('mousedown', function (event) {
    var form = document.getElementById('myform');
    var loginForm = document.getElementById('myform_login');
    var blurContainer = document.querySelector('.blur-container');

    if (!form.contains(event.target) && form.style.display === 'block') {
        closeForm();
    }

    if (!loginForm.contains(event.target) && loginForm.style.display === 'block') {
        closeForm();
    }
});

function openForm() {
    document.getElementById('myform').style.display = 'block';
    document.querySelector('.blur-container').classList.add('blur');
}

function closeForm() {
    document.getElementById('myform').style.display = 'none';
    document.getElementById('myform_login').style.display = 'none';
    document.querySelector('.blur-container').classList.remove('blur');
}

function openLoginForm() {
    closeForm(); // Close myform before opening myform_login
    document.getElementById('myform_login').style.display = 'block';
    document.querySelector('.blur-container').classList.add('blur');
}
function closeLoginForm() {
      document.getElementById('myform_login').style.display = 'none';
      document.querySelector('.blur-container').classList.remove('blur');
}
// test nic neznamená
console.log('test')
// prsteny
function toggleSortingOptions() {
    var sortingOptions = document.getElementById("sortingOptions");
    sortingOptions.style.display = (sortingOptions.style.display === "none") ? "block" : "none";
}

function sortProducts(sortingOption) {
    // Add your sorting logic here based on the selected option
    console.log("Sorting products by: " + sortingOption);
}
// razeni
var products = [
    { price: 4500, name: 'Třpytivý zásnubní prsten' },
    { price: 5440, name: 'Zásnubní prsten pro princeznu' },
    // Add more products as needed
];

// Initial product rendering
renderProducts(products);

function toggleSortingOptions() {
    var sortingOptions = document.getElementById('sortingOptions');
    sortingOptions.style.display = (sortingOptions.style.display === 'none' || sortingOptions.style.display === '') ? 'block' : 'none';
}

function sortProducts(sortBy) {
    if (sortBy === 'price_ascending') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_descending') {
        products.sort((a, b) => b.price - a.price);
    }

    renderProducts(products);
}
function renderProducts(products) {
    var productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    products.forEach(product => {
        var li = document.createElement('li');
        li.setAttribute('data-price', product.price);

        var formattedPrice = product.price.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' });

        li.innerHTML = `
            <div class="prod_img_smaller">
                <a href="#">
                    <img class="product_img" src="${getImageFileName(product.name)}" alt="${product.name}">
                </a>
                <div class="p_a_h">
                    <h3>
                        <a href="#">${product.name}</a>
                    </h3>
                    <p>${formattedPrice}</p>
                </div>
            </div>
        `;

        productsList.appendChild(li);
    });
}

// Helper function to generate a suitable image file name based on the product name
function getImageFileName(productName) {
    // Replace spaces with underscores and convert to lowercase
    return productName.replace(/\s+/g, '_').toLowerCase() + '.jpg';
}
