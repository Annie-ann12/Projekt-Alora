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
    { price: 4500, name: 'Třpytivý zásnubní prsten', material: 'zlato', color: 'ruzova' },
    { price: 6440, name: 'Zásnubní prsten pro princeznu', material: 'stříbro', color: 'stribrna' },
    // Add more products as needed
];

// Array to store the selected filter options
var selectedFilters = {
    kov: [],
    barvy: [],
    cena: []
};

//Filter
// Event listener for checkbox changes
document.addEventListener('change', function (event) {
    var checkbox = event.target;

    // Check if the changed element is a checkbox
    if (checkbox.type === 'checkbox') {
        var filterType = checkbox.name;
        var filterValue = checkbox.id;

        // Update the selectedFilters object based on the checkbox change
        if (checkbox.checked) {
            // Special handling for 'zlato' and 'ruzova'
            if (filterType === 'zlato'|| filterType === 'stříbro' || filterType === 'obecnykov') {
                selectedFilters['kov'].push(filterValue);
            } else if (filterType === 'ruzova' || filterType ==='stribrna' || filterType ==='zlata' || filterType ==='pruhledna') {
                selectedFilters['barvy'].push(filterValue);
            } else if (filterType === 'pod2k' || filterType ==='2-6' || filterType ==='nad6k') {
                selectedFilters['cena'].push(getPriceCategory(filterType));
            } else {
                // For other filter types, add to their respective arrays
                if (!selectedFilters[filterType]) {
                    selectedFilters[filterType] = [];
                }
                selectedFilters[filterType].push(filterValue);
            }
        } else {
            // Remove the filter value from the corresponding array
            if (filterType === 'zlato' || filterType === 'stříbro' || filterType === 'obecnykov') {
                selectedFilters['kov'] = selectedFilters['kov'].filter(value => value !== filterValue);
            } else if (filterType === 'ruzova' || filterType ==='stribrna' || filterType ==='zlata' || filterType ==='pruhledna') {
                selectedFilters['barvy'] = selectedFilters['barvy'].filter(value => value !== filterValue);
            } else if (filterType === 'pod2k' || filterType ==='2-6' || filterType ==='nad6k') {
                selectedFilters['cena'] = selectedFilters['cena'].filter(value => value !== getPriceCategory(filterType));
            } else {
                selectedFilters[filterType] = selectedFilters[filterType].filter(value => value !== filterValue);
            }
        }
        

        // Call the renderProducts function with the updated filters
        renderProducts(filterProducts());
    }
});




// Function to filter products based on selected filters
function filterProducts() {
    console.log('Selected Filters:', selectedFilters);
    return products.filter(product => {
        // Check if the product matches the selected filters
        var kovFilter = selectedFilters.kov.length === 0 || selectedFilters.kov.includes(product.material);
        var barvyFilter = selectedFilters.barvy.length === 0 || selectedFilters.barvy.includes(product.color);
        var cenaFilter = selectedFilters.cena.length === 0 || selectedFilters.cena.includes(getPriceCategory(product.price));

        return kovFilter && barvyFilter && cenaFilter;
    });
}

// Modify the renderProducts function to consider filtered products
function renderProducts(filteredProducts) {
    var productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    // Check if there are no filters selected
    if (Object.values(selectedFilters).flat().length === 0) {
        // If no filters are selected, render all products
        filteredProducts = products;
    }

    filteredProducts.forEach(product => {
        var li = document.createElement('li');
        li.setAttribute('data-material', product.material);
        li.setAttribute('data-color', product.color);
        li.setAttribute('data-price', product.price);

        li.innerHTML = `
            <div class="prod_img_smaller">
                <a href="#">
                    <img class="product_img" src="${getImageFileName(product.name)}" alt="${product.name}">
                </a>
                <div class="p_a_h">
                    <h3>
                        <a href="#">${product.name}</a>
                    </h3>
                    <p>${product.price} Kč</p>
                    <div class="div_koupit_button">
                        <button type="button" class="koupit_button">Koupit</button>
                    </div>
                </div>
            </div>
        `;

        productsList.appendChild(li);
    });
}


// Initial product rendering
renderProducts(products);

// Helper function to generate a suitable image file name based on the product name
function getImageFileName(productName) {
    return productName.replace(/\s+/g, '_').toLowerCase() + '.jpg';
}

// Helper function to determine the price category based on the price
function getPriceCategory(price) {
    if (price < 2000) {
        return '1';
    } else if (price >= 2000 && price <= 6000) {
        return '2';
    } else {
        return '3';
    }
}

// Sorting functions (if needed)
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

    renderProducts(filterProducts());
}
