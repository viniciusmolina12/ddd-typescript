import Address from "../address";

export default class Customer { 
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if(this._id.length === 0){
            throw new Error('Id is required')
        }

        if(this._name.length === 0){
            throw new Error('Name is required')
        }
    }
    
    changeName(name: string) {
        this._name = name;
        this.validate();
    }


    isActive(): boolean {
        return this._active;
    }

    activate(): void  {
        if(!this.address) {
            throw new Error('Address is required to activate a customer')
        }
        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    get address(): Address {
        return this._address;
    }

    get name(): string {
        return this._name;
    }

    set address(address: Address) {
        this._address = address;
    }

}