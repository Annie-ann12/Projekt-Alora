document.addEventListener('mousedown', function (event) {
    var form = document.getElementById('myform');
    var loginForm = document.getElementById('myform_login');
    var blurContainer = document.querySelector('.blur-container');

    if (!form.contains(event.target) && form.style.display === 'block') {
        closeForm();
    }

    if (!loginForm.contains(event.target) && loginForm.style.display === 'block') {
        closeLoginForm();
    }
});

function openForm() {
    document.getElementById('myform').style.display = 'block';
    document.getElementById('myform_login').style.display = 'none';
    document.querySelector('.blur-container').classList.add('blur');
}

function closeForm() {
    document.getElementById('myform').style.display = 'none';
    document.querySelector('.blur-container').classList.remove('blur');
}

function openLoginForm() {
    document.getElementById('myform_login').style.display = 'block';
    document.getElementById('myform').style.display = 'none';
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
    console.log("Sorting products by: " + sortingOption);
}


// razeni
var products = [
    { price: 4500, name: 'Třpytivý zásnubní prsten', material: 'zlato', color: 'ruzova' },
    { price: 6440, name: 'Zásnubní prsten pro princeznu', material: 'stříbro', color: 'stribrna' },
];

var selectedFilters = {
    kov: [],
    barvy: [],
    cena: []
};

//Filter
document.addEventListener('change', function (event) {
    var checkbox = event.target;

    
    if (checkbox.type === 'checkbox') {
        var filterType = checkbox.name;
        var filterValue = checkbox.id;

        //podle čeho se třídí
        if (checkbox.checked) {
            if (filterType === 'zlato'|| filterType === 'stříbro' || filterType === 'obecnykov') {
                selectedFilters['kov'].push(filterValue);
            } else if (filterType === 'ruzova' || filterType ==='stribrna' || filterType ==='zlata' || filterType ==='pruhledna') {
                selectedFilters['barvy'].push(filterValue);
            } else if (filterType === 'pod2k' || filterType ==='2-6' || filterType ==='nad6k') {
                selectedFilters['cena'].push(getPriceCategory(filterType));
            } else {
                if (!selectedFilters[filterType]) {
                    selectedFilters[filterType] = [];
                }
                selectedFilters[filterType].push(filterValue);
            }
        } else {
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
        

        renderProducts(filterProducts());
    }
});



//třídění
function filterProducts() {
    console.log('Selected Filters:', selectedFilters);
    return products.filter(product => {
        var kovFilter = selectedFilters.kov.length === 0 || selectedFilters.kov.includes(product.material);
        var barvyFilter = selectedFilters.barvy.length === 0 || selectedFilters.barvy.includes(product.color);
        var cenaFilter = selectedFilters.cena.length === 0 || selectedFilters.cena.includes(getPriceCategory(product.price));

        return kovFilter && barvyFilter && cenaFilter;
    });
}

function renderProducts(filteredProducts) {
    var productsList = document.getElementById('productsList');
    productsList.innerHTML = '';
    
    if (Object.values(selectedFilters).flat().length === 0) {
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
                    <button type="button" class="koupit_button" data-product-id="${product.id}">Koupit</button>
                    </div>
                </div>
            </div>
        `;

        productsList.appendChild(li);
    });
}


renderProducts(products);


function getImageFileName(productName) {
    return productName.replace(/\s+/g, '_').toLowerCase() + '.jpg';
}

//třídění dle ceny - výpočet
function getPriceCategory(price) {
    if (price < 2000) {
        return '1';
    } else if (price >= 2000 && price <= 6000) {
        return '2';
    } else {
        return '3';
    }
}


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

//validace hesla
function validatePasswordOnInput(value) {
    const lengthRegex = /.{8,}/; 
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/; 
    const digitRegex = /\d/; 
    const specialCharRegex = /[.!@#$%^&*]/; 

    // otestuje, jestli projde zadaný input 
    const isLengthValid = lengthRegex.test(value); 
    const hasUppercase = uppercaseRegex.test(value);
    const hasLowercase = lowercaseRegex.test(value);
    const hasDigit = digitRegex.test(value);
    const hasSpecialChar = specialCharRegex.test(value);

    // funkce pro real-time updatování zprávy pro zákazníka, aby věděl, co ještě musí přidat
    document.getElementById("lengthReq").style.color = isLengthValid ? "green" : "red";
    document.getElementById("uppercaseReq").style.color = hasUppercase ? "green" : "red";
    document.getElementById("lowercaseReq").style.color = hasLowercase ? "green" : "red";
    document.getElementById("digitReq").style.color = hasDigit ? "green" : "red";
    document.getElementById("specialCharReq").style.color = hasSpecialChar ? "green" : "red";

    const passwordInput = document.getElementById("passwordInput");

    // pokud prošel regexem, změnit barvu na zelenou
    if (isLengthValid && hasUppercase && hasLowercase && hasDigit && hasSpecialChar) {
        passwordInput.style.border = "2px solid green";
        document.getElementById("submitButton").disabled = false;
      } else {
        passwordInput.style.border = "2px solid red";
        document.getElementById("submitButton").disabled = true;
      }
  }

  // validace hesla
  function validateForm() {
    const password = document.getElementById("passwordInput").value; 

    if (!isPasswordValid) { 
      alert("Zadané heslo nesplňuje požadavky.");
      return false;
    }

    return true;
  }
