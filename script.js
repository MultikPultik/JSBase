"use strict";

const productDesc = {
    render(product) {
        return `<div class="productWrap">
            <img src="${product.productImg}" alt="picture">
            <div><b>Наименование</b>: ${product.productName}</div>
            <div><b>Цена</b>: ${product.productPrice}</div>
            <button class="btnCatalogItem" data-product_id="${product.productId}">Купить</button>
        </div>`;
    }
};


let catalog = {
    catalogDiv: null,
    productDesc,

    products: [
        {
            productId: 10,
            productName: 'Телевизор LG',
            productPrice: 25000,
            productImg: 'https://picsum.photos/id/237/300',
        },
        {
            productId: 20,
            productName: 'Держатель для телевизора',
            productPrice: 1000,
            productImg: 'https://picsum.photos/id/241/300',
        },
        {
            productId: 30,
            productName: 'Батарейки для пульта',
            productImg: 'https://picsum.photos/id/243/300',
            productPrice: 60,
        },
        {
            productId: 40,
            productName: 'Подписка "Русское кино"',
            productPrice: 680,
            productImg: 'https://picsum.photos/id/242/300',
        },
    ],

    init() {
        this.catalogDiv = document.getElementById("catalog");
        this.render();
        this.setEventHandlers();
    },

    render() {
        if (this.products.length) {
            this.products.forEach(product => {
                this.catalogDiv.insertAdjacentHTML('beforeend', this.productDesc.render(product));
            });
        }
    },

    setEventHandlers() {
        this.catalogDiv.addEventListener('click', event => this.addToBasket(event));
    },

    addToBasket(event){
        if (event.target.classList.contains('btnCatalogItem')) {
            const product_id = +event.target.dataset.product_id;
            console.log(product_id);
        } else {
            return;
        }

    },
};

const basketItem = {
    render(product) {
        return `<div class="product">
            <div><b>Наименование</b>: ${product.productName}</div>
            <div><b>Цена за шт.</b>: ${product.productPrice}</div>
            <div><b>Количество</b>: ${product.amount}</div>
            <div><b>Цена</b>: ${product.amount * product.productPrice}</div>
        </div>`;
    }
};

/**
 *  Объект корзины
 */
let basket = {
    basketWrap: null,
    basketBtn: null,
    basketItem,

    catalogList: [],
    products: [],

    init(catalogList) {
        this.basketWrap = document.querySelector(".basketWrap");
        this.basketBtn = document.querySelector(".basketBtn");
        this.catalogList = catalogList;
        
        this.basketBtn.addEventListener('click', () => {
            this.clearBasket();
        });
        this.render();
    },

    render() {
        if (this.products.length) {
           /*  this.products.forEach(product => {
                this.basketWrap.insertAdjacentHTML('beforeend', this.basketItem.render(product));
            });
            this.basketWrap.insertAdjacentHTML('beforeend', `В корзине ${this.products.length} товара стоимостью ${this.getSumPrice()}`); */
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
};

catalog.init();
basket.init();



