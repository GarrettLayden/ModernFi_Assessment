class Order {
    constructor(obj) {
        this.term = obj.term ? obj.term : null;
        this.amount = obj.amount? obj.amount : null;
    }

    timeStamp = new Date();
}

class OrderList { 
    constructor() {

    }
    
    orders = [];
}

module.exports = { Order, OrderList };