
import { Sequelize } from "sequelize-typescript";
import OrderItemModel from "./model/order-item.model";
import OrderModel from "./model/order.model";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../customer/sequelize/model/customer.model";
import CustomerRepository from "../../customer/sequelize/customer.repository";
import ProductRepository from "../../product/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import Order from "../../../domain/checkout/entity";
import OrderItem from "../../../domain/checkout/entity/order_item";
import OrderRepository from "./order.repository";
import ProductModel from "../../product/sequelize/model/product.model";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  const makeOrderDependency = async (customerId: string = '1', productId: string = '1', orderItemId: string = '1') => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(customerId, "Customer 1");
    const address = new Address('City 1', 'State 1', 'Street 1', '00000-000', 1);
    customer.changeAddress(address);
    await customerRepository.create(customer);
    const productRepository = new ProductRepository();
    const product = new Product(productId, "Product 1", 10);
    await productRepository.create(product);
    const orderItem = new OrderItem(orderItemId, product.name, product.price, 1, product.id);
    return {
        orderItem,
        product,
        customer
    }
  }
  it('should create a new order', async () => {
    const { orderItem } = await makeOrderDependency();
    const orderRepository = new OrderRepository();
    const order = new Order('123', '1', [orderItem]);
    await orderRepository.create(order);
    const orderModel = await OrderModel.findOne({ where: { id: '123' }, include: ["items"]})
    expect(orderModel.toJSON()).toStrictEqual({
        id: "123",
        customer_id: '1',
        total: order.total(),
        items: [
            {
             id: "1",
             name: "Product 1",
             quantity: 1,
             order_id: "123",
             price: 10,
             product_id: '1'
            }
        ]
    })
  })

  // it('should update an order', async () => {
  //   const dependencies = await makeOrderDependency();
  //   const orderRepository = new OrderRepository();
  //   const order = new Order('123', '1', [dependencies.orderItem]);
  //   await orderRepository.create(order);
  //   const orderModel = await OrderModel.findOne({ where: { id: '123' }, include: ["items"]})
  //   const dependencies2 = await makeOrderDependency('2', '2', '2');
  //   order.changeCustomer('2');
  //   order.changeItems([dependencies.orderItem, dependencies2.orderItem]);
  //   await orderRepository.update(order);
  //   const orderModelUpdated = await OrderModel.findOne({ where: { id: '123' }, include: ["items"]})
  //    expect(orderModelUpdated.toJSON()).toStrictEqual({
  //       id: "123",
  //       customer_id: '2',
  //       total: order.total(),
  //       items: [
  //           {
  //            id: "1",
  //            name: "Product 1",
  //            quantity: 1,
  //            order_id: "123",
  //            price: 10,
  //            product_id: '1'
  //           },
  //           {
  //           id: "2",
  //           name: "Product 1",
  //           quantity: 1,
  //           order_id: "123",
  //           price: 10,
  //           product_id: '2'
  //           }
  //       ]
  //   })
    
  // })


});