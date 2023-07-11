export default class Address {
    _city: string;
    _state: string;
    _street: string;
    _number: number;
    _zipCode: string

    constructor(city: string, state: string, street: string, zipCode: string, number: number){
        this._city = city;
        this._state = state;
        this._street = street;
        this._zipCode = zipCode;
        this._number = number;
    }

    validate(): void {
        if(this._city.length === 0) {
            throw new Error('City must be provided');
        }

        if(this._state.length === 0) {
            throw new Error('State must be provided');
        }

        if(this._street.length === 0) {
            throw new Error('Street must be provided');
        }
    }
    
    get city (): string {
        return this._city
    }

    get state (): string {
        return this._state
    }

    get street (): string {
        return this._street
    }

    get zipCode (): string {
        return this._zipCode
    }

    get number (): number {
        return this._number
    }
    toString() {
        return `${this._street}, ${this._city} - ${this._state}, ${this._zipCode}`
    }
}