import Customer from "../../entity/customer/customer";
import Order from "../../entity/order/order";
import OrderItem from "../../entity/order/order_item";
import { v4 as uuid } from 'uuid';
export default class OrderService {

    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0)
    }

    static placeOrder(customer: Customer, itens: OrderItem[]): Order {
        if(itens.length === 0) throw new Error('Order must have at least one item');
        const order = new Order(uuid(), customer.id, itens);
        customer.addRewardsPoints(order.total() / 2);
        return order
    }
}