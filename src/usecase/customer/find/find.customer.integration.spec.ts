import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/sequelize/model/customer.model";
import CustomerRepository from "../../../infrastructure/customer/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity";
import FindCustomerUseCase from "./find.customer.usecase";
import Address from "../../../domain/customer/value-object/address";

describe('Test find customer usecase', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const address = new Address('Guarulhos', 'Sao Paulo', 'Street 1', '07196200', 100)
    
    const customer = new Customer('123', 'John Doe')
    customer.changeAddress(address)
    const customerRepository = new CustomerRepository();


    const usecase = new FindCustomerUseCase(customerRepository)
    await customerRepository.create(customer)

    const input = {
      id: '123'
    }
    const output = {
      id: '123',
      name: 'John Doe',
      address: {
        street: 'Street 1',
        number: 100,
        zip: '07196200',
        state: 'Sao Paulo',
        city: 'Guarulhos',
      }
    }
    const result = await usecase.execute(input)
    expect(result).toEqual(output)

  })
})