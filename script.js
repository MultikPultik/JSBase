"use strict";

/**
 *  Объект корзины
 */
let catalog = {
    catalogDiv: null,
    basket: {},

    basketProducts: [
        {
            productId: 10,
            productName: 'Телевизор LG',
            productPrice: 25000,
            productImg: "img/TV.jpg",
        },
        {
            productId: 20,
            productName: 'Держатель для телевизора',
            productPrice: 1000,
            productImg: "img/fixingPart.jpg",
        },
        {
            productId: 30,
            productName: 'Батарейки для пульта',
            productImg: "img/battary.jpg",
            productPrice: 60,
        },
        {
            productId: 40,
            productName: 'Подписка "Русское кино"',
            productPrice: 680,
            productImg: "img/subscribe.jpg",
        },
    ],

    /* 
     * Метод инициальзации каталога
     * @param basket - указатель на корзину 
    */
    init(basket) {
        this.catalogDiv = document.getElementById("catalog");
        this.basket = basket;
        this.render();
        this.setEventHandlers();
    },

    /* 
     * Метод визуализации каталога
    */
    render() {
        if (this.basketProducts.length) {
            this.basketProducts.forEach(product => {
                this.catalogDiv.insertAdjacentHTML('beforeend', this.contentItemHTML(product));
            });
        }
    },

    /* 
     * Метод обработки событий
    */
    setEventHandlers() {
        this.catalogDiv.addEventListener('click', event => this.addToBasket(event));
    },

    /* 
     * Метод добавления в корзину товара
    */
    addToBasket(event) {
        if (event.target.classList.contains('btnCatalogItem')) {
            const product_id = +event.target.dataset.product_id;
            // console.log(product_id);
            this.basket.addToBasket(product_id);
        } else {
            return;
        }

    },

    /* 
    * Метод добавления разметки для представления товара
    */
    contentItemHTML(product) {

        return `<div class="productWrap">
                <img src="${product.productImg}" alt="picture">
                <div><b>Наименование</b>: ${product.productName}</div>
                <div><b>Цена</b>: ${product.productPrice} руб.</div>
                <button class="btnCatalogItem" data-product_id="${product.productId}">Купить</button>
            </div>`;
    }
};


/**
 *  Объект корзины
 */
let basket = {
    basketWrap: null,
    basketBtn: null,
    basketDescr: null,

    catalogList: [],
    basketProducts: [],


    /* 
     * Метод инициальзации корзины
     * @param catalogList - список товаров в каталоге 
    */
    init(catalogList) {
        this.basketWrap = document.querySelector(".basketWrap");
        this.basketBtn = document.querySelector(".basketBtn");
        this.basketDescr = document.querySelector(".basketTotalDescr");
        this.catalogList = catalogList;

        this.basketBtn.addEventListener('click', () => {
            this.clearBasket();
        });
        this.render();
    },

    /**
     * Метод очистки корзины
     */
    clearBasket() {
        this.basketProducts = [];
        this.render();
    },

    /**
     * Метод визуализации корзины
     */
    render() {
        if (this.basketProducts.length > 0) {
            this.basketWrap.innerHTML = '';
            this.basketProducts.forEach(product => {
                this.basketWrap.insertAdjacentHTML('beforeend', this.contentItemHTML(product));
            });
            this.basketDescr.innerHTML = '';
            this.basketDescr.insertAdjacentHTML('beforeend', `<br><br>В корзине ${this.basketProducts.length} товар(а,-ов) стоимостью ${this.getSumPrice()} руб.`);
        } else {
            this.basketDescr.innerHTML = '';
            this.basketWrap.textContent = 'Корзина пуста';
        }
    },

    /**
     * Метод добавления товара в корзину из каталога
     */
    addToBasket(product_id) {
        const product = this.catalogList.find(product => product.productId === product_id);

        if (product) {
            this.basketProducts.push({ ...product })
        }
        this.render();
    },

    /**
     * Метод подсчета количество товаров в корзине и их стоимости
     */
    getSumPrice() {
        return this.basketProducts.reduce(function (productPrice, product) {
            return productPrice + product.productPrice;
        }, 0);
    },

    /* 
     * Метод добавления разметки для представления товара
    */
    contentItemHTML(product) {

        return `<div class="productWrap">
        <img src="${product.productImg}" alt="picture">
        <div><b>Наименование</b>: ${product.productName}</div>
        <div><b>Цена</b>: ${product.productPrice} руб.</div>
        </div>`;
    }
};

catalog.init(basket);
basket.init(catalog.basketProducts);



