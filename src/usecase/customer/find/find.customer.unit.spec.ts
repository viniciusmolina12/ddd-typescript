import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/sequelize/model/customer.model";
import CustomerRepository from "../../../infrastructure/customer/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity";
import FindCustomerUseCase from "./find.customer.usecase";
import Address from "../../../domain/customer/value-object/address";


const customer = new Customer('123', 'John Doe')
const address = new Address('Guarulhos', 'Sao Paulo', 'Street 1', '07196200', 100)
customer.changeAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}
describe('Test find customer unit usecase', () => {
  it('should find a customer', async () => {  
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository)
    const input = { id: '123' } 
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

  it('should throw an error if no costumer is found', async () => {  
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => { throw new Error('Customer not found') })
    const usecase = new FindCustomerUseCase(customerRepository)
    const input = { id: '123' } 
    expect(() => {
      return usecase.execute(input)
    }).rejects.toThrow('Customer not found')
  })
})