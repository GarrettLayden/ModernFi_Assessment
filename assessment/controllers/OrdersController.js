const { Order, OrderList } = require("../ClassObjects");

class OrdersController {
    constructor() {}
    // GET function
    // 
    async getOrders(req, res) {
        try {
            const orders = OrderList.orders;

            return res.json({
                orders: orders
            });
        }
        catch(ex) {
            console.error('Error getting orders: ', ex);

            return res.status(500).json({
                error: 'Failed to get orders',
                message: ex.message
            });
        }        
    }

    // POST function
    async createOrder(req, res) {
        try {
            const { term, amount } = req.body;

            if (!term || !amount) {
                return res.status(400).json({
                    error: 'Term and amount are required.'
                });
            }

            const order = new Order(req.body);
            OrderList.orders.push(order);

            console.log('Order List: ', { OrderList });

            return res.status(200).json({
                success: true,
                message: 'Successfully created order'
            });
        }
        catch (ex) {
            console.error('Error creating order: ', ex);

            return res.status(500).json({
                error: 'Failed to create order',
                message: ex.message
            });
        }
    }
}

module.exports = new OrdersController();