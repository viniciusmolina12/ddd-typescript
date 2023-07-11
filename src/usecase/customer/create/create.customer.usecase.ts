import Customer from "../../../domain/customer/entity";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import { v4 as uuid } from 'uuid';
export default class CreateCustomerUsecase {
    private customerRepository: CustomerRepositoryInterface
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customerId = uuid();
        const customer = new Customer(customerId, input.name);
        const address = new Address(input.address.city, input.address.state, input.address.street, input.address.zip, input.address.number);
        customer.changeAddress(address);
        await this.customerRepository.create(customer);
        return { 
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                zip: customer.address.zipCode,
                state: customer.address.state,
                city: customer.address.city,
                number: customer.address.number
            }

        }

    }
}