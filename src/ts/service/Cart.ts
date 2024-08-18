import Buyable from '../domain/Buyable';

export default class Cart {
    // private _items: Buyable[] = [];
    private _items: Set<Buyable> = new Set();
    
    add(item: Buyable): void {
        // this._items.push(item);
        const targetItem = this.getItem(item.id);
        if (targetItem !== undefined) {
            if (targetItem.count !== undefined && item.count !== undefined)  {
                targetItem.count += item.count;
            }
        } else {
            this._items.add(item);
        }
    }

    get items(): Buyable[] {
        return [...this._items];
    }

    getItem(id: number): Buyable | undefined {
        return this.items.find( item => item.id === id);
    }

    totalPrice(): number {
        return this.items
            .map(item => item.count ? item.price * item.count : item.price)
            .reduce((acc: number, val: number): number => acc + val, 0);
    }

    discountPrice(discount: number): number {
        return this.totalPrice() * (1 - discount);
    }

    removeItem(id: number): void {
        // this._items = this.items.filter(item => item.id !== id);
        const targetItem = this.getItem(id);
        if (targetItem === undefined) return;
        this._items.delete(targetItem);
    }

    decrease(id: number): void {
        const targetItem = this.getItem(id);
        if (targetItem === undefined || targetItem.count === undefined) return;
        targetItem.count -= 1;
        if (targetItem.count <= 0) {
            this.removeItem(id);
        }
    }
}
