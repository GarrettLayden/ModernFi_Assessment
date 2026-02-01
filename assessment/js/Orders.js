// const { Order } = require("../ClassObjects");

const Terms = ['Q1', 'Q2', 'Q3', 'Q4'];

$(document).ready(async function () {
    console.log('orders');
    
    init();
});

function init() {
    Terms.forEach(term => {
        $('#TermDropdown').append(`<option value='${term}'>${term}</option>`)
    })

    $('#CreateOrderButton').on('click', function () {
        $('#CreateOrderDiv').removeAttr('hidden');
    });

    $('#CreateOrder_Cancel').on('click', function () {
        $('#CreateOrderDiv').attr('hidden', 'hidden');
        $('#TermDropdown').val('');
        $('#AmountInput').val('');
        $('#OrderValidationMessage').text('');
    });
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