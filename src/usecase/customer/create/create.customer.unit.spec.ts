import CreateCustomerUsecase from "./create.customer.usecase"

const input = {
    name: 'John',
    address: {
        street: "Street",
        number: 123,
        zip: 'Zip',
        city: 'City',
        state: 'State'
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}


describe('Unit test create customer use case', () => {
    it('Should create a customer', async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUsecase(customerRepository);
        const output = await createCustomerUseCase.execute(input)
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: input.address
        });
    })

    it('Should throw an error when name is missing', async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUsecase(customerRepository);
        input.name = '';
        await expect(createCustomerUseCase.execute(input)).rejects.toThrow('Name is required')
    })
})