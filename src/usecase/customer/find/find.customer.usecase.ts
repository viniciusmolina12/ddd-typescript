import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export default class FindCustomerUseCase { 
    
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> { 
        const customer = await this.customerRepository.find(input.id);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                city: customer.address.city,
                zip: customer.address.zipCode,
                state: customer.address.state,
                street: customer.address.street,
                number: customer.address.number
            }
        }
    }

}