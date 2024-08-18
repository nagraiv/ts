import Buyable from './Buyable';

export default class Movie implements Buyable {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly price: number,
        readonly locatedName: string,
        readonly isImax: boolean,
        readonly year: number,
        readonly country: string,
        readonly slogan: string,
        readonly genre: string[],
        readonly duration: number,
        readonly posterUrl: string,
    ) {
    }
}
