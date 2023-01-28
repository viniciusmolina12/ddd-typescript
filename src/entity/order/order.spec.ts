import Order from "./order"
import OrderItem from "./order_item"

describe('Order unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            const order = new Order('', '123', [])
        }).toThrowError('Id is required')
    })
    it('should throw error when customerId is empty', () => {
        expect(() => {
            const order = new Order('123', '', [])
        }).toThrowError('Id is required')
    })
    it('should throw error when item is empty', () => {
        expect(() => {
            const order = new Order('123', '123', [])
        }).toThrowError('Item quantity must be greater than zero')
    })

    it('should calculate total', () => {
        const item = new OrderItem('123', 'Item 1', 200, 2, "p1");
        const item2 = new OrderItem('321', 'Item 2', 150, 2, "p2");
        const order = new Order('1', '1', [item]);
        let total = order.total();
        expect(total).toBe(400);
        const order2 = new Order('2', '2', [item, item2]);
        total = order2.total();
        expect(total).toBe(700);
    })

    it('should throw a error if the item quantity is less or equal 0', () => {
        expect(() => {
            const item = new OrderItem('123', 'Item 1', 200, 0, "p1");
            const order = new Order('1', '1', [item]);
        }).toThrowError('Quantity must be greater than 0')
    })

})