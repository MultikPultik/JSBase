/* 2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
2.2. Реализуйте такие объекты.
2.3. Перенести функционал подсчета корзины на объектно-ориентированную базу. */

const basket = {
    products: [
        ['Ботинки', 3000, 1],
        ['Платье', 4000, 1],
        ['Молоко', 50, 2],
        ['Шоколадные батончики', 30, 10],
        ['Оливки', 90, 3]
    ],
    totalPrice: function () {
        let price = this.products.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue[1] * currentValue[2];
        }, 0);

        return price;
    }
}

console.log(basket.totalPrice());