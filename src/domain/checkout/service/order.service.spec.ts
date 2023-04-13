import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

const makeOrderItens = (): OrderItem[] => {
    const orderItem1 = new OrderItem('1', 'Item 1', 10, 2, 'productId');
    const orderItem2 = new OrderItem('2', 'Item 2', 5, 2, 'productId');
    return [orderItem1, orderItem2];
}
describe('Order service unity tests', () => {
    it('should get total of all orders', () => {
        const itens = makeOrderItens();
        const order1 = new Order('1', 'customerId', itens);
        const order2 = new Order('2', 'customerId', [itens[0]]);
        const total = OrderService.total([order1, order2]);
        expect(total).toBe(50);
    })

    it('should place an order', () => {
        const customer = new Customer('1', 'Customer 1');
        const order = OrderService.placeOrder(customer, makeOrderItens());
        expect(customer.rewardPoints).toBe(15);
        expect(order.total()).toBe(30);
    })
})