import Order from "../../domain/entity/order/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";

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