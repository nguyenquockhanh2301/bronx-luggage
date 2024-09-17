document.addEventListener('DOMContentLoaded', () => {
    // Load product data for category page if needed
    if (window.location.pathname.includes('category.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryName = urlParams.get('category');
        loadCategoryPage(categoryName);
    }
});

// Function to load products by category on the category page
function loadCategoryPage(categoryName) {
    // Determine which JSON file to load based on the category name
    let categoryFile;
    switch (categoryName) {
        case 'Hardside':
            categoryFile = 'data/hardside.json';
            break;
        case 'Softside':
            categoryFile = 'data/softside.json';
            break;
        case 'Duffel':
            categoryFile = 'data/duffel.json';
            break;
        case 'Carry-on':
            categoryFile = 'data/carryon.json';
            break;
        default:
            console.error('Unknown category:', categoryName);
            return;
    }

    // Fetch category data from the corresponding JSON file
    fetch(categoryFile)
        .then(response => response.json())
        .then(data => {
            // Set the category description
            document.getElementById('category-name').textContent = data.category;
            document.getElementById('category-description').textContent = data.description;

            // Display the products
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            data.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                    <a href="product.html?id=${product.id}">View Details</a>
                `;
                productList.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error loading category data:', error);
        });
}
