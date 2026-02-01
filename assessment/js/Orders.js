const Terms = ['Q1', 'Q2', 'Q3', 'Q4'];

$(document).ready(async function () {
    await init();
});

async function init() {

    const listOfOrders = await getOrders();
    createOrderHistorySection(listOfOrders);
    Terms.forEach(term => {
        $('#TermDropdown').append(`<option value='${term}'>${term}</option>`)
    })

    addEventListeners();
}

function addEventListeners() {
    $('#CreateOrderButton').on('click', function () {
        $('#CreateOrderDiv').removeAttr('hidden');
    });

    $('#CreateOrder_Cancel').on('click', function () {
        $('#CreateOrderDiv').attr('hidden', 'hidden');
        $('#TermDropdown').val('');
        $('#AmountInput').val('');
        $('#OrderValidationMessage').text('');
    });

    $('#ViewOrderHistoryButton').on('click', function () {
        $('#OrderHistoryDiv').removeAttr('hidden');
    });
}

async function getOrders() {
    try {
        const response = await fetch('/orders/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Server error on create order');
        }

        const listOfOrders = await response.json();
        console.log('orders received..');        
        return listOfOrders.orders;
    }
    catch (ex) {
        alert('There was an error getting your orders. Please try again later.');
        console.error('Error getting orders', ex);
    }
}

async function createOrderHistorySection(listOfOrders) {
    console.log('viewing orders...: ', listOfOrders);
    console.log(listOfOrders);

    if (listOfOrders === undefined || listOfOrders.length === 0) {
        return;
    }
    
    let orderDivs = '';
    for (let i = listOfOrders.length - 1; i >= 0; i--) {
        const order = listOfOrders[i];
        console.log('i', i);
        
        let orderCreatedAt = formatDateTime(order.timeStamp);

        orderDivs += `<div class="mb-3">
                <div>Term: ${order.term}<div>
                <div>Amount: ${order.amount}<div>
                <div>Created At: ${orderCreatedAt}<div>
            </div>`
    }

    console.log('orderDivs: ', orderDivs);

    $('#OrderHistoryDiv').html(orderDivs);
    console.log('order history section created..');
}

async function submitOrder() {
    console.log('order submitted');

    let termToAdd = $('#TermDropdown').val();
    let amountToAdd = $('#AmountInput').val();

    if (!termToAdd || !amountToAdd) {
        $('#OrderValidationMessage').text('Term and Amount are required');
        return;
    }

    try {
        console.log({termToAdd})
        console.log({amountToAdd})

        const response = await fetch('/orders/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                term: termToAdd,
                amount: amountToAdd
            })
        });

        if (!response.ok) {
            throw new Error('Server error on create order');
        }
    }
    catch (ex) {
        alert('There was an error submitting your order request. Please try again later.');
        console.error('Error submitting the order request', ex);
    }
    
    location.reload();
}

function formatDateTime(date) {
    date = (date instanceof Date) ? date : new Date(date);

    let year = date.getFullYear();
    let month = convertToTwoDigits(date.getMonth() + 1);
    let day = convertToTwoDigits(date.getDate());
    
    let hours = convertToTwoDigits(date.getHours());
    let minutes = convertToTwoDigits(date.getMinutes());
    let seconds = convertToTwoDigits(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function convertToTwoDigits(num) {
    return ("0" + num).slice(-2);
}