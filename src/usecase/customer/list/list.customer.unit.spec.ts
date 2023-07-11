import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";


const customer1 = new Customer('123', 'John Doe')
const address1 = new Address('City 1', 'State 1', 'Street 1', 'Zip 1', 123);
customer1.changeAddress(address1);

const customer2 = new Customer('321', 'John Eod')
const address2 = new Address('City 2', 'State 2', 'Street 2', 'Zip 2', 123);
customer2.changeAddress(address2);


const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2]))
    }
}

describe('Unit test for listing customer usecase', () => {

    it('should list customers', async () => {
        const repository = MockRepository();
        const usecase = new ListCustomerUseCase(repository);
        const output = await usecase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe('123');
        expect(output.customers[0].name).toBe('John Doe');
        expect(output.customers[0].address.street).toBe('Street 1');
        expect(output.customers[1].id).toBe('321');
        expect(output.customers[1].name).toBe('John Eod');
        expect(output.customers[1].address.street).toBe('Street 2');
    })
})