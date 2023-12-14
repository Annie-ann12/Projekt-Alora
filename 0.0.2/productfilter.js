// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {

	const materialCheckboxes = document.querySelectorAll('input[type="checkbox"][name^="obecnykov"], input[type="checkbox"][name="stříbro"], input[type="checkbox"][name="zlato"]');
    const priceCheckboxes = document.querySelectorAll('input[type="checkbox"][name^="pod"], input[type="checkbox"][name="2-6"], input[type="checkbox"][name="nad6k"]');
    const colorCheckboxes = document.querySelectorAll('input[type="checkbox"][name^="pruhledna"], input[type="checkbox"][name="zlata"], input[type="checkbox"][name="ruzova"], input[type="checkbox"][name="stribrna"]');

    const productItems = document.querySelectorAll('.products_ul li');

    materialCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFilters);
    });

    colorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFilters);
    });

    priceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFilters);
    });

    function updateFilters() {
        const selectedMaterials = Array.from(materialCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id);


        const selectedColors = Array.from(colorCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id);

        const selectedPrices = Array.from(priceCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => parseInt(checkbox.value));

        // Checkne všechny produkty a porovná to s filtrem
        productItems.forEach(item => {
			
			// Všechno produkt info je pod h3 tagem
			const h3Element = item.querySelector('h3');

			var priceMatch = false;
			const productPrice = parseInt(h3Element.getAttribute('data-price'));
			
			// Filtr na cenu
			if (selectedPrices.length === 0) {
				priceMatch = true; // Pokud nic nevybrali, tak reset, aby to zobrazilo vsechny ceny.
			} else {
				if (selectedPrices[0] === 1 && productPrice < 2000) {
					priceMatch = true;
				} else if (selectedPrices[0] === 2 && productPrice >= 2000 && productPrice <= 6000) {
					priceMatch = true;
				} else if (selectedPrices[0] === 3 && productPrice > 6000) {
					priceMatch = true;
				}
			}

			const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(h3Element.getAttribute('data-material'));
			const colorMatch = selectedColors.length === 0 || selectedColors.includes(h3Element.getAttribute('data-color'));
			
			// Ukáže nebo skryje daný item, podle toho, jestli filtry sedí.
            item.style.display = materialMatch && colorMatch && priceMatch ? 'block' : 'none';
        });
    }
});
