"use strict";

const basketItem = {
    render(product) {
        return `<div class="product">
            <div><b>Наименование</b>: ${product.productName}</div>
            <div><b>Цена за шт.</b>: ${product.productPrice}</div>
            <div><b>Количество</b>: ${product.amount}</div>
            <div><b>Цена</b>: ${product.amount * product.productPrice}</div>
        </div>`;
    }
}

let basket = {
    basketWrap: null,
    basketBtn: null,
    basketItem,

    products: [
        {
            productName: 'Телевизор LG',
            productPrice: 25000,
            amount: 1
        },
        {
            productName: 'Держатель для телевизора',
            productPrice: 1000,
            amount: 1
        },
        {
            productName: 'Батарейки для пульта',
            productPrice: 60,
            amount: 2
        },
        {
            productName: 'Годовая подписка на канал "Русское кино"',
            productPrice: 680,
            amount: 1
        },
    ],

    init() {
        this.basketWrap = document.querySelector(".basketWrap");
        this.basketBtn = document.querySelector(".basketBtn");
        this.basketBtn.addEventListener('click', () => {
            this.clearBasket();
        });
        this.render();
    },

    render() {
        if (this.products.length) {
            this.products.forEach(product => {
                this.basketWrap.insertAdjacentHTML('beforeend', this.basketItem.render(product));
            });
            this.basketWrap.insertAdjacentHTML('beforeend', `В корзине ${this.products.length} товара стоимостью ${this.getSumPrice()}`);
        } else {
            this.basketWrap.textContent = 'Корзина пуста';
        }
    },
    getSumPrice() {
        return this.products.reduce(function (productPrice, product) {
            return productPrice + product.productPrice * product.amount;
        }, 0);
    },
    clearBasket() {
        this.products = [];
        this.render();
    },
}

basket.init();



