import Order from "../../../domain/checkout/entity/order";
import OrderModel from "./model/order.model";
import OrderItemModel from "./model/order-item.model";
import OrderRepositoryInterface from "../../../domain/checkout/repository/order.repository.interface";

export default class OrderRepository{
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity
        }))
    },
    {
        include: [{ model: OrderItemModel }]
    });
  }

  // async update(entity: Order): Promise<void> {
    
  //   await OrderModel.update({
  //     customer_id: entity.customerId,
  //     total: entity.total(),
  //     items: entity.items.map(item => ({
  //         id: item.id,
  //         name: item.name,
  //         price: item.price,
  //         product_id: item.productId,
  //         quantity: item.quantity
  //     }))
  // },
  // {
  //   where: {
  //     id: entity.id
  //   }
  // }).then(order => {
  //   order.
  // })
  // }
 
}