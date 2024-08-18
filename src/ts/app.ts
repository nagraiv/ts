import Cart from './service/Cart';
import Book from './domain/Book';
import MusicAlbum from './domain/MusicAlbum';
import Movie from "./domain/Movie";
import Phone from "./domain/Phone";

const cart = new Cart();
console.log(cart.items);

cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));

console.log(cart.items);

console.log('TASK 1');
cart.add(new Movie(
    50183,
    'The Avengers',
    450,
    'Мстители',
    true,
    2012,
    'США',
    'Avengers Assemble!',
    ['фантастика', 'боевик', 'фэнтези', 'приключения'],
    137,
    ''));

console.log(cart.items);

console.log('TASK 2');
console.log(cart.totalPrice(), cart.discountPrice(0.15));

cart.removeItem(1001);
console.log(cart.items);

console.log('TASK 3\nдобавляем телефон');
cart.add(new Phone(
    30093,
    'Honor 10i',
    29990,
    1,
    'Android',
    2023,
    'Китай'));

console.log('добавляем ещё два телефона:');
cart.add(new Phone(
    30093,
    'Honor 10i',
    29990,
    2,
    'Android',
    2023,
    'Китай'));
console.log('добавляем такой же альбом:');
cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
console.log(cart.items);
console.log(cart.totalPrice(), cart.discountPrice(0.2));
