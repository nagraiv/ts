import Cart from '../service/Cart';
import Book from "../domain/Book";
import MusicAlbum from "../domain/MusicAlbum";
import Phone from "../domain/Phone";

test('new card should be empty', () => {
    const cart = new Cart();

    expect(cart.items.length).toBe(0);
});

describe('Товар можно добавить и удалить из корзины', () => {
    const cart = new Cart();

    it('тестируем метод add', () => {
        cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
        expect(cart.items.length).toBe(1);
    });

    it('тестируем метод removeItem', () => {
        cart.removeItem(1001);
        expect(cart.items.length).toBe(0);
    });
});

describe('Правильно считается стоимость товаров в корзине', () => {
    const cart = new Cart();
    cart.add(new Book(1001, 'War and Piece I', 'Leo Tolstoy', 1000, 1225));
    cart.add(new Book(1002, 'War and Piece II', 'Leo Tolstoy', 1000, 1070));
    cart.add(new Book(1003, 'War and Piece III', 'Leo Tolstoy', 1000, 1310));

    it('тестируем метод totalPrice', () => {
        expect(cart.totalPrice()).toBe(3000);
    });

    it('тестируем метод discountPrice', () => {
        expect(cart.discountPrice(0.1)).toBe(2700);
    });
});

describe('Тестируем добавление и удаление штучного и неисчислимого товара', () => {
    const cart = new Cart();

    it('При добавлении нескольких альбомов (неисчислимый товар) в корзине нет дубликатов', () => {
        cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
        expect(cart.items.length).toBe(1);
        cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
        expect(cart.items.length).toBe(1);
    });

    it('Метод decrease не действует для неисчислымых товаров', () => {
        cart.decrease(1008);
        expect(cart.items.length).toBe(1);
    });

    it('При добавлении нескольких телефонов (штучный товар) количество телефонов увеличивается', () => {
        cart.add(new Phone(
            30093,
            'Honor 10i',
            29990,
            1,
            'Android',
            2023,
            'Китай'));
        expect(cart.items.length).toBe(2);
        expect(cart.getItem(30093)?.count).toBe(1);
        cart.add(new Phone(
            30093,
            'Honor 10i',
            29990,
            2,
            'Android',
            2023,
            'Китай'));
        expect(cart.items.length).toBe(2);
        expect(cart.getItem(30093)?.count).toBe(3);
    });

    it('Метод decrease уменьшает количество телефонов', () => {
        cart.decrease(30093);
        expect(cart.items.length).toBe(2);
        expect(cart.getItem(30093)?.count).toBe(2);

        cart.decrease(30093);
        expect(cart.items.length).toBe(2);
        expect(cart.getItem(30093)?.count).toBe(1);

        cart.decrease(30093);
        expect(cart.items.length).toBe(1);
        expect(cart.getItem(30093)).toBe(undefined);
    });

    it('Попытка удаления несуществующего в корзине товара не ломает программу', () => {
        cart.decrease(30093);
        expect(cart.items.length).toBe(1);

        cart.removeItem(30093);
        expect(cart.items.length).toBe(1);
    });
});

describe('Тестируем расчёт стоимости товаров в корзине с учётом их количества', () => {
    const cart = new Cart();
    cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
    cart.add(new Phone(
        30081,
        'Honor 7i',
        10000,
        1,
        'Android',
        2023,
        'Китай'));

    it('При добавлении нескольких альбомов (неисчислимый товар) стоимость корзины не меняется', () => {
        expect(cart.totalPrice()).toBe(10900);
        cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
        expect(cart.totalPrice()).toBe(10900);
    });

    it('При добавлении нескольких телефонов (штучный товар) стоимость корзины увеличивается', () => {
        expect(cart.totalPrice()).toBe(10900);
        cart.add(new Phone(
            30081,
            'Honor 7i',
            10000,
            2,
            'Android',
            2023,
            'Китай'));
        expect(cart.totalPrice()).toBe(30900);
    });
});