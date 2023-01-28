import Address from "../address";
import Customer from "./customer";

describe('Customer unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            const customer = new Customer('', 'John Doe');
        }).toThrowError('Id is required');
    })
    it('should throw error when name is empty', () => {
        expect(() => {
            const customer = new Customer('12345', '');
        }).toThrowError('Name is required');
    })
    it('should change name', () => {
        const customer = new Customer('12345', 'John Doe');
        customer.changeName('James');
        expect(customer.name).toBe('James');
    })

    it('should activate customer', () => {
        const customer = new Customer('12345', 'John Doe');
        const address = new Address('Sao Paulo', 'SP', 'Street 1', '00000-000');
        customer.address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    })
    it('should throw error when try to activate a customer without an address', () => {
        const customer = new Customer('12345', 'John Doe');
        expect(() => {
            customer.activate()
        }).toThrow('Address is required to activate a customer');
    })

    it('should deactivate customer', () => {
        const customer = new Customer('12345', 'John Doe');
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    })

    it('should add reward points', () => {
        const customer = new Customer('12345', 'John Doe');
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardsPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardsPoints(10);
        expect(customer.rewardPoints).toBe(20);
    })
})