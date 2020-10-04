// Get DOM elements
const balance = document.getElementById('balance');
const money_plus =  document.getElementById('money-plus');
const money_minus =  document.getElementById('money-minus');
const list =  document.getElementById('list');
const form =  document.getElementById('form');
const description =  document.getElementById('description');
const amount =  document.getElementById('amount');

// Dummy Transactions
const dummyTransactions = [
    { id: 1, description: 'Salary', amount: 100000 },
    { id: 2, description: 'Electric Bill', amount: -50000 },
    { id: 3, description: 'Internet Bill', amount: -10000 },
    { id: 4, description: 'Profit', amount: 50000 }
];

let transactions = dummyTransactions;

// Function to generate an ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add a New Transaction from the Form
function addTransaction(e) {
    e.preventDefault();

    if( description.value.trim() === '' || amount.value.trim() === '' ) {
        alert('Please enter a valid description and transaction amount.')
    } else {
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value
            };
        
        transactions.push(transaction);

        addTransactionUI(transaction);
        updateSums();

        description.value = '';
        amount.value = '';
    }
}

// Function to Remove a Transaction
function deleteTransaction(id) {
    transactions = transactions.filter( transaction => transaction.id != id );
    init();
}

// Function to display Transactions in Transaction History
function addTransactionUI(transaction) {
    // Classify if income or expense
    const type = transaction.amount > 0 ? '+' : '-';

    // Create DOM Element for List Item
    const item = document.createElement('li');

    // Add class for list item based on type
    item.classList.add( transaction.amount  > 0 ? 'plus' : 'minus' );

    item.innerHTML = `
        ${transaction.description}
        <span>${type}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item);
}

// Function to update the balance, income, and expense summaries
function updateSums() {
    // Create array of transaction amounts from transactions array
    const amounts = transactions.map( transaction => transaction.amount );
    
    // Calculate total value for balance
    const total = amounts
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);
    
    // Calculate total income
    const income = amounts
                    .filter( amount => amount > 0 )
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);

    // Calculate total expense
    const expense = amounts
                    .filter( amount => amount < 0 )
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);
    
    // Update Balance in DOM
    balance.innerText = `${total} PKR`

    // Update Income in DOM
    money_plus.innerText = `${income} PKR`

    // Update Expense in DOM
    money_minus.innerText = `${expense} PKR`
}

// Function to initialize the App
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionUI);
    updateSums();
}

// Event Listeners
// 1. Event Listener for form submit
form.addEventListener('submit', addTransaction);

init();