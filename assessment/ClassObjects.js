class Order {
    constructor(obj) {
        this.term = obj.term ? obj.term : null;
        this.amount = obj.amount? obj.amount : null;
    }

    timeStamp = new Date();
}

class OrderList { 
    constructor() {
        this.orders = [];
    }

    addOrder(orderClass) {
        return this.orders.push(orderClass);
    }    

    getOrders() {
        return this.orders;
    }
}

module.exports = { Order, OrderList };