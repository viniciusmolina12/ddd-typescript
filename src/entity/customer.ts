import Address from "./address";

export default class Customer { 
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    set id(id: string) {
        this._id = id;
    }

    set name(name: string) {
        this.name = name;
    }

    set address(address: Address) {
        this.address = address;
    }

    activate(): void  {
        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

}