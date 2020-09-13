// Getting DOM Elements
const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleMoneyButton = document.getElementById('double');
const showMillionairesButton = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const totalButton = document.getElementById('calculate-total');

// Initializing Data Array
let data = [];

// Create Initial Users
generateRandomUser();
generateRandomUser();
generateRandomUser();

// Function to Fetch Random User from API
// API: randomuser.me/api
async function generateRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    
    const newUser = {
        name: `${user.name.first} ${user.name.last}` ,
        worth: Math.round(Math.random()*1000000)
    };

    addData(newUser);

}

// Function to Double the Net Worth of Each User
function doubleWorth() {
    data = data.map( item => {
        return { ...item, worth: item.worth * 2 }
    });

    updateDOM();
}

// Function to Sort the Users by Richest Users
function sortRichest() {
    data.sort( (a, b) => b.worth - a.worth );

    updateDOM();
}

// Function to Filter the Users and Only Show Millionaires
function showMillionaires() {
    data = data.filter(
        item => item.worth > 1000000
    );

    updateDOM();
}

// Function to Calculate the Total Net Worth of All Users
function calculateTotalNetWorth() {
    const totalWorth = data.reduce(
        (acc, item) => (acc += item.worth), 0
    );

    const totalNetWorthElement = document.createElement('div');
    totalNetWorthElement.innerHTML = `<h3>Total Net Worth: <strong>${formatCurrency(totalWorth)}</strong></h3>`;
    main.appendChild(totalNetWorthElement);
}

// Add Newly Generated User into the Data Array
function addData(newUser) {
    data.push(newUser);

    updateDOM();
}

// Function to Update the UI with DOM
function updateDOM(inputData = data) {
    main.innerHTML = '<h2><strong>Name</strong> Net Worth</h2>';

    inputData.forEach( item => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(item.worth)}`;
        main.appendChild(element);
    });
}

// Function to format a number as a currency
function formatCurrency(num) {
    return 'PKR ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
// 1. Add User Event Listener
addUserButton.addEventListener('click', generateRandomUser);

// 2. Add Double Money Event Listener
doubleMoneyButton.addEventListener('click', doubleWorth);

// 3. Add Sort Event Listener
sortButton.addEventListener('click', sortRichest);

// 4. Add Show Millionaires Event Listener
showMillionairesButton.addEventListener('click', showMillionaires);

// 5. Add Calculate Total Wealth Event Listener
totalButton.addEventListener('click', calculateTotalNetWorth);