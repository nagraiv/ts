import Buyable from './Buyable';

export default class Phone implements Buyable {
    private _count: number;

    constructor(
        readonly id: number,
        readonly name: string,
        readonly price: number,
        count: number,
        readonly description: string,
        readonly year: number,
        readonly country: string,
    ) {
        this._count = count;
    }

    set count(x: number) {
        this._count = x;
    }

    get count() {
        return this._count > 0 ? this._count : 0;
    }
}
