import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = new Customer('123', 'John');
const address = new Address('City', 'State', 'Street', 'Zip', 123);
customer.changeAddress(address);

const input = {
    id: customer.id, 
    name: 'John Updated', 
    address: {
      street: 'Street Updated',
      number: 321,
      zip: 'Zip Updated', 
      city: 'City Updated', 
      state: 'State Updated'
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}
describe('Update customer usecase unit test', () => {
    it('should update a customer', async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        const output = await customerUpdateUseCase.execute(input);
        expect(output).toEqual(input)
    })
})