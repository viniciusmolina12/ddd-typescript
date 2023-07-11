import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import CustomerModel from "./model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipCode,
      state: entity.address.state,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address._street,
        number: entity.address._number,
        zipcode: entity.address._zipCode,
        state: entity.address._state,
        city: entity.address._city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.city,
      customerModel.state,
      customerModel.street,
      customerModel.zipcode,
      customerModel.number
    );
    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModel) => {
      let customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewardsPoints(customerModel.rewardPoints);
      const address = new Address(
        customerModel.city,
        customerModel.state,
        customerModel.street,
        customerModel.zipcode,
        customerModel.number
      );
      customer.changeAddress(address);
      if (customerModel.active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }
}