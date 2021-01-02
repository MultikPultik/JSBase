"use strict";

/**
 *  Объект корзины
 */
let catalog = {
    pathToImg: 'img/',
    countImg: null,
    eventImg: null,
    stabImg: null,
    catalogDiv: null,
    modalWindow: null,
    basket: {},

    catalogProducts: [
        {
            productId: 10,
            productName: 'Телевизор LG',
            productPrice: 25000,
            productImg: "img/TV.jpg",
            productModalImg: [`img/TV.jpg`, `img/img2.jpg`, `img/img3.jpg`, `img/img4.jpg`],
        },
        {
            productId: 20,
            productName: 'Держатель для телевизора',
            productPrice: 1000,
            productImg: "img/fixingPart.jpg",
            productModalImg: [`img/fixingPart.jpg`, `img/img2.jpg`, `img/img3.jpg`, `img/img4.jpg`],
        },
        {
            productId: 30,
            productName: 'Батарейки для пульта',
            productImg: "img/battary.jpg",
            productPrice: 60,
            productModalImg: [`img/battary.jpg`, `img/img2.jpg`, `img/img3.jpg`, `img/img4.jpg`],
        },
        {
            productId: 40,
            productName: 'Подписка "Русское кино"',
            productPrice: 680,
            productImg: "img/subscribe.jpg",
            productModalImg: [`img/subscribe.jpg`, `img/img2.jpg`, `img/img3.jpg`, `img/img4.jpg`],
        },
    ],


    /* 
     * Метод инициальзации каталога
     * @param basket - указатель на корзину 
    */
    init(basket) {
        this.catalogDiv = document.getElementById("catalog");
        this.basket = basket;
        this.modalWindow = document.getElementsByClassName('modalWindow');
        this.stabImg = document.getElementsByClassName('stabImg');
        this.render();
        this.setEventHandlers();
    },

    /* 
     * Метод визуализации каталога
    */
    render() {
        if (this.catalogProducts.length) {
            this.catalogProducts.forEach(product => {
                this.catalogDiv.insertAdjacentHTML('beforeend', this.contentItemHTML(product));
            });
        }
    },

    /* 
     * Метод установки обработчиков событий
    */
    setEventHandlers() {
        this.catalogDiv.addEventListener('click', event => this.catalogEvent(event));
        this.modalWindow[0].addEventListener('click', event => this.modalWindowHandler(event));
    },

    /* 
     * Метод обработки событий модального окна
    */
    modalWindowHandler(event) {

        if (event.target.classList.contains('fa-window-close')) {
            this.modalWindow[0].classList.remove("activ");
        } else if (event.target.classList.contains('fa-arrow-left')) {
            this.listingDownImg(this.eventImg);
        } else if (event.target.classList.contains('fa-arrow-right')) {
            this.listingUpImg(this.eventImg);
        } else {
            return;
        }
    },

    /* 
     * Метод обработки события по стрелке Left
     * @param event - указатель на товар 
    */
    listingUpImg(event) {
        // Получаем ID товара
        const product_id = +event.target.dataset.product_id;
        // Получаем индекс товара
        const productIndex = this.catalogProducts.findIndex(product => product.productId === product_id);

        if (this.countImg < this.catalogProducts[productIndex].productModalImg.length - 1) {
            this.stabImg[0].src = this.catalogProducts[productIndex].productModalImg[++this.countImg];
        }
    },

    /* 
     * Метод обработки события по стрелке Right
     * @param event - указатель на товар 
    */
    listingDownImg(event) {
        // Получаем ID товара
        const product_id = +event.target.dataset.product_id;
        // Получаем индекс товара
        const productIndex = this.catalogProducts.findIndex(product => product.productId === product_id);

        if (this.countImg >= 1 && this.countImg <= this.catalogProducts[productIndex].productModalImg.length - 1) {
            this.stabImg[0].src = this.catalogProducts[productIndex].productModalImg[--this.countImg];
        }
    },

    /* 
     * Метод обработки событий каталога
    */
    catalogEvent(event) {
        const product_id = +event.target.dataset.product_id;
        const productIndex = this.catalogProducts.findIndex(product => product.productId === product_id);

        if (event.target.classList.contains('btnCatalogItem')) {
            this.basket.addToBasket(product_id);
        } else if (event.target.classList.contains('imgCatalogItem')) {
            this.eventImg = event;
            this.modalWindow[0].classList.add("activ"); //Показываем модальное окно
            this.stabImg[0].src = this.catalogProducts[productIndex].productModalImg[0]; //
            this.countImg = 0;
        } else {
            return;
        }
    },


    /* 
    * Метод добавления разметки HTML для визуализации товара
    */
    contentItemHTML(product) {

        return `<div class="productWrap">
                <img src="${product.productImg}" data-product_id="${product.productId}" alt="picture" class="imgCatalogItem">
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
basket.init(catalog.catalogProducts);



