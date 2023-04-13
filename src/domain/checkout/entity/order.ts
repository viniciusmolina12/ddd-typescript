import Address from "../../customer/value-object/address";
import OrderItem from "./order_item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.total(), 0);
    }

    validate(): void {
        if(this._id.length === 0) {
            throw new Error('Id is required');
        }
        if(this._customerId.length === 0) {
            throw new Error('CustomerId is required');
        }
        if(this._items.length === 0) {
            throw new Error('Item quantity must be greater than zero');
        }

        if(this._items.some(item => item.quantity <= 0)) {
            throw new Error('Quantity must be greater than 0');
        }
        
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    changeCustomer(customerId: string) {
        this._customerId = customerId;
    }

    changeItems(items: OrderItem[]) {
        this._items = items;
    }

}