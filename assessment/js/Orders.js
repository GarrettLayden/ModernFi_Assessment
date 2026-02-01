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
    });
}