// Sample data initialization
let products = JSON.parse(localStorage.getItem('products')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];

// Function to save data to local storage
function saveDataToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to display user data in the table
function displayUsers() {
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = ''; // Clear existing data

    for (const user of users) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><button class="deleteUserButton" data-id="${user.id}">Delete</button></td>
        `;
        userTableBody.appendChild(row);
    }
}

// Function to display product data in the table
function displayProducts() {
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = ''; // Clear existing data

    for (const product of products) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button class="deleteProductButton" data-id="${product.id}">Delete</button></td>
        `;
        productTableBody.appendChild(row);
    }
}

// Function to toggle the visibility of the add product form
function toggleAddProductForm() {
    const form = document.getElementById('addProductForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Function to toggle the visibility of the add user form
function toggleAddUserForm() {
    const form = document.getElementById('addUserForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Function to handle the submission of the product form
function handleProductFormSubmit(event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const newProduct = {
        id: products.length + 1,
        name: productName,
        price: productPrice,
    };
    products.push(newProduct);
    displayProducts();
    toggleAddProductForm();
    saveDataToLocalStorage(); // Save data to local storage
}

// Function to handle the submission of the user form
function handleUserFormSubmit(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userRole = document.getElementById('userRole').value;
    const newUser = {
        id: users.length + 1,
        name: userName,
        email: userEmail,
        role: userRole,
    };
    users.push(newUser);
    displayUsers();
    toggleAddUserForm();
    saveDataToLocalStorage(); // Save data to local storage
}

// Event listeners for showing/hiding the forms
document.getElementById('addProductButton').addEventListener('click', toggleAddProductForm);
document.getElementById('addUserButton').addEventListener('click', toggleAddUserForm);

// Event listeners for form submissions
document.getElementById('productForm').addEventListener('submit', handleProductFormSubmit);
document.getElementById('userForm').addEventListener('submit', handleUserFormSubmit);

// Event listener for deleting a user
document.querySelector('#userTableBody').addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteUserButton')) {
        const userId = parseInt(event.target.getAttribute('data-id'));
        deleteUserById(userId);
    }
});

// Event listener for deleting a product
document.querySelector('#productTableBody').addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteProductButton')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        deleteProductById(productId);
    }
});

// Function to handle the deletion of a user by ID
function deleteUserById(userId) {
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        displayUsers();
        saveDataToLocalStorage();
    }
}

// Function to handle the deletion of a product by ID
function deleteProductById(productId) {
    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
        products.splice(index, 1);
        displayProducts();
        saveDataToLocalStorage();
    }
}

// Initial display
displayProducts();
displayUsers();
