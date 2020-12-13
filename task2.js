/* 3. Товары в корзине хранятся в массиве. Задачи:
a) Организовать такой массив для хранения товаров в корзине;
b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины. */


const basket = [
    ['Ботинки', 3000, 1],
    ['Платье', 4000, 1],
    ['Молоко', 50, 2],
    ['Шоколадные батончики', 30, 10],
    ['Оливки', 90, 3]
]


function countBasketPrice(arr) {
    let totalPrice = 0;
    for (let i = 0; i < arr.length; i++) {
        totalPrice = totalPrice + arr[i][1] * arr[i][2];
    }
    return totalPrice;
}

console.log(countBasketPrice(basket));