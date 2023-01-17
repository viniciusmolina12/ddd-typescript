export default class Address {
    _city: string;
    _state: string;
    _street: string;
    _zipCode: string

    constructor(city: string, state: string, street: string, zipCode: string){
        this._city = city;
        this._state = state;
        this._street = street;
        this._zipCode = zipCode;
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


    toString() {
        return `${this._street}, ${this._city} - ${this._state}, ${this._zipCode}`
    }
}